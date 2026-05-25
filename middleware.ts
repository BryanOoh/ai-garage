import { type NextRequest, NextResponse } from "next/server";
import {
  PIXELAGENT_PREVIEW_COOKIE,
  getPixelagentPreviewSecret,
  isValidPixelagentPreviewKey,
} from "@/lib/pixelagent-access";

const pixelagentPublic =
  process.env.NEXT_PUBLIC_PIXELAGENT_PAGE_ENABLED === "true";

function hasPreviewCookie(request: NextRequest): boolean {
  return (
    Boolean(getPixelagentPreviewSecret()) &&
    request.cookies.get(PIXELAGENT_PREVIEW_COOKIE)?.value === "1"
  );
}

export function middleware(request: NextRequest) {
  const previewKey = request.nextUrl.searchParams.get("pixelagent_preview");

  if (isValidPixelagentPreviewKey(previewKey ?? undefined)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("pixelagent_preview");
    const response = NextResponse.redirect(url);
    response.cookies.set(PIXELAGENT_PREVIEW_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  if (
    request.nextUrl.pathname === "/pixelagent" ||
    request.nextUrl.pathname.startsWith("/pixelagent/")
  ) {
    if (!pixelagentPublic && !hasPreviewCookie(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pixelagent/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

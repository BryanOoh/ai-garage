import { type NextRequest, NextResponse } from "next/server";
import {
  PIXELAGENT_PREVIEW_COOKIE,
  isValidPixelagentPreviewKey,
} from "@/lib/pixelagent-access";

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

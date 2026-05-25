import { cookies } from "next/headers";
import { PIXELAGENT_PAGE_ENABLED } from "@/lib/site";

export const PIXELAGENT_PREVIEW_COOKIE = "pixelagent_preview";

const previewCookieValue = () =>
  process.env.PIXELAGENT_PREVIEW_SECRET?.trim() ? "1" : undefined;

/** Server-only secret; set on Vercel / .env.local (not NEXT_PUBLIC). */
export function getPixelagentPreviewSecret(): string | undefined {
  return process.env.PIXELAGENT_PREVIEW_SECRET?.trim() || undefined;
}

export function isValidPixelagentPreviewKey(key: string | undefined): boolean {
  const secret = getPixelagentPreviewSecret();
  return Boolean(secret && key && key === secret);
}

/** Unlocks Install+ sections (page itself is always public). */
export async function hasPixelagentFullAccess(): Promise<boolean> {
  if (PIXELAGENT_PAGE_ENABLED) return true;
  const expected = previewCookieValue();
  if (!expected) return false;
  const cookieStore = await cookies();
  return cookieStore.get(PIXELAGENT_PREVIEW_COOKIE)?.value === expected;
}

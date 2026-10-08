import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TIME_ZONE_COOKIE, todayInTimeZone } from "@/utils/timezone";

export function proxy(request: NextRequest) {
  const url = new URL("/expenses/categories", request.url);
  url.searchParams.set(
    "month",
    todayInTimeZone(request.cookies.get(TIME_ZONE_COOKIE)?.value),
  );

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};

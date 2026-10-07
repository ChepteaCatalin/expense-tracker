import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { format } from "date-fns";

export function proxy(request: NextRequest) {
  const url = new URL("/expenses/categories", request.url);
  url.searchParams.set("month", format(new Date(), "yyyy-MM-dd"));

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};

import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = new URL('/expenses/categories', request.url);
  url.searchParams.set('month', dayjs().format('YYYY-MM-DD'));

  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/',
};

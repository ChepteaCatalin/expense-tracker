import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = new URL('/expenses/categories', request.url);
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  url.searchParams.set('month', `${today.getFullYear()}-${month}-${day}`);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/',
};

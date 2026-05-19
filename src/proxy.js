import { NextResponse } from 'next/server'

/**
 * Proxy to protect specific routes by checking for an `iv_token` cookie.
 * If the cookie is missing, redirect to `/login` and include a `redirect` param.
 */
export function proxy(request) {
  try {
    const token = request.cookies.get('iv_token')?.value;
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  } catch (err) {
    // In case cookies API isn't available for some runtime, allow the request to continue.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/add-idea',
    // '/my-ideas',
    // '/my-interactions',
    '/ideas/:id/edit'
  ]
};

import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export default function proxy(request: NextRequest) {
  const userInfo = request.cookies.get('user_token')?.value;
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublic = publicRoutes.includes(pathname);

  // Redirect to login if accessing protected route without auth
  if (isProtected && !userInfo) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to dashboard if authenticated and accessing login/root
  if (isPublic && userInfo) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};

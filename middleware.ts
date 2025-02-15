import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  // Allow access to API routes, authentication routes, and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") || // Allow images in /public/images
    pathname.startsWith("/static") // Allow static files
  ) {
    return NextResponse.next();
  }

  // If no session token found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("auth/signin", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all pages except the API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

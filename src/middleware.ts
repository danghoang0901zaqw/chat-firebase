import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const publicPaths = [
    "/login",
    "/sign-up",
    "/forgot-password",
  ];
  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};

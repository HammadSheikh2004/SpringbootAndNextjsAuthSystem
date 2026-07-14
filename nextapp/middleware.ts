// middleware.ts
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshCookie")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/user-dashboard")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  try {
    const payload: any = decodeJwt(token);
    const role = payload.Role;

    // Login or Signup page protection
    if (pathname === "/login" || pathname === "/signup") {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (role === "USER") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      }
    }

    // Role protection
    if (pathname.startsWith("/dashboard") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/user-dashboard", request.url));
    }

    if (pathname.startsWith("/user-dashboard") && role !== "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/user-dashboard/:path*"],
};

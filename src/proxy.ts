import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Map of protected routes and required roles
const protectedRoutes = [
  { path: "/admin", roles: ["admin"] },
  { path: "/dashboard", roles: ["admin", "user"] },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Find if current path is protected
  const route = protectedRoutes.find((r) => pathname.startsWith(r.path));

  if (route) {
    const token = request.cookies.get("payload-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      // Initialize Payload to verify token and get user
      const payload = await getPayload({ config: configPromise });
      const { user } = await payload.auth({
        headers: request.headers,
      });

      if (!user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Check for required roles
      if (!route.roles.includes((user as any).role)) {
        // If user is logged in but lacks admin role for /admin, redirect to dashboard or home
        if (pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } catch (error) {
      console.error("Middleware auth error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

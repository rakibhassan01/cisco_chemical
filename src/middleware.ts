import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import { User } from "./payload-types";

export const runtime = "nodejs";

// Map of protected routes and required roles
const protectedRoutes = [
  { path: "/admin", roles: ["admin"] },
  { path: "/dashboard", roles: ["admin", "user"] },
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Find if current path is protected
  const route = protectedRoutes.find((r) => pathname.startsWith(r.path));

  if (route) {
    const token = request.cookies.get("payload-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      console.log(`Checking path: ${pathname}`);
      const payload = await getPayload({ config: configPromise });
      console.log('Payload initialized in middleware');
      
      const { user } = (await payload.auth({
        headers: request.headers,
      })) as { user: User | null };
      console.log(`User found: ${user?.email || 'none'}`);

      if (!user) {
        console.log('No user, redirecting to sign-in');
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Check for required roles
      if (!route.roles.includes(user.role)) {
        console.log(`Role mismatch: ${user.role} not in ${route.roles}`);
        // If user is logged in but lacks admin role for /admin, redirect to home
        if (pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } catch (error) {
      console.error("Middleware auth error details:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Specify routes explicitly to avoid overhead on static assets or API routes
     */
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};

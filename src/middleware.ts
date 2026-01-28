import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Map of protected routes
const protectedRoutes = [
  { path: "/admin" },
  { path: "/dashboard" },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Find if current path is protected
  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r.path));

  if (isProtectedRoute) {
    const token = request.cookies.get("payload-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    
    // We defer actual role checking/validation to the Server Components (Layout/Page)
    // because doing full Payload auth in Middleware (Edge) is problematic/heavy.
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

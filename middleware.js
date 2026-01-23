import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a profile page
  if (pathname.startsWith("/profil/")) {
    const token = request.cookies.get("auth_token")?.value;

    // If no token, redirect to login
    if (!token) {
      const url = new URL("/logowanie", request.url);
      return NextResponse.redirect(url);
    }

    // Verify token
    const payload = await verifyToken(token);

    // If token is invalid or expired, redirect to login
    if (!payload) {
      const url = new URL("/logowanie", request.url);
      const response = NextResponse.redirect(url);
      // Clear the invalid cookie
      response.cookies.delete("auth_token");
      return response;
    }

    // Extract the profile ID from the URL
    const profileId = pathname.split("/")[2];

    // Check if user is trying to access someone else's profile
    if (payload.userId.toString() !== profileId) {
      // Redirect to their own profile
      const url = new URL(`/profil/${payload.userId}`, request.url);
      return NextResponse.redirect(url);
    }

    // User is authenticated and accessing their own profile
    return NextResponse.next();
  }

  // For all other routes, continue
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/profil/:path*"],
};

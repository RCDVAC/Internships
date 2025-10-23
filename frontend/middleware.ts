import NextAuth from "next-auth";
import { authOptions } from "./lib/auth";

export const runtime = 'nodejs';

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile",
  ],
};

export const middleware = NextAuth(authOptions).auth;

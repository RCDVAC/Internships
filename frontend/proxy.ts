import NextAuth from "next-auth";
import { authOptions } from "./lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile",
  ],
};

export const proxy = NextAuth(authOptions).auth;

// middleware.ts
import type { NextMiddleware } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Create the handler and export it. Casting quiets editor overload noise.
const handler = (NextAuth as any)(authConfig).auth as NextMiddleware;
export default handler;

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/posts/create", "/posts/edit/:path*"],
};

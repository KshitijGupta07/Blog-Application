// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  // 👇 IMPORTANT: empty array so middleware never sees undefined
  providers: [],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && !token.id) token.id = (user as any).id ?? token.sub!;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = (token.id ?? token.sub)!;
      return session;
    },
  },
};

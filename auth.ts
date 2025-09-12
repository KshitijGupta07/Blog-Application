// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { compare } from "bcryptjs";

export const runtime = "nodejs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig, // edge-safe base (no DB)
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        const email = typeof creds?.email === "string" ? creds.email : "";
        const password = typeof creds?.password === "string" ? creds.password : "";
        if (!email || !password) return null;

        await dbConnect();
        const user: any = await User.findOne({ email })
          .select("+passwordHash +name +email +image")
          .exec();
        if (!user || typeof user.passwordHash !== "string") return null;

        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: String(user._id),
          name: user.name ?? undefined,
          email: user.email,
          image: user.image ?? undefined,
        };
      },
    }),
  ],

  // ✅ Node-only callbacks that ensure token.id is the Mongo _id
  callbacks: {
    async jwt({ token, user }) {
      // When we have an email (first login or subsequent requests), ensure a DB user exists
      const email = (user as any)?.email ?? token.email;
      if (!email) return token;

      await dbConnect();

      let dbUser: any = await User.findOne({ email }).select("_id name email image").lean();
      if (!dbUser) {
        // First Google login: create a DB user
        dbUser = await User.create({
          email,
          name: (user as any)?.name ?? token.name ?? "",
          image: (user as any)?.image ?? (token as any)?.picture ?? undefined,
        });
        dbUser = { _id: dbUser._id, email: dbUser.email, name: dbUser.name, image: dbUser.image };
      }

      token.id = String(dbUser._id); // <- always Mongo ObjectId string
      return token;
    },

    async session({ session, token }) {
      if (session.user) (session.user as any).id = (token.id ?? token.sub)!;
      return session;
    },
  },
});

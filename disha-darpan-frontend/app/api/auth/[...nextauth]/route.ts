import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/* ---------- TYPES ---------- */
declare module "next-auth" {
  interface Session {
    backendToken: string | null;
    user: {
      name?: string | null;
      email?: string | null;
      role?: "STUDENT" | "FACILITATOR" | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string | null;
    role?: "STUDENT" | "FACILITATOR" | null;
  }
}

/* ---------- CONFIG ---------- */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    /* ---------- JWT CALLBACK ---------- */
    async jwt({ token, account, user, trigger, session }) {
      // 🔐 First-time Google login
      if (account && user) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
            }),
          }
        );

        const data = await res.json();

        token.backendToken = data.token;
        token.role = data.user.role ?? null;
      }

      // 🔁 Role updated → session.update()
      if (trigger === "update" && session) {
        token.backendToken = session.backendToken;
        token.role = session.user.role;
      }

      return token;
    },

    /* ---------- SESSION CALLBACK ---------- */
    async session({ session, token }) {
      session.backendToken = token.backendToken ?? null;
      session.user.role = token.role ?? null;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

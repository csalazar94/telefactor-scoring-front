import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.expires_at = user.expires_at;
        token.refresh_token = user.refresh_token;
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const res = await fetch(
            "http://localhost:3000/api/v1/auth/refresh-token",
            {
              method: "POST",
              body: JSON.stringify({
                refresh_token: token.refresh_token,
              }),
              headers: { "Content-Type": "application/json" },
            },
          );

          const tokens = await res.json();

          if (!res.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: tokens.expires_at,
            refresh_token: tokens.refresh_token,
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.error = token.error;
      session.access_token = token.access_token;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        const res = await fetch("http://localhost:3000/api/v1/auth/token", {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const { access_token, refresh_token, expires_at } = await res.json();

        if (res.ok && access_token) {
          return { access_token, refresh_token, expires_at };
        }

        return null;
      },
    }),
  ],
};

declare module "next-auth" {
  interface Session {
    access_token: string;
    error?: "RefreshAccessTokenError";
  }

  interface User {
    access_token: string;
    expires_at: number;
    refresh_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

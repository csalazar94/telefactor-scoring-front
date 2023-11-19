import { getToken, refreshToken } from "@/services/auth";
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
          const tokens = await refreshToken({
            refresh_token: token.refresh_token,
          });

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
        const { access_token, refresh_token, expires_at } = await getToken({
          username: credentials?.username,
          password: credentials?.password,
        });
        return { access_token, refresh_token, expires_at };
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

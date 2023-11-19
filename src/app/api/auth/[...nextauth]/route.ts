import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

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

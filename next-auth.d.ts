import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole,
  id: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser,
    accessToken?: string,
    isValid: boolean,
    provider?: string
  }
}

// import { JWT } from "next-auth/jwt"

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: "ADMIN" | "USER"
//   }
// }
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string,
    provider?: string
  }
}
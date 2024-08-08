import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole,
  provider: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser,
    provider?: string,
    role?: string
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
    role?: string,
    provider?: string
  }
}
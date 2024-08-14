import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcrypt-ts"

export default { 
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // console.log("AUTHORIZE :" , credentials)
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );
          
          if (passwordsMatch) return user;
        }
        return null;
      }
    })
  ] 
} satisfies NextAuthConfig
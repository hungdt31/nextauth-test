import NextAuth, { CredentialsSignin } from "next-auth"
import { UserRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import nookies from 'nookies'
import { v4 } from "uuid"
import { getUserById, getUserByEmail } from "@/data/user"
// import SequelizeAdapter from "@auth/sequelize-adapter"
// import { sequelize } from "./lib/sequelize"

export const { 
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      });
    },
    async signIn({user}) {
      console.log("")
    },
    async session({session}) {
      console.log("ĐĂNG NHẬP THÀNH CÔNG", session)
    }
  },
  callbacks: {
    async session({ token, session, user }){
      console.log("SESSION", user)
      console.log(token)
      // Thêm thông tin vào phiên làm việc
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      session.provider = token.provider as string
      session.accessToken = token.accessToken as string
      session.isValid = false
      console.log(session)
      
  //     const s : any = "access_token"
  // // Set
  // nookies.set(s, 'fromGetInitialProps', 'value', {
  //   maxAge: 30 * 24 * 60 * 60,
  //   path: '/',
  // })
  // const cookies : any = nookies.get(s)
  // // Destroy
  // // nookies.destroy(ctx, 'cookieName')
  // session.accessToken = cookies
  return session
    },
    async jwt({ token, account }) {
      if (account?.type == 'credentials') {
        console.log("CREDENTIALS")
      } 
      else {
        console.log("OAUTH")
      }
      if (account) {
        token.provider = account.provider
      }
      console.log("ACCOUNT", account)
      console.log("JWT", token)
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (existingUser) token.role = existingUser.role
      token.accessToken = account?.access_token
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) { 
      console.log("SIGN IN",{ user, account, profile, email, credentials })
      const email_user = user.email as string
      const existingAccount = await getUserByEmail(email_user)
      console.log("CURRENT USER: ", existingAccount)
      if (existingAccount) {
      //   throw new Error("Lỗi nè!")
        // return "/auth/login"
        // return false
      }
      nookies.set(null, 'access_token', 'frggrfesfegefef', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      return true
    }
  },
  // pages: {
  //   signIn: '/auth/login', // Trang đăng nhập tùy chỉnh
  //   error: '/auth/login'  // Trang lỗi tùy chỉnh
  // },
  // adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    generateSessionToken: () => {
      return v4()
    },
  },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
})
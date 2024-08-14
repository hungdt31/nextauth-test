import NextAuth, { CredentialsSignin } from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { v4 } from "uuid"
import instance from "@/axios"
// import SequelizeAdapter from "@auth/sequelize-adapter"
// import { sequelize } from "./lib/sequelize"

export const { 
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  events: {
    // async linkAccount({ user }) {
    //   await db.user.update({
    //     where: {
    //       id: user.id
    //     },
    //     data: {
    //       emailVerified: new Date()
    //     }
    //   });
    // },
    async session({session}) {
      console.log("LOGIN SUCCESSFULLY")
    }
  },
  callbacks: {
    async session({ token, session, user }){
      // Thêm thông tin vào phiên làm việc
      session.user.role = token.role as any
      session.user.provider = token.provider as string
      return session
    },
    async jwt({ token, account }) {
      const existingUserInformation : any = await instance({
        method: 'post',
        url: '/api/user',
        data: {
          email: token.email
        }
      });
      if (existingUserInformation) {
        token.provider = existingUserInformation.data.provider
        token.role = existingUserInformation.data.role
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) { 
      const user_email = user.email as string
      const existingUserInformation : any = await instance({
        method: 'post',
        url: '/api/user',
        data: {
          email: user_email
        }
      });
    
      if (!existingUserInformation.data){
        const provider = account?.provider as string
        const providerAccountId = account?.providerAccountId as string
        const name = profile?.name as string
        const type = account?.type
        let image = profile?.picture
        if (!image) image = user.image
        await instance({
          method: 'post',
          url: '/api/new-user',
          data: {
            email: user_email,
            provider,
            providerAccountId,
            name,
            type,
            image
          }
        });
      }
      else if (existingUserInformation.data.provider !== account?.provider) return "/auth/login?error=AccountNotLinked"
      return true
    }
  },
  // pages: {
  //   signIn: '/auth/login', // Trang đăng nhập tùy chỉnh
  //   error: '/auth/error'  // Trang lỗi tùy chỉnh
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
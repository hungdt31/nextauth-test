"use server"
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'
import { getEmailConfirmationTokenByEmail } from '@/data/email-confirmation-token'
export const generateEmailConfirmationToken = async (email: string) => {
  const existingVerificationToken =
    await getEmailConfirmationTokenByEmail(email)
  if (existingVerificationToken) {
    const now = new Date().getTime()
    const expireTime = existingVerificationToken.expires.getTime()
    if (now > expireTime) {
      await db.verificationToken.delete({
        where: {
          id: existingVerificationToken.id,
        },
      })
    } else {
      const rs = await db.verificationToken.update({
        where: {
          id: existingVerificationToken.id,
        },
        data: {
          expires: new Date(),
        },
      })
      return rs
    }
  }
  const token = uuidv4()
  const now = new Date()
  const expireTime = new Date(now.getTime() + 10 * 60 * 1000)
  const newVerificationToken = await db.verificationToken.create({
    data: {
      token,
      expires: expireTime,
      email,
    },
  })
  return newVerificationToken
}
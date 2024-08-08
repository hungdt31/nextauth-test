"use server"
import { getEmailConfirmationTokenByToken } from '@/data/email-confirmation-token'
import { db } from '@/lib/db'

export const verifyEmail = async (token: string) => {
  if (!token) {
    return {
      error: 'Missing Token',
    }
  }
  const existingVerificationToken = await getEmailConfirmationTokenByToken(token);
  if (!existingVerificationToken) {
    return {
      error: 'Token is not found',
    }
  }
  const now = new Date().getTime()
  const expire = existingVerificationToken.expires.getTime()
  if (expire < now) {
    await db.verificationToken.delete({
      where: {
        id: existingVerificationToken.id,
      },
    })
    return {
      error: 'Token expired',
    }
  }
  const existingUser = await db.user.findFirst({
    where: {
      email: existingVerificationToken.email,
    },
  })
  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }
  await db.verificationToken.delete({
    where: {
      id: existingVerificationToken.id,
    },
  })
  const id = existingUser?.id
  await db.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
    },
  })
  return {
    success: 'Email verified',
  }
}
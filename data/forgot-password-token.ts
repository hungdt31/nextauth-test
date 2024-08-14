import { db } from "@/lib/db";

export const getResetPasswordTokenByEmail = async (email : string) => {
  const existingResetPasswordToken = await db.passwordResetToken.findFirst({
    where: {
      email
    }
  })
  return existingResetPasswordToken;
}

export const getResetPasswordTokenByToken = async (token : string) => {
  const existingResetPasswordToken = await db.passwordResetToken.findFirst({
    where: {
      token
    }
  })
  return existingResetPasswordToken;
}
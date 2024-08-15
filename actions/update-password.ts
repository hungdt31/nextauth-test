'use server'
import { getResetPasswordTokenByToken } from '@/data/forgot-password-token'
import { NewPasswordSchema } from '@/schemas'
import { db } from '@/lib/db'
import bcrypt from "bcryptjs"

export const UpdatePassword = async ({
  new_password,
  token,
}: {
  new_password: string
  token: string
}) => {
  const validateFields = NewPasswordSchema.safeParse({
    password: new_password,
  })
  if (!validateFields.success) {
    return {
      error: 'Invalid password',
    }
  }
  const existingResetPasswordToken = await getResetPasswordTokenByToken(token)
  if (existingResetPasswordToken) {
    const hashedNewPassword = await bcrypt.hash(new_password, 10)
    await db.user.update({
      where: {
        email: existingResetPasswordToken.email,
      },
      data: {
        password: hashedNewPassword,
      },
    })
    await db.passwordResetToken.delete({
      where: {
        id: existingResetPasswordToken.id,
      },
    })
    return {
      success: 'Update password successfully',
    }
  }
  return {
    error: "Token is not found!"
  }
}

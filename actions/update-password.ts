'use server'
import { getResetPasswordTokenByToken } from '@/data/forgot-password-token'
import { NewPasswordSchema } from '@/schemas'
import { db } from '@/lib/db'
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
    await db.user.update({
      where: {
        email: existingResetPasswordToken.email,
      },
      data: {
        password: new_password,
      },
    })
    await db.passwordResetToken.delete({
      where: {
        id: existingResetPasswordToken.id,
      },
    })
  }
  return {
    success: 'Update password successfully',
  }
}

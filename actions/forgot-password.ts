"use server"
import { ForgotPasswordSchema } from "@/schemas"
import { v4 as uuidv4 } from 'uuid';
import z from "zod"
import { db } from "@/lib/db";
import { getResetPasswordTokenByEmail } from "@/data/forgot-password-token";
import { SendEmailResetPassword } from "@/lib/send-mail";
export const forgotPassword = async (values : z.infer<typeof ForgotPasswordSchema>) => {
  const validateFields = ForgotPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      error: "Invalid email!"
    }
  }
  const { email } = validateFields.data
  const ExistingPasswordResetToken = await getResetPasswordTokenByEmail(email);
  if (ExistingPasswordResetToken) {
    await db.passwordResetToken.delete({
      where: {
        id: ExistingPasswordResetToken.id
      }
    })
  }
  const PasswordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token: uuidv4(),
      expires: new Date(new Date().getTime() + 600 * 1000)
    }
  })
  await SendEmailResetPassword({
    email: PasswordResetToken.email,
    token: PasswordResetToken.token
  })
  return {
    success: "Email sent"
  }
}
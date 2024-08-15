"use server"
import { getResetPasswordTokenByToken } from "@/data/forgot-password-token";

export const ConfirmResetPassword = async (token : string) => {
  if (!token) return {
    error: "Missing token"
  }
  const existingResetPasswordToken = await getResetPasswordTokenByToken(token);
  if (!existingResetPasswordToken) {
    return {
      error: "Token is not found"
    }
  }
  const expireTime = existingResetPasswordToken.expires.getTime();
  const now = new Date().getTime()
  if (expireTime < now) {
    return {
      error: "Token expired"
    }
  }
  return {
    success: "Confirm successfully"
  }
}
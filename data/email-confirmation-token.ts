import { db } from "@/lib/db";

export const getEmailConfirmationTokenByEmail = async (email : string) => {
  const existingEmailConfirmationToken = await db.verificationToken.findFirst({
    where: {
      email
    }
  })
  return existingEmailConfirmationToken;
}

export const getEmailConfirmationTokenByToken = async (token : string) => {
  const existingEmailConfirmationToken = await db.verificationToken.findFirst({
    where: {
      token
    }
  })
  return existingEmailConfirmationToken;
}
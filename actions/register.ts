'use server'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateEmailConfirmationToken } from './email-confirmation-token'
import { SendEmailConfirmation } from '@/lib/send-mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  // console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }
  const { email, password, name } = validatedFields.data
  // const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: 'Email already in use!',
    }
  }
  await db.user.create({
    data: {
      name,
      email,
      password,
      provider: "credentials"
    },
  })

  // TODO: send verification token email
  const verificationToken = await generateEmailConfirmationToken(email)
  await SendEmailConfirmation({
    token: verificationToken.token,
    email: verificationToken.email
  })
  return {
    success: 'Email sent!',
  }
}

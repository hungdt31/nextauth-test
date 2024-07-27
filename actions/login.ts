'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT 
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": 
          return {
            error: "Invalid credentails!"
          }
        default:
          return {
            error: "Something went wrong!"
          }
      }
    }
    throw error;
  }
  return {
    success: 'Email sent!',
  }
}

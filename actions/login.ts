'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import { generateEmailConfirmationToken } from '@/actions/email-confirmation-token'
import { SendEmailConfirmation } from '@/lib/send-mail'
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  // console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    if (existingUser.provider === 'credentials' && !existingUser.emailVerified) {
      const EmailConfirmationToken = await generateEmailConfirmationToken(email)
      await SendEmailConfirmation({
        token: EmailConfirmationToken.token,
        email: EmailConfirmationToken.email,
      })
      return {
        success: 'Email sent, please check to verify',
      }
    } else if (existingUser.provider !== 'credentials') {
      return {
        error: 'Email is already used with other provider',
      }
    }
  }
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentails!',
          }
        case 'AccessDenied':
          return {
            error: 'Email is already used with other provider',
          }
        default:
          return {
            error: 'Something went wrong',
          }
      }
    }
    throw error
  }
  return {
    success: 'Email sent',
  }
}

import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email()
})

export const NewPasswordSchema = z.object({
  password: z.string().min(4),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(4, {
    message: 'Minimum 4 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

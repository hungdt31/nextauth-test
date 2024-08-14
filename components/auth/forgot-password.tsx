'use client'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { ForgotPasswordSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormNotice } from '@/components/auth/form-notice'
import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { forgotPassword } from '@/actions/forgot-password'

export default function ForgotPassword() {
  const [error, setError] = useState<String | undefined>('')
  const [success, setSuccess] = useState<String | undefined>('')
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('/auth/forgot-password')
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    },
  })
  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      forgotPassword(values).then((data) => {
        setSuccess(data.success);
        setError(data.error)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel={t('headerLabel')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormNotice message={success} type="success" />
          <FormNotice message={error} type="error" />
          <Button disabled={isPending} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

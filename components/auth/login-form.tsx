'use client'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'
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
import { login } from '@/actions/login'
import { useEffect, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginForm() {
  const ErrorParam = useSearchParams().get('error') as string
  const [error, setError] = useState<String | undefined>('')
  const [success, setSuccess] = useState<String | undefined>('')
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('/auth/login')
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  useEffect(() => {
    if (ErrorParam) setError('Email is already used in other provider')
    form.reset()
  }, [ErrorParam])
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel={t('headerLabel')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/auth/register"
      showSocial
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const [type, setType] = useState<string>('password')
                return (
                  <FormItem>
                    <FormLabel className="flex items-center gap-3">
                      Password{' '}
                      <span
                        onClick={() => {
                          type == 'password'
                            ? setType('text')
                            : setType('password')
                        }}
                      >
                        {type == 'password' ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          disabled={isPending}
                          type={type}
                          placeholder="********"
                        />
                        <Link
                          className="font-light text-[12px]"
                          href={'/auth/forgot-password'}
                        >
                          {t('forgot_password')}
                        </Link>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <FormNotice message={success} type="success" />
          <FormNotice message={error} type="error" />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

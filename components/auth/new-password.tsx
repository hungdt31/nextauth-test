'use client'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { NewPasswordSchema } from '@/schemas'
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
import { ConfirmResetPassword } from '@/actions/new-password'
import SpinnerLoading from '@/components/loading/spinner'
import { UpdatePassword } from '@/actions/update-password'
export default function NewPassword() {
  const token = useSearchParams().get('token') as string
  const [error, setError] = useState<String | undefined>('')
  const [success, setSuccess] = useState<String | undefined>('')
  const [notice, setNotice] = useState<String | undefined>('')
  const [isHidden, setIsHidden] = useState<Boolean>(true)
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('/auth/new-password')
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })
  useEffect(() => {
    ConfirmResetPassword(token).then((data) => {
      setError(data.error)
      setSuccess(data.success)
      if (data.success)
        setTimeout(() => {
          setIsHidden(false)
          setSuccess('')
        }, 3000)
    })
  }, [])
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')
    setNotice('')
    startTransition(() => {
      const { password } = values
      UpdatePassword({
        token,
        new_password: password,
      }).then((data) => {
        setNotice(data.success)
        setError(data.error)
      })
    })
  }
  return (
    <div>
      <CardWrapper
        backButtonHref="/auth/login"
        backButtonLabel={t('backButtonLabel')}
        showSocial={false}
        headerLabel={t('headerLabel')}
      >
        {!isHidden && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
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
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <Button disabled={isPending} type="submit" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        )}
        <div className='mt-5'>
          <FormNotice type="error" message={error} />
        </div>
        {success && (
          <div className="relative animate-appear-from-right">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 flex justify-center items-center">
              <SpinnerLoading />
            </div>
            <FormNotice type="success" message={success} />
          </div>
        )}
        <div className="mt-5">
          <FormNotice type="success" message={notice} />
        </div>
      </CardWrapper>
    </div>
  )
}

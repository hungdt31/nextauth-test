'use client'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Social = () => {
  const router = useRouter()
  const onClick = (provider : "google" | "github") => {
    try {
      signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      })
    } catch (error) {
      router.push("/")
    }
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  )
}

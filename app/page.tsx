import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/loggin-button'

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="space-y-6 text-center">
        <div className="text-5xl text-white font-bold">🌟 Auth</div>
        <p className='text-white'>A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant={'secondary'}>Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}

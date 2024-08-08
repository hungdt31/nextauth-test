'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/loggin-button'
import { Move, MoveRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function Home() {
  const { theme } = useTheme()
  const circlesArray = new Array(9).fill(null)
  // useEffect(() => {
  //   console.log(theme)
  // }, [theme])
  return (
    <main className="flex h-full flex-col items-center justify-center area">
      <div className="space-y-6 text-center z-50">
        <div className="text-5xl font-bold animate-bounce">
          {theme == 'dark' ? '🌟' : '🌈'}{' '}
        </div>
        <p className="large rise">NEXT AUTH TEST</p>
        <p className="small outline mx-3 flex gap-3 justify-between p-0">
          <p className="text-center w-[100%]">
            A simple authentication service
          </p>
          <LoginButton>
            <button className="bg-outline/50 h-[100%] rounded-r-[20px] w-[50px] pl-3 text-white border-l-outline border-l-2 cursor-pointer">
              <MoveRight />
            </button>
          </LoginButton>
        </p>
      </div>
      <ul className="circles">
        {circlesArray.map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </main>
  )
}

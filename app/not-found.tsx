'use client'
import { useLottie } from 'lottie-react'
import { House } from 'lucide-react'
import not_found from '@/animation/404.json'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'
import Link from 'next/link'
export default function NotFoundPage() {
  const options = {
    animationData: not_found,
    loop: true,
  }

  const { View } = useLottie(options)

  return (
    <div>
      <div className="flex justify-around p-5">
        <ModeToggle />
        <Link href={'/'}>
          <Button className="rounded-full py-5 flex items-center gap-3">
            <House /> Home
          </Button>
        </Link>
      </div>
      <div className="w-full h-[60%] flex justify-center px-3">{View}</div>
    </div>
  )
}

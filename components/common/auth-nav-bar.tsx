"use client"
import { ModeToggle } from '@/components/theme/mode-toggle'
import LocaleSwitcher from '@/components/locale/LocaleSwitcher'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function AuthNavBar({
  showToggleLanguage
} : {
  showToggleLanguage : Boolean
}) {
  const router = useRouter()
  return (
    <div className="flex gap-5 items-center p-3 w-ful justify-around mt-3">
      <div className="flex gap-5 items-center">
        <ModeToggle />
        {showToggleLanguage && <LocaleSwitcher />}
      </div>
      <button className='flex items-center gap-3' onClick={() => router.push("/")}>
      <Camera />
      <p className='rise cursor-pointer'>PhoTo GaLLery</p>
      </button>
    </div>
  )
}

'use client'
import { MoveRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { useAnimationFrame } from 'framer-motion'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Banner1 from '@/public/banner_model_1.avif'
import Image from 'next/image'
import { Card, CardHeader } from '@/components/ui/card'
import { FaUnsplash } from 'react-icons/fa'
// import { useEffect } from 'react'

export default function Banner() {
  const { theme } = useTheme()
  const t = useTranslations('/')
  const circlesArray = new Array(12).fill(null)
  const ref = useRef<HTMLDivElement>(null) // Chỉ định kiểu dữ liệu HTMLDivElement cho useRef

  useAnimationFrame((t) => {
    if (ref.current) {
      const rotate = Math.sin(t / 10000) * 200
      const y = (1 + Math.sin(t / 1000)) * -50
      ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`
    }
  })
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/login')
  }
  return (
    <div className="flex h-[800px] lg:h-[500px] flex-col items-center justify-center area relative">
      <div className="space-y-6 text-center z-50 flex items-center flex-wrap justify-center gap-3">
        {/* <Cube/> */}
        <div className="relative">
          <div className="cloud1">
            <div className="base1">
              <div className="shape one"></div>
              <div className="shape two"></div>
              <div className="shape eight"></div>
            </div>
          </div>

          <div className="cloud2">
            <div className="base2">
              <div className="base2half"></div>
              <div className="shape three"></div>
              <div className="shape four"></div>
              <div className="shape five"></div>
              <div className="shape six"></div>
              <div className="shape seven"></div>
            </div>
          </div>
          <Image
            src={Banner1}
            width={300}
            height={300}
            alt="beautiful girl"
            className="rounded-full shadow-lg outline outline-offset-4 outline-outline"
          />
          <Card className='absolute top-3 -right-9'>
            <CardHeader><span className='inline-block'>Supported by</span> <span className='flex items-center gap-3 font-bold'><FaUnsplash/> Unsplash</span></CardHeader>
          </Card>
        </div>
        <div>
          <p className="large rise">PHOTO GALLERY </p>
          <div className="small outline mx-3 flex gap-3 justify-between p-0 relative">
            <div className='strip'></div>
            <p className="pl-3">{t('outline')}</p>
            <button
              onClick={onClick}
              className="bg-outline/50 w-[50px] pl-3 text-white border-l-outline border-l-2"
            >
              <MoveRight className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <ul className="circles">
        {circlesArray.map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  )
}

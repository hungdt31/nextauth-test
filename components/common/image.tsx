'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { ArrowDown, Heart, Plus } from 'lucide-react'
interface ImageProps {
  image: string
  user_name: string
  user_des: string
  user_avatar: string
}
export const Image = ({
  image,
  user_name,
  user_des,
  user_avatar,
}: ImageProps) => {
  const [isHovered, setHovered] = useState(false)
  return (
    <div
      className="relative w-[100%] h-[100%] shadow-lg rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} className="w-[100%] h-[100%] rounded-lg" loading='lazy'/>
      <div
        className={cn(
          'absolute top-0 w-[100%] h-[100%] flex flex-col justify-between px-3 py-5 shadow-inner-image',
          isHovered ? 'rounded-lg' : 'hidden'
        )}
      >
        <div className="flex justify-end gap-3">
          <Button variant={'secondary'}>
            <Heart />
          </Button>
          <Button variant={'secondary'}>
            <Plus />
          </Button>
        </div>
        <div className="flex justify-between items-center animate-scale-up-hor-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user_avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-bold text-lg">{user_name}</p>
              <p className="des text-gray-200">{user_des}</p>
            </div>
          </div>
          <Button variant={'secondary'}>
            <ArrowDown />
          </Button>
        </div>
      </div>
    </div>
  )
}

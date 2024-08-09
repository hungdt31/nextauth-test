"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
export const UserInfo = () => {
  const { data : session } = useSession();
  const [name, setName] = useState<string | null | undefined>('')
  const [image, setImage] = useState<string | undefined>('')
  useEffect(() => {
    if (session) {
      setName(session.user.name)
      const img : (string | undefined) = session.user.image as (string | undefined)
      setImage(img)
    }
  },[session])
  return (
    <div className="flex items-center gap-2">
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p>{name}</p>
    </div>
  )
}
"use server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/auth";
export const UserInfo = async () => {
  const session = await auth();
  const image : string = session?.user.image as string
  return (
    <div className="flex items-center gap-2">
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p>{session?.user.name}</p>
    </div>
  )
}
"use server"
import { auth } from "@/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default async function ProfilePage() {
  const session = await auth()
  return (
    <div>
      {
        session?.user.name
      }
      <Link href={"/"}>
      <Button>Trang chủ</Button>
      </Link>
      
    </div>
  )
}
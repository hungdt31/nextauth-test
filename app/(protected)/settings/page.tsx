'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Swal from "sweetalert2"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function UserSession() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) console.log(session)
  useEffect(() => {
    if (!session) {
      Swal.fire({
        title: "Thông báo",
        text: "Your session is expired!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Back to login"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth/login")
        }
      });
    }
  },[session])
  const pathname = usePathname()
  return (
    <main className="mt-5 flex justify-center text-white w-full p-3 rounded-md">
      <div
        className={cn(
          'flex flex-col space-y-4 px-7 py-5 rounded-lg shadow-lg',
          session && 'bg-outline'
        )}
      >
        {session && (
          <>
            <h2 className="text-xl font-bold">You&apos;re signed in as:</h2>
            <pre>{session.user?.email} </pre>{' '}
            <Button className="mt-3" onClick={() => signOut()}>
              {' '}
              Sign out{' '}
            </Button>{' '}
          </>
        )}{' '}
        {!session && pathname !== '/signin' && (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}{' '}
      </div>{' '}
    </main>
  )
}

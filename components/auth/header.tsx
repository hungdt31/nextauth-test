import { cn } from '@/lib/utils'
import { Audiowide } from 'next/font/google'

const font = Audiowide({
  subsets: ['latin'],
  weight: ['400'],
})
interface HeaderProps {
  label: string
}
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('font-semibold', font.className)}>🔒 Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}

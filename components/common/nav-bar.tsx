import { ModeToggle } from '@/components/theme/mode-toggle'
import LocaleSwitcher from '@/components/locale/LocaleSwitcher'
import { UserInfo } from './user'
import { UserDropdownMenu } from './dropdown'
export default function NavBar() {
  return (
    <div className="flex gap-5 items-center p-3 w-ful justify-around mt-3">
      <div className="flex gap-5 items-center">
        <ModeToggle />
        <LocaleSwitcher />
      </div>
      <UserDropdownMenu>
        <UserInfo />
      </UserDropdownMenu>
    </div>
  )
}

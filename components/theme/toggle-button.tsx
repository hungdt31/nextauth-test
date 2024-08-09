import { cn } from '@/lib/utils'
import styles from './toggle-button.module.css'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
interface ToggleButtonProps {
  rounded?: boolean
  stateToggle: string | undefined
  onToggle: any
}
export const ToggleButton = ({
  rounded,
  stateToggle,
  onToggle,
}: ToggleButtonProps) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={stateToggle == 'dark'}
        onChange={onToggle}
      />
      <span
        className={cn(
          styles.slider,
          rounded ? 'rounded-full before:rounded-full' : ''
        )}
      />
      <p
        className={cn(
          'absolute top-1',
          stateToggle == 'dark' ? 'left-6' : 'left-1'
        )}
      >
        {stateToggle == 'dark' ? (
          <MoonIcon color="yellow" />
        ) : (
          <SunIcon color="black" />
        )}
        <div></div>
      </p>
    </label>
  )
}

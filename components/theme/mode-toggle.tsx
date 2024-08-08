'use client'
import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { ToggleButton } from '@/components/theme/toggle-button'
export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <ToggleButton
        rounded={true}
        onToggle={() => {
          theme == "light" ? setTheme("dark") : setTheme("light")
        }}
        stateToggle={theme}
      />
    </div>
  )
}

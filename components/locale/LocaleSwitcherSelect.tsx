'use client'

import { CheckIcon, LanguageIcon } from '@heroicons/react/24/solid'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import { useState, useTransition, useEffect } from 'react'
import { Locale } from '@/config'
import { setUserLocale, getUserLocale } from '@/services/locale'
import Image from 'next/image'
import EngFlag from '@/public/Flag_of_England.svg'
import ViFlag from '@/public/Flag_of_Vietnam.svg.webp'

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
  label: string
}

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const [flag, setFlag] = useState<string>('')
  useEffect(() => {
    const fn = async () => {
      const rs = await getUserLocale()
      setFlag(rs)
    }
    fn()
  }, [])
  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
      setFlag(locale)
    })
  }

  return (
    <div className="relative cursor-pointer">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            'rounded-sm p-2 transition-colors hover:opacity-50',
            isPending && 'pointer-events-none opacity-60'
          )}
        >
          <Select.Icon>
            <div className="flex items-center">
              {flag == 'vi' ? (
                <Image
                  src={ViFlag}
                  width={20}
                  height={20}
                  alt="Vietname Flag"
                />
              ) : (
                <Image
                  src={EngFlag}
                  width={20}
                  height={20}
                  alt="England Flag"
                />
              )}{' '}
              {'|'} {flag}
            </div>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-background py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-outline/30"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === defaultValue && (
                      <CheckIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span>{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-outline/30" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

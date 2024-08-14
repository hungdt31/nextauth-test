'use client'
import { getCollectionQuery } from '@/hooks/collection'
import { Dot, Tag } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { Download } from '@/components/loading/download'
import { useTranslations } from 'next-intl'

export default function Collection() {
  const t = useTranslations("/")
  const { data, isFetched, isLoading } = getCollectionQuery()
  // if (isFetched) console.log(data)
  if (isLoading) return (
    <div className='flex justify-center h-[200px] items-center'>
      <Download/>
    </div>
  )
  return (
    <div className="bg-collection py-5 px-3 space-y-6 mt-5">
      <h1 className="text-center">{t("collection")}</h1>
      <div className="flex justify-center lg:gap-5 flex-wrap gap-5">
        {data?.map((el: any, index: number) => {
          return (
            <div key={index} className="md:w-[40%] w-[70%] lg:w-[30%]">
              <Link href={el.links.html}>
                <div className="grid grid-cols-3 gap-1 grid-rows-2 h-[60%] hover:opacity-70">
                  {el.preview_photos.map((e: any, index: number) => (
                    <div
                      key={index}
                      className={cn(
                        index == 3 ? 'hidden' : '',
                        index == 0 ? 'row-span-2 col-span-2' : ''
                      )}
                    >
                      <img
                        src={e.urls.full}
                        alt={e.urls.raw}
                        className={cn(
                          index == 0 ? 'rounded-l-lg' : '',
                          index == 1 ? 'rounded-tr-lg' : '',
                          index == 2 ? 'rounded-br-lg' : '',
                          'h-[100%] w-[100%]'
                        )}
                        loading='lazy'
                      />
                    </div>
                  ))}
                </div>
                <div className='my-3'>
                  <h3>{el.title}</h3>
                  <CardDescription>
                    {el.total_photos} images <Dot className="inline" /> Curated
                    by {el.user.first_name} {el.user.last_name}
                  </CardDescription>
                </div>
              </Link>
              <div className="flex flex-wrap gap-3 items-center">
              <Tag />
                {el?.tags?.map((tag: any, index: number) => (
                  <Button variant={'secondary'} key={index}>{tag.title}</Button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className='justify-end flex'>
        <Button className='ml-auto mr-3' variant={"link"}>{t("explore")}</Button>
      </div>
    </div>
  )
}

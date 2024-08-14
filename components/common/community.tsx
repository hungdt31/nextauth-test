'use client'
import { getCommunityQuery } from '@/hooks/community'
import { Download } from '@/components/loading/download'
import { useTranslations } from 'next-intl'
import { FcLike } from 'react-icons/fc'
import { Image } from 'lucide-react'
import { MdPlace, MdCollections  } from 'react-icons/md'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RestCommunity } from '@/components/common/rest-community'
import { SpecialAvatar } from './avatar'

export const Community = () => {
  const t = useTranslations('/')
  const { data, isLoading, isFetched } = getCommunityQuery()
  if (isLoading) return <div className='flex justify-center'><Download /></div>
  // if (isFetched) console.log(data)
  return (
    <div className="pb-9 space-y-6 bg-center bg-community bg-cover bg-no-repeat min-h-[600px] bg-opacity-30 mx-5">
      <div className="pt-5 pl-5 space-y-2">
        <h1>{t('community')}</h1>
        <h4>{t('des_community')}</h4>
        <RestCommunity/>
      </div>
      <div className="flex justify-end mr-5 gap-7 flex-wrap">
        {data.map((el: any, index: number) => (
          <div key={index} className="flex flex-col items-center border-2 rounded-lg py-5 px-3 hover:scale-110 transition ease-in-out delay-100 hover:-translate-y-1 duration-300 bg-gray-500 bg-opacity-25">
            <SpecialAvatar image={el.profile_image.large}/>
            <div className="text-black">
              <p>
                {el.first_name} {el.last_name}
              </p>
              <p>
                <MdPlace className="inline" /> {el.location}
              </p>
              <div className="flex items-center gap-3 mt-3">
              <Button variant={"secondary"} className='rounded-full flex items-center gap-1'>
                  <FcLike className="inline" /> {el.total_likes}
                </Button>
                <Button variant={"secondary"} className='rounded-full flex items-center gap-1'>
                  <Image className="inline" /> {el.total_photos}
                  </Button>
                <Button variant={"secondary"} className='rounded-full flex items-center gap-1'>
                  <MdCollections className="inline" /> {el.total_collections}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

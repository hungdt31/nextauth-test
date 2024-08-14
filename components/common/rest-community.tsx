'use client'
import { getTheRestQuery } from '@/hooks/community'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
export const RestCommunity = () => {
  const { data, isFetched } = getTheRestQuery()
  // if (isFetched) console.log(data)
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {data?.map((el: any, index: number) => (
        <Avatar key={index}>
          <AvatarImage src={el.profile_image.large} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
      <a
        className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 z-50"
        href="#"
      >
        +99
      </a>
    </div>
  )
}

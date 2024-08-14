"use client"
import { getPhotoPopularQuery } from "@/hooks/popular"
import { useTranslations } from "next-intl"
import { Image } from "./image"
import { cn } from "@/lib/utils"
export const Popular = () => {
  const t = useTranslations("/")
  const { data, isFetched } = getPhotoPopularQuery()
  // if (isFetched) console.log(data)
  return (
    <div className="pb-9">
      <h1 className="py-5 pl-5">{t("popular")}</h1>
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-5 m-auto w-[80%] grid-cols-1">
      {
        data?.map((dta : any, index: number) => {
          return (
            <div 
              className={cn(
                index == 0 ? "col-span-1 row-span-2" : ""
              )}
              key={index}
            >
              <Image user_name={dta.user.first_name + " " + dta.user.last_name} user_des={dta.user.bio} user_avatar={dta.user.profile_image.medium} image={dta.urls.small}/>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
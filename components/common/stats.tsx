"use client"
import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { getStatMonthQuery } from '@/hooks/stats'
import { useTranslations } from 'next-intl';
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};
export default function StatPage() {
  const { data } = getStatMonthQuery()
  const t = useTranslations("/")
  // useEffect(() => {
  //   console.log(data)
  // },[data])
  return (
    <div className='px-5 pb-7'>
      <h1 className='text-center'>{t('dev')}</h1>
      <div className='flex justify-center'>
      <p className='font-light border-l-8 pl-5 mt-5'>
      {t('des_dev_1')} <br/>{t('des_dev_2')}
      </p>
      </div>
      <div className='flex flex-wrap gap-5 justify-center mt-7'>
        {data?.map((el, index: number) => (
          <Card key={index}>
            <CardHeader>
              {<el.icon/>}
              <CardDescription>{el.totalLabel}</CardDescription>
              <CardTitle>{formatNumber(el.total)}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{el.monthLabel}</CardDescription>
              <p>+ {formatNumber(el.month)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
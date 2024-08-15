'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
export default function Footer() {
  const t = useTranslations('/')
  return (
    <div className="flex px-5 py-9 bg-collection items-center gap-7 justify-center">
      <h1>{t('footer')}</h1>
      <div>
        <Link href={'https://unsplash.com/'}>https://unsplash.com</Link>
        <div className="flex items-center gap-3 mt-3">
          <Link href={'https://www.facebook.com/unsplash'}>
            <FaFacebook size={28} />
          </Link>
          <Link href={'https://x.com/unsplash'}>
            <FaTwitter size={28} />
          </Link>
          <Link href={'https://www.instagram.com/unsplash'}>
            <FaInstagram size={28} />
          </Link>
        </div>
      </div>
    </div>
  )
}

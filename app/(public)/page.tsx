'use client'
import Banner from '@/components/common/banner'
import Footer from '@/components/common/footer'
import Collection from '@/components/common/collection'
import { Popular } from '@/components/common/popular'
import { Community } from '@/components/common/community'
import StatPage from '@/components/common/stats'
import { motion, Variants, useScroll } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FaArrowUp } from 'react-icons/fa'
const slideInVariants: Variants = {
  offscreen: { opacity: 0, y: -50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

export default function Page() {
  const components = [
    { id: 'banner', component: <Banner key="banner" />, label: 'Banner' },
    {
      id: 'collection',
      component: <Collection key="collection" />,
      label: 'Collection',
    },
    { id: 'popular', component: <Popular key="popular" />, label: 'Popular' },
    {
      id: 'community',
      component: <Community key="community" />,
      label: 'Community',
    },
    { id: 'statpage', component: <StatPage key="statpage" />, label: 'Stats' },
  ]

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  const { scrollYProgress } = useScroll()
  return (
    <div className="space-y-7">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="flex justify-center space-x-4 flex-wrap">
        {components.map(({ id, label }) => (
          <Button
            key={id}
            variant={'link'}
            onClick={() => handleScrollTo(id)}
            className="text-xl"
          >
            #{label}
          </Button>
        ))}
      </div>

      {components.map(({ id, component }, index) => (
        <motion.div
          key={index}
          id={id}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideInVariants}
        >
          {component}
        </motion.div>
      ))}
      <Footer key="footer" />
      <Button
        className="fixed bottom-3 right-3 z-50 rounded-full"
        onClick={() => handleScrollTo('nav-bar')}
      >
        <FaArrowUp />
      </Button>
    </div>
  )
}

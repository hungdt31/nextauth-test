'use client'
import styles from "./index.module.scss"
export const SpecialAvatar = ({ image }: { image: string }) => {
  return (
    <div className={styles.avatar}>
      <img src={image} className={styles.avatar_image} alt={image} loading='lazy'/>
    </div>
  )
}

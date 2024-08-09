"use client"
import styles from "@/components/cube/cube.module.css";
import React, { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export default function Cube() {
  const ref = useRef<HTMLDivElement>(null); // Chỉ định kiểu dữ liệu HTMLDivElement cho useRef

  useAnimationFrame((t) => {
    if (ref.current) {
      const rotate = Math.sin(t / 10000) * 200;
      const y = (1 + Math.sin(t / 1000)) * -50;
      ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.cube} ref={ref}>
        <div className={`${styles.side} ${styles.front}`} />
        <div className={`${styles.side} ${styles.left}`} />
        <div className={`${styles.side} ${styles.right}`} />
        <div className={`${styles.side} ${styles.top}`} />
        <div className={`${styles.side} ${styles.bottom}`} />
        <div className={`${styles.side} ${styles.back}`} />
      </div>
    </div>
  );
}

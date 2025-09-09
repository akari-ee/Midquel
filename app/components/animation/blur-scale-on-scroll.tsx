import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Props = React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  /**
   * 최대 블러(px)
   */
  maxBlur?: number;
  /**
   * 효과가 정점에 도달하는 스크롤 진행 비율 (0-1)
   */
  blurSpeed?: number;
  /**
   * 최솟값 스케일(0-1)
   */
  minScale?: number;
}>;

export default function BlurScaleOnScroll({
  className,
  style,
  children,
  maxBlur = 15,
  blurSpeed = 0.25,
  minScale = 0.6,
}: Props) {
  const { scrollYProgress } = useScroll();

  const blur = useTransform(
    scrollYProgress,
    [0, blurSpeed],
    ["blur(0px)", `blur(${maxBlur}px)`]
  );

  const scale = useTransform(scrollYProgress, [0, blurSpeed], [1, minScale]);

  return (
    <motion.div
      className={className}
      style={{ ...style, filter: blur, scale }}
    >
      {children}
    </motion.div>
  );
}



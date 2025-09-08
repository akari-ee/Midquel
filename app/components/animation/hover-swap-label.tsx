import { motion } from "motion/react";
import { useState } from "react";

export default function HoverSwapLabel({ text }: { text: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="inline-block h-fit overflow-hidden align-middle"
      initial={false}
    >
      <motion.span
        className="block"
        animate={{ y: hovered ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 500, damping: 36 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="block -mt-[1.5em]"
        initial={{ y: "100%" }}
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 500, damping: 36 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}


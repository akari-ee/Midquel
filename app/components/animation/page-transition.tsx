"use client"

import type React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
  currentPath: string
}

export function PageTransition({ children, currentPath }: PageTransitionProps) {
  const [lastPath, setLastPath] = useState(currentPath)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [lastHtml, setLastHtml] = useState<string | null>(null)
  const [exitingHtml, setExitingHtml] = useState<string | null>(null)

  // 1) 경로 변경 감지 -> 직전 HTML 스냅샷을 퇴장 레이어에 고정
  useLayoutEffect(() => {
    if (currentPath !== lastPath) {
      setExitingHtml(lastHtml)
      setLastPath(currentPath)
    }
  }, [currentPath, lastPath, lastHtml])

  // 2) 현재 렌더된 children의 HTML을 다음 전환을 위해 보관
  useLayoutEffect(() => {
    setLastHtml(contentRef.current?.innerHTML ?? null)
  })

  return (
    <div className="relative min-h-screen">
      {/* Transition backdrop to prevent white flash under layers */}
      {exitingHtml && (
        <div className="fixed inset-0 z-[0] bg-background" aria-hidden />
      )}

      {exitingHtml && (
        <motion.div
          key={`exit-${lastPath}`}
          className="fixed inset-0 z-[5] pointer-events-none"
          initial={{ y: 0, opacity: 1, scale: 1, rotate: 0, x: 0 }}
          animate={{
            y: "-25%",
            opacity: 0,
            scale: 1,
            rotate: 0,
            x: 0,
            transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
          }}
          onAnimationComplete={() => setExitingHtml(null)}
        >
          <div dangerouslySetInnerHTML={{ __html: exitingHtml }} />
        </motion.div>
      )}

      <motion.div
        key={`enter-${currentPath}`}
        className="relative z-[10]"
        initial={{ y: "100%", opacity: 1, scale: 1, rotate: 0, x: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          x: 0,
          transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
        }}
      >
        <div ref={contentRef} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

import React from "react";
import { ThemeProvider } from "next-themes";
import { useEffect, useRef } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Lenis smooth scroll 초기화
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let lenis: any;
    let isMounted = true;

    const setup = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (!isMounted) return;
        lenis = new Lenis({
          // 기본 감속/가속
          lerp: 0.1,
          // 휠/터치 모두 스무스 처리
          smoothWheel: true,
          // 감도 조정
          wheelMultiplier: 1,
          touchMultiplier: 1,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        };
        rafIdRef.current = requestAnimationFrame(raf);
      } catch (e) {
        // lenis 미설치 시에도 앱이 동작하도록 무시
        if (import.meta.env.DEV) {
          console.warn("Lenis is not available. Install 'lenis' to enable smooth scroll.");
        }
      }
    };

    setup();

    return () => {
      isMounted = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      // @ts-ignore
      lenis?.destroy?.();
    };
  }, []);

  return (
    <ThemeProvider forcedTheme="dark" defaultTheme={"dark"} attribute="class">
      {children}
    </ThemeProvider>
  );
}

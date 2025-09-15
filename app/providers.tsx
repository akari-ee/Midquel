import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import { useEffect, useRef } from "react";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Lenis smooth scroll 초기화
  const rafIdRef = useRef<number | null>(null);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 10,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false,
            refetchInterval: false,
            throwOnError: false,
          },
          mutations: {
            retry: 0,
            throwOnError: false,
            onError: () => {
              // toast.custom((t) => <CToast title="에러 발생" isError />);
            },
            onSuccess: () => {
              // toast.custom((t) => <CToast title="성공" />);
            },
          },
        },
        queryCache: new QueryCache({
          onError: () => {
            // toast("Event has been created.");
          },
        }),
      })
  );

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
          console.warn(
            "Lenis is not available. Install 'lenis' to enable smooth scroll."
          );
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
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Providers from "./providers";
import { routeConfig } from "./config/route-config";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import { Analytics } from "@vercel/analytics/react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background min-h-dvh antialiased relative font-pretendard">
        <Analytics />
        {children}
        <ScrollRestoration
          getKey={(location) => {
            // /film/:slug 상세 페이지에서는 스크롤 복원을 비활성화 (항상 상단으로)
            if (location.pathname.startsWith("/film/")) {
              return location.key; // 매 탐색마다 새로운 키 → 저장된 위치가 없어 항상 top
            }
            // 그 외 페이지는 기존 동작 유지 (공통 키 사용)
            return "root";
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isDevelopment = import.meta.env.DEV;
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404," : "Error";
    details =
      error.status === 404 ? "Page not found" : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex flex-col pt-16 bg-[#0f0f0f] text-white h-dvh min-h-fit">
      <Navbar initBg="bg-[#0f0f0f]" />
      <div className="container mx-auto flex flex-col gap-8 max-h-dvh py-20 px-6">
        <div className="flex flex-row lg:flex-col uppercase text-[40px] font-medium tracking-tighter leading-tight lg:text-[56px] xl:text-[64px] gap-2 lg:gap-0">
          <h1>{message}</h1>
          <p>{details}</p>
        </div>
        <div className="uppercase underline underline-offset-4 text-sm">
          <Link to={routeConfig.HOME.href}>Return home</Link>
        </div>
        <div className="h-3/4 mt-6 mb-20">
          <img
            src="https://framerusercontent.com/images/BcqcmnqSJiqE5oGWPFLwDyN5M.jpg"
            alt="error"
            className="h-full w-full object-cover"
          />
        </div>
        {isDevelopment && stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
      <Footer initBg="bg-[#0f0f0f]" />
    </main>
  );
}

import { Link } from "react-router";
import { appConfig } from "~/config/app-config";
import HoverSwapLabel from "../animation/hover-swap-label";
import { cn } from "~/lib/utils";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { profileQueryOptions } from "~/service/profile";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { createBrowserClient } from "~/config/supabase-config";

interface FooterProps {
  initBg?: string;
}

export default function Footer({ initBg }: FooterProps) {
  const supabase = createBrowserClient();

  return (
    <footer
      className={cn(
        "h-fit px-5 py-6 flex justify-between items-center flex-nowrap relative z-20 bg-background",
        initBg
      )}
    >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallback={<div>Error</div>}>
            <Suspense fallback={<div>Loading</div>}>
              <SuspenseQuery {...profileQueryOptions.social(supabase)}>
                {({ data }) => (
                  <ul className="flex justify-start items-center gap-4 md:gap-10">
                    {data.map(({ label, href }) => (
                      <li
                        key={label}
                        className="text-sm md:text-base uppercase"
                      >
                        <Link to={href}>
                          <HoverSwapLabel text={label} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </SuspenseQuery>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <div>
        <p className="text-sm md:text-base">{appConfig.footer.copyright}</p>
      </div>
    </footer>
  );
}

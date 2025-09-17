import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import ArchiveCard from "./archive-card";
import { handle } from "~/routes/_layout._index";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { SuspenseQuery } from "@suspensive/react-query";
import { archiveQueryOptions } from "~/service/archive";
import { createBrowserClient } from "~/config/supabase-config";

export default function ArchivesSection() {
  const supabase = createBrowserClient();

  return (
    <section
      id={handle.navTargetSectionId}
      className="w-full h-fit flex flex-col gap-5 pb-20"
    >
      <div className="flex justify-between items-end uppercase w-full py-1">
        <h2 className="text-3xl lg:text-[40px] font-medium tracking-tighter">
          Selected Archives
        </h2>
        <Link
          to={routeConfig.ARCHIVES.href}
          className="hidden md:block underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
        >
          See All Archives
        </Link>
      </div>
      
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallback={<div>Error loading archives</div>}>
            <Suspense fallback={<div>Loading archive...</div>}>
              <SuspenseQuery {...archiveQueryOptions.featured(supabase)}>
                {({ data: featuredArchives }) => (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-8 pb-16">
                    {featuredArchives.map((item) => (
                      <ArchiveCard 
                        item={item} 
                        key={item.slug} 
                      />
                    ))}
                  </div>
                )}
              </SuspenseQuery>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      
      <Link
        to={routeConfig.ARCHIVES.href}
        className="uppercase md:hidden underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
      >
        See All Archives
      </Link>
    </section>
  );
}

import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseInfiniteQuery } from "@suspensive/react-query";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import FilmCard from "~/components/film/film-card";
import { Button } from "~/components/ui/button";
import { createBrowserClient } from "~/config/supabase-config";
import { SkeletonLoading } from "~/config/suspense-config";
import { filmQueryOptions } from "~/service/film";

export const handle = {
  navTargetSectionId: "film-section",
  navOffset: 0,
};

export default function FilmIndexRoute() {
  const supabase = createBrowserClient();

  return (
    <main className="w-full min-h-dvh flex flex-col items-center max-w-[1920px] mx-auto">
      <h1 className="pt-36 uppercase text-[64px] font-medium w-full px-5 mb-5">
        The film
      </h1>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallback={<div>Error</div>}>
            <Suspense fallback={<SkeletonLoading />}>
              <SuspenseInfiniteQuery
                {...filmQueryOptions.list(supabase, { page: 1 })}
              >
                {({ data, fetchNextPage, hasNextPage, isFetchingNextPage }) => (
                  <>
                    <section
                      id={handle.navTargetSectionId}
                      className="px-5 pb-10 **:tracking-tighter"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-3">
                        {data.map((item) => (
                          <FilmCard key={item.slug} item={item} />
                        ))}
                      </div>
                    </section>
                    <div className="pb-10">
                      <Button
                        variant={"secondary"}
                        className="text-sm font-light"
                        size={"sm"}
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage || !hasNextPage}
                      >
                        {isFetchingNextPage
                          ? "Loading..."
                          : hasNextPage
                            ? "Load More"
                            : "No More"}
                      </Button>
                    </div>
                  </>
                )}
              </SuspenseInfiniteQuery>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}

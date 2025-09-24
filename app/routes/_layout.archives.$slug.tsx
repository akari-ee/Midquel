import { Link, useParams } from "react-router";
import ArchiveCard from "~/components/archives/archive-card";
import { routeConfig } from "~/config/route-config";
import { createBrowserClient } from "~/config/supabase-config";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { SuspenseQuery } from "@suspensive/react-query";
import { archiveQueryOptions } from "~/service/archive";

export const handle = {
  navTargetSectionId: "hero-section",
  navOffset: -200,
};

export default function ArchiveDetailRoute() {
  const { slug } = useParams();
  const supabase = createBrowserClient();

  return (
    <main className="w-full min-h-dvh flex flex-col items-center max-w-[1920px] mx-auto **:tracking-tighter">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallback={<div>Error loading archive</div>}
          >
            <Suspense>
              <SuspenseQuery {...archiveQueryOptions.detail(supabase, slug!)}>
                {({
                  data: {
                    title,
                    tagline,
                    thumbnail_image,
                    location,
                    year,
                    info,
                    tag,
                    images,
                  },
                }) => (
                  <>
                    <section
                      id="hero-section"
                      className="pt-40 px-5 flex flex-col gap-4 w-full items-center h-fit"
                    >
                      <header className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end">
                        <h1 className="uppercase font-medium text-5xl lg:text-[56px] xl:text-7xl leading-tight">
                          {title}
                        </h1>
                        <p className="text-[#a6a6a6] text-balance font-medium text-lg">
                          {tagline}
                        </p>
                      </header>
                      <div className="w-full">
                        <img
                          src={thumbnail_image}
                          alt={title}
                          className="w-full h-full min-h-full object-contain object-center aspect-video"
                        />
                      </div>
                    </section>
                    <section
                      id="detail-section"
                      className="flex flex-col py-20 px-5 gap-10 lg:flex-row w-full"
                    >
                      <div className="lg:basis-1/2 flex flex-col gap-8">
                        <div>
                          <p className="uppercase text-[#a6a6a6]">Tag</p>
                          <p className="font-medium capitalize">{tag}</p>
                        </div>
                        <div>
                          <p className="uppercase text-[#a6a6a6]">Location</p>
                          <p className="font-medium">{location}</p>
                        </div>
                        <div>
                          <p className="uppercase text-[#a6a6a6]">Year</p>
                          <p className="font-medium">{year}</p>
                        </div>
                      </div>
                      <div className="lg:basis-1/2">
                        <p className="uppercase text-[#a6a6a6]">Info</p>
                        <p className="font-medium max-w-md">{info}</p>
                      </div>
                    </section>
                    <section
                      id="gallery-section"
                      className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 px-5"
                    >
                      {images.slice(0, 3).map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </section>
                  </>
                )}
              </SuspenseQuery>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <section
        id="more-section"
        className="pt-40 pb-20 px-5 w-full flex flex-col gap-5"
      >
        <div className="uppercase flex items-end justify-between">
          <p className="text-[32px] lg:text-[40px] font-medium leading-7">
            More Archives
          </p>
          <Link
            to={routeConfig.ARCHIVES.href}
            className="hidden lg:block underline underline-offset-4 hover:text-muted-foreground transition-colors duration-300 text-sm"
          >
            See all archives
          </Link>
        </div>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallback={<div>Error loading more archives</div>}
            >
              <Suspense fallback={<div>Loading more archives...</div>}>
                <SuspenseQuery
                  {...archiveQueryOptions.latestExcluding(supabase, {
                    excludeSlug: slug!,
                    limit: 3,
                  })}
                >
                  {({ data: moreArchives }) => (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 pb-15">
                      {moreArchives.map((item) => (
                        <ArchiveCard key={item.slug} item={item} hoverable />
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
          className="uppercase block lg:hidden underline underline-offset-4 hover:text-muted-foreground transition-colors duration-300 text-sm"
        >
          See all archives
        </Link>
      </section>
    </main>
  );
}

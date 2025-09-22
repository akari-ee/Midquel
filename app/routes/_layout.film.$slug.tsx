import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { routeConfig } from "~/config/route-config";

import { ErrorBoundary, Suspense } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { SuspenseQuery } from "@suspensive/react-query";
import { filmQueryOptions } from "~/service/film";
import { createBrowserClient } from "~/config/supabase-config";
import { handle } from "./_layout.film._index";
import { SkeletonLoading } from "~/config/suspense-config";

export default function FilmDetailRoute() {
  const { slug } = useParams();
  const supabase = createBrowserClient();

  return (
    <main className="w-full min-h-dvh flex flex-col items-center justify-center max-w-[1920px] mx-auto">
      <div className="flex flex-col gap-16 w-full items-center pt-36 pb-8">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallback={<div>Error</div>}>
              <Suspense fallback={<SkeletonLoading />}>
                <SuspenseQuery {...filmQueryOptions.detail(supabase, slug!)}>
                  {({ data: currentFilm }) => (
                    <section
                      id={handle.navTargetSectionId}
                      className="flex flex-col gap-16 w-full items-center"
                    >
                      <div className="w-full h-fit max-w-3xl">
                        {currentFilm.image && (
                          <img
                            src={currentFilm.image}
                            alt={currentFilm.title}
                            className="w-full h-fit object-contain object-center"
                          />
                        )}
                        {currentFilm.video && (
                          <video
                            src={currentFilm.video}
                            preload="auto"
                            className="cursor-auto w-full h-fit block object-cover bg-transparent object-center"
                            autoPlay
                            muted
                            playsInline
                            loop
                          />
                        )}
                      </div>
                      <div className="w-5/6 flex flex-col gap-4 max-w-full">
                        <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium font-dokdo">
                          {currentFilm.title}
                        </h1>
                        <div className="flex flex-col gap-2.5">
                          <div className="flex flex-col gap-2.5 md:grid md:grid-cols-3">
                            <div className="flex flex-col">
                              <p className="text-[#a6a6a6]">Camera</p>
                              <p className="font-medium">
                                {currentFilm.camera}
                              </p>
                            </div>
                            <div className="flex flex-col md:col-span-2">
                              <p className="text-[#a6a6a6]">Lens</p>
                              <p className="font-medium">{currentFilm.lens}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2.5 md:grid md:grid-cols-3">
                            <div className="flex flex-col">
                              <p className="text-[#a6a6a6]">Speed</p>
                              <p className="font-medium">{currentFilm.speed}</p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[#a6a6a6]">Aperature</p>
                              <p className="font-medium">
                                {currentFilm.aperature}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[#a6a6a6]">ISO</p>
                              <p className="font-medium">{currentFilm.iso}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2.5 md:grid md:grid-cols-3">
                            <div className="flex flex-col">
                              <p className="text-[#a6a6a6]">Location</p>
                              <p className="font-medium">
                                {currentFilm.location}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[#a6a6a6]">Date</p>
                              <p className="font-medium">{currentFilm.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </SuspenseQuery>
                <SuspenseQuery
                  {...filmQueryOptions.navigation(supabase, slug!)}
                >
                  {({ data: navigation }) => (
                    <div className="w-5/6 flex items-center justify-between text-2xl font-medium md:text-3xl xl:text-4xl tracking-tighter font-dokdo">
                      <aside>
                        {navigation.prev && (
                          <Link
                            to={routeConfig.FILM.detail(navigation.prev.slug!)}
                            className="flex items-center hover-text-muted-foreground"
                          >
                            <ChevronLeftIcon />
                            {navigation.prev.title}
                          </Link>
                        )}
                      </aside>
                      <aside>
                        {navigation.next && (
                          <Link
                            to={routeConfig.FILM.detail(navigation.next.slug!)}
                            className="flex items-center hover-text-muted-foreground"
                          >
                            {navigation.next.title}
                            <ChevronRightIcon />
                          </Link>
                        )}
                      </aside>
                    </div>
                  )}
                </SuspenseQuery>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </main>
  );
}

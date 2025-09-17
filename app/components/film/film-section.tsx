import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import FilmCard from "./film-card";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { SuspenseQuery } from "@suspensive/react-query";
import { filmQueryOptions } from "~/service/film";
import { createBrowserClient } from "~/config/supabase-config";

export default function FilmSection() {
  const supabase = createBrowserClient();

  return (
    <section className="w-full h-fit flex flex-col gap-5 pt-10">
      <div className="flex justify-between items-end uppercase w-full py-1">
        <h2 className="text-3xl lg:text-[40px] font-medium tracking-tighter">
          Film
        </h2>
        <Link
          to={routeConfig.FILM.href}
          className="hidden md:block underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
        >
          See all films
        </Link>
      </div>
      
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallback={<div>Error loading films</div>}>
            <Suspense fallback={<div>Loading film...</div>}>
              <SuspenseQuery {...filmQueryOptions.featured(supabase)}>
                {({ data: featuredFilms }) => (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-3">
                    {featuredFilms.map((item) => (
                      <FilmCard 
                        item={item} 
                        key={item.slug} 
                        isFixedHeight 
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
        to={routeConfig.FILM.href}
        className="uppercase md:hidden underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
      >
        See all films
      </Link>
    </section>
  );
}

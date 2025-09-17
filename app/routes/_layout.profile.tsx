import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Link } from "react-router";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { profileQueryOptions } from "~/service/profile";
import { createBrowserClient } from "~/config/supabase-config";

export const handle = {
  navTargetSectionId: "profile-section",
  navOffset: -200,
};

export default function ProfileRoute() {
  const supabase = createBrowserClient();

  return (
    <main className="w-full h-fit max-w-[1920px] mx-auto">
      <section
        id={handle.navTargetSectionId}
        className="h-fit flex flex-col justify-center gap-10 px-5 pt-40 pb-10 lg:flex-row lg:gap-0 lg:justify-between w-full lg:h-dvh"
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallback={<div>Error</div>}>
              <Suspense fallback={<div>Loading</div>}>
                <SuspenseQuery {...profileQueryOptions.info(supabase)}>
                  {({ data }) => (
                    <>
                      <div className="flex flex-col gap-6 basis-2/3">
                        <h1 className="text-[40px] font-medium uppercase tracking-tighter md:text-[56px]">
                          Profile
                        </h1>
                        <div className="flex flex-col gap-6 xl:flex-row xl:gap-16">
                          <div className="flex flex-col gap-2 basis-1/2">
                            <h2 className="flex gap-2.5">
                              <span className="font-medium">{data.name}.</span>
                              <span className="text-[#a6a6a6]">
                                {data.role}
                              </span>
                            </h2>
                            <p className="font-medium max-w-sm leading-tight">
                              {data.info}
                            </p>
                          </div>
                          <div className="flex flex-col gap-10">
                            <div>
                              <h3 className="uppercase text-[#a6a6a6]">
                                Email & Phone
                              </h3>
                              <div className="font-medium">
                                <Link
                                  to={`mailto:${data.email}`}
                                  className="hover-text-muted-foreground"
                                >
                                  {data.email}
                                </Link>
                                <p className="hover-text-muted-foreground">
                                  {data.phone}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h3 className="uppercase text-[#a6a6a6]">
                                Socials
                              </h3>
                              <div className="flex flex-col font-medium">
                                {data.social_links.map(({ href, label }) => (
                                  <Link
                                    key={label}
                                    to={href}
                                    className="hover-text-muted-foreground"
                                  >
                                    {label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative lg:w-xs lg:h-[40%] xl:w-1/4 xl:h-[70%]">
                        <img
                          src={data.image!}
                          alt={data.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </SuspenseQuery>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </section>
    </main>
  );
}

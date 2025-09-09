import { appConfig } from "~/config/app-config";
import BlurScaleOnScroll from "~/components/animation/blur-scale-on-scroll";
import type { Route } from "./+types/_layout._index";
import FilmSection from "~/components/film/film-section";
import ArchivesSection from "~/components/archives/archives-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="w-full min-h-dvh">
      {/* Fixed Hero - 뒤 레이어 */}
      <section className="fixed inset-0 w-full h-dvh z-0">
        <img
          src={appConfig.bannerImage}
          alt="banner"
          className="w-full h-full object-cover brightness-75"
        />

        {/* Divider Decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-5 left-0 w-full h-[0.5px] bg-[#7c7c7c]/70" />
          <div className="absolute top-0 left-5 w-[0.5px] h-full bg-[#7c7c7c]/70" />
          <div className="absolute bottom-5 left-0 w-full h-[0.5px] bg-[#7c7c7c]/70" />
          <div className="absolute bottom-0 right-5 w-[0.5px] h-full bg-[#7c7c7c]/70" />
        </div>

        {/* Title + Description */}
        <BlurScaleOnScroll
          className="absolute bottom-0 left-0 w-full h-full pb-20 pl-10 lg:pl-20 flex flex-col gap-5 justify-end"
          blurSpeed={0.1}
        >
          <h1 className="text-6xl font-medium lg:text-9xl lg:font-normal tracking-tighter">
            {appConfig.serviceName}
          </h1>
          <p className="px-0 lg:px-2">{appConfig.serviceDescription}</p>
        </BlurScaleOnScroll>
      </section>

      {/* Archives + Film 컨테이너 - 앞 레이어, Hero를 덮으며 올라옴 */}
      <div className="relative z-10 flex flex-col w-full items-center bg-background mt-[100dvh] px-5 pt-10 pb-20">
        {/* Archives Section */}
        <ArchivesSection />

        {/* Film Section */}
        <FilmSection />
      </div>
    </main>
  );
}

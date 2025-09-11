import { Link, useParams } from "react-router";
import ArchiveCard from "~/components/archives/archive-card";
import { mockConfig } from "~/config/mock-config";
import { routeConfig } from "~/config/route-config";

export const handle = {
  navTargetSectionId: "hero-section",
  navOffset: -200,
};

export default function ArchiveDetailRoute() {
  const { slug } = useParams();
  const item = mockConfig.archivesData.find((film) => film.Slug === slug)!;
  const nextItem = mockConfig.archivesData.slice(2, 5);

  return (
    <main className="w-full min-h-dvh flex flex-col items-center max-w-[1920px] mx-auto **:tracking-tighter">
      <section
        id="hero-section"
        className="pt-40 px-5 flex flex-col gap-4 w-full items-center h-fit"
      >
        <header className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end">
          <h1 className="uppercase font-medium text-[40px] lg:text-[56px] xl:text-[64px] leading-tight">
            {item.Title}
          </h1>
          <p className="text-[#a6a6a6] text-balance font-medium">
            {item.Tagline}
          </p>
        </header>
        <div className="h-80 md:h-full w-full">
          <img
            src={item["Featured Image (Landscape 16:9)"]}
            alt={item.Title}
            className="w-full h-full object-cover"
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
            <p className="font-medium capitalize">{item.Services}</p>
          </div>
          <div>
            <p className="uppercase text-[#a6a6a6]">Location</p>
            <p className="font-medium">{item.Location}</p>
          </div>
          <div>
            <p className="uppercase text-[#a6a6a6]">Year</p>
            <p className="font-medium">{item.Year}</p>
          </div>
        </div>
        <div className="lg:basis-1/2">
          <p className="uppercase text-[#a6a6a6]">Info</p>
          <p className="font-medium max-w-md">{item.Info}</p>
        </div>
      </section>
      <section
        id="gallery-section"
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 px-5"
      >
        <div>
          <img
            src={item["Image 1 (Portrait 4:5)"]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src={item["Image 2 (Portrait 4:5)"]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src={item["Image 3 (Landscape 4:3)"]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 pb-15">
          {nextItem.map((item) => (
            <ArchiveCard item={item} hoverable />
          ))}
        </div>
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

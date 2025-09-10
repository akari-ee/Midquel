import FilmCard from "~/components/film/film-card";
import { Button } from "~/components/ui/button";
import { mockConfig } from "~/config/mock-config";

export const handle = {
  navTargetSectionId: "film-section",
  navOffset: 0,
};

export default function FilmRoute() {
  return (
    <main className="w-full min-h-dvh flex flex-col items-center">
      <section
        id={handle.navTargetSectionId}
        className="pt-36 px-5 pb-10 **:tracking-tighter"
      >
        <div className="flex flex-col gap-5">
          <h1 className="uppercase text-[64px] font-medium">The film</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-3">
            {mockConfig.filmData.map((item) => (
              <FilmCard item={item} key={item.Slug} />
            ))}
          </div>
        </div>
      </section>
      <div>
        <Button variant={"secondary"} className="text-sm font-light" size={'sm'}>
          Load More
        </Button>
      </div>
    </main>
  );
}

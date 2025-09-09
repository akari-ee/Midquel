import { Link } from "react-router";
import { mockConfig } from "~/config/mock-config";
import { routeConfig } from "~/config/route-config";
import FilmCard from "./film-card";

export default function FilmSection() {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-3">
        {mockConfig.filmData.map((item) => (
          <FilmCard item={item} key={item.slug} />
        ))}
      </div>
      <Link
        to={routeConfig.FILM.href}
        className="uppercase md:hidden underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
      >
        See all films
      </Link>
    </section>
  );
}

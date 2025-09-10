import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { mockConfig } from "~/config/mock-config";

export default function FilmDetailRoute() {
  const { slug } = useParams();
  const item = mockConfig.filmData.find((film) => film.Slug === slug)!;

  return (
    <main className="w-full min-h-dvh flex flex-col items-center">
      <section className="pt-36 pb-8 flex flex-col gap-16 w-full items-center">
        <div className="w-full h-fit max-w-3xl">
          {item.Image && (
            <img
              src={item.Image}
              alt={item.Title}
              className="w-full h-fit object-contain object-center"
            />
          )}
        </div>
        <div className="w-5/6 flex flex-col gap-4 max-w-full">
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium">
            {item.Title}
          </h1>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5 md:grid md:grid-cols-3">
              <div className="flex flex-col">
                <p className="text-[#a6a6a6]">Camera</p>
                <p className="font-medium">{item.Camera}</p>
              </div>
              <div className="flex flex-col md:col-span-2">
                <p className="text-[#a6a6a6]">Lens</p>
                <p className="font-medium">{item.Lens}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 md:grid md:grid-cols-3">
              <div className="flex flex-col">
                <p className="text-[#a6a6a6]">Speed</p>
                <p className="font-medium">{item.Speed}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[#a6a6a6]">Aperature</p>
                <p className="font-medium">{item.Aperature}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[#a6a6a6]">ISO</p>
                <p className="font-medium">{item.ISO}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 md:grid md:grid-cols-3">
              <div className="flex flex-col">
                <p className="text-[#a6a6a6]">Location</p>
                <p className="font-medium">{item.Location}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[#a6a6a6]">Date</p>
                <p className="font-medium">{item.Date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-5/6 flex items-center justify-between text-2xl font-medium md:text-3xl xl:text-4xl tracking-tighter">
          <aside>
            <Link
              to={"#"}
              className="flex items-center hover-text-muted-foreground"
            >
              <ChevronLeftIcon />
              001
            </Link>
          </aside>
          <aside>
            <Link
              to={"#"}
              className="flex items-center hover-text-muted-foreground"
            >
              002
              <ChevronRightIcon />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

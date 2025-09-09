import { Link } from "react-router";
import { mockConfig } from "~/config/mock-config";
import { routeConfig } from "~/config/route-config";
import ArchiveCard from "./archive-card";

export default function ArchivesSection() {
  return (
    <section
      id="archives-section"
      className="w-full h-fit flex flex-col gap-5 pb-20"
    >
      <div className="flex justify-between items-end uppercase w-full py-1">
        <h2 className="text-3xl lg:text-[40px] font-medium tracking-tighter">
          Selected Archives
        </h2>
        <Link
          to={routeConfig.ARCHIVES.href}
          className="hidden md:block underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
        >
          See All Archives
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-8 pb-16">
        {mockConfig.archivesData.map((item) => (
          <ArchiveCard item={item} key={item.Slug} />
        ))}
      </div>
      <Link
        to={routeConfig.ARCHIVES.href}
        className="uppercase md:hidden underline hover:text-muted-foreground transition-colors duration-300 underline-offset-[6px] text-sm"
      >
        See All Archives
      </Link>
    </section>
  );
}

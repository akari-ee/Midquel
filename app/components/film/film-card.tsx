import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import { cn } from "~/lib/utils";
import type { Film } from "~/types/model";

interface FilmCardProps {
  item: Film;
  isFixedHeight?: boolean;
}

export default function FilmCard({ item, isFixedHeight }: FilmCardProps) {
  return (
    <Link key={item.slug} to={routeConfig.FILM.detail(item.slug!)}>
      <div
        className={cn(
          "group relative w-full flex flex-col gap-2.5",
          isFixedHeight && "h-[499px]"
        )}
      >
        {/* Image Container - 고정 높이로 브라우저 너비에 따라 이미지가 늘어남 */}
        <div className="relative w-full h-fit overflow-hidden">
          {/* Main Image - 브라우저 너비에 따라 자연스럽게 늘어나고 줄어듦 */}
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center hover:scale-[1.025] transition-transform duration-[600ms] ease-in-out"
              loading="lazy"
            />
          )}
          {item.video && (
            <video
              src={item.video}
              preload="auto"
              className="cursor-auto w-full h-fit block object-cover bg-transparent object-center"
              autoPlay
              muted
              playsInline
              loop
            />
          )}
        </div>
        <div className="font-medium">{item.title}</div>
      </div>
    </Link>
  );
}

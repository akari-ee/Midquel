import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import { cn } from "~/lib/utils";

interface FilmCardProps {
  item: any;
  isFixedHeight?: boolean;
}

export default function FilmCard({ item, isFixedHeight }: FilmCardProps) {
  return (
    <Link key={item.Slug} to={routeConfig.FILM.detail(item.Slug)}>
      <div
        className={cn(
          "group relative w-full flex flex-col gap-2.5",
          isFixedHeight && "h-[499px]"
        )}
      >
        {/* Image Container - 고정 높이로 브라우저 너비에 따라 이미지가 늘어남 */}
        <div className="relative w-full h-fit overflow-hidden">
          {/* Main Image - 브라우저 너비에 따라 자연스럽게 늘어나고 줄어듦 */}
          {item.Image && (
            <img
              src={item.Image}
              alt={item.Title}
              className="w-full h-full object-cover object-center hover:scale-[1.025] transition-transform duration-[600ms] ease-in-out"
              loading="lazy"
            />
          )}
          {item.Video && (
            <video
              src={item.Video}
              preload="auto"
              className="cursor-auto w-full h-fit block object-cover bg-transparent object-center"
              autoPlay
              muted
              playsInline
              loop
            />
          )}
        </div>
        <div className="font-medium">{item.Title}</div>
      </div>
    </Link>
  );
}

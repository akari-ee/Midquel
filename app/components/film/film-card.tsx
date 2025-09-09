import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";

interface FilmCardProps {
  item: any;
}

export default function FilmCard({ item }: FilmCardProps) {
  return (
    <Link key={item.slug} to={routeConfig.FILM.detail(item.slug)}>
      <div className="group relative w-full flex flex-col gap-2.5">
        {/* Image Container - 고정 높이로 브라우저 너비에 따라 이미지가 늘어남 */}
        <div className="relative w-full h-[499px] overflow-hidden">
          {/* Main Image - 브라우저 너비에 따라 자연스럽게 늘어나고 줄어듦 */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center hover:scale-[1.025] transition-transform duration-[600ms] ease-in-out"
            loading="lazy"
          />
        </div>
        <div className="font-medium">{item.title}</div>
      </div>
    </Link>
  );
}

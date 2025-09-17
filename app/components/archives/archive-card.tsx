import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import { ArrowUpRightIcon } from "lucide-react";
import { useInView, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Archive } from "~/types/model";

interface ArchiveCardProps {
  item: Archive;
  hoverable?: boolean;
}

export default function ArchiveCard({ item, hoverable }: ArchiveCardProps) {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const isInView = useInView(ref, {
    margin: "-50px 0px",
    amount: 0.5,
    once: true,
  }); // 화면에서 50% 이상 보여질 때 true

  // 데스크톱 기준: lg(1024px) 이상을 데스크톱으로 간주
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);
  
  // 표시 모드 결정:
  // - 데스크톱(>=1024px): hoverable이면 호버 시 표시("hover")
  // - 태블릿/모바일(<1024px): hoverable이면 항상 표시("always")
  // - 그 외: 표시 안 함("none")
  const overlayMode: "none" | "hover" | "always" = !hoverable
    ? "none"
    : isDesktop
      ? "hover"
      : "always";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link key={item.slug} to={routeConfig.ARCHIVES.detail(item.slug!)}>
        <div className="group flex flex-col gap-5 h-full relative">
          <div className="relative overflow-hidden w-full h-full">
            <img
              src={item.thumbnail_image}
              alt={item.thumbnail_image}
              className="w-full h-full object-cover hover:scale-[1.025] transition-transform duration-[600ms] ease-in-out"
            />
          </div>
          {overlayMode === "none" ? (
            <div className="flex justify-between items-end gap-1">
              <div className="flex flex-col gap-1">
                <h3 className="uppercase font-medium">{item.title}</h3>
                <p className="text-[#a6a6a6]">{item.tagline}</p>
              </div>
              <aside>
                <ArrowUpRightIcon className="stroke-1" />
              </aside>
            </div>
          ) : (
            <>
              {/* EasedGradient: Up direction, ease-in-out, start #000000 (hover only) */}
              <div
                className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-in-out ${overlayMode === "hover" ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 85%)",
                }}
              />
              <div className={`absolute top-0 left-0 h-full w-full flex flex-col justify-end p-4 gap-1 z-10 transition-opacity duration-500 ease-in-out ${overlayMode === "hover" ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                <p className="truncate uppercase font-medium">{item.title}</p>
                <p className="truncate">{item.tagline}</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

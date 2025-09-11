import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import { ArrowUpRightIcon } from "lucide-react";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

interface ArchiveCardProps {
  item: any;
  hoverable?: boolean;
}

export default function ArchiveCard({ item, hoverable }: ArchiveCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50px 0px",
    amount: 0.5,
    once: true,
  }); // 화면에서 50% 이상 보여질 때 true

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link key={item.Slug} to={routeConfig.ARCHIVES.detail(item.Slug)}>
        <div className="group flex flex-col gap-5 h-full relative">
          <div className="relative overflow-hidden w-full h-full">
            <img
              src={item["Thumbnail Image (Portrait 4:5)"]}
              alt={item["Thumbnail Image (Portrait 4:5):alt"]}
              className="w-full h-full object-cover hover:scale-[1.025] transition-transform duration-[600ms] ease-in-out"
            />
          </div>
          {!hoverable ? (
            <div className="flex justify-between items-end gap-1">
              <div className="flex flex-col gap-1">
                <h3 className="uppercase font-medium">{item.Title}</h3>
                <p className="text-[#a6a6a6]">{item.Tagline}</p>
              </div>
              <aside>
                <ArrowUpRightIcon className="stroke-1" />
              </aside>
            </div>
          ) : (
            <>
              {/* EasedGradient: Up direction, ease-in-out, start #000000 (hover only) */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 85%)",
                }}
              />
              <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-end p-4 gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <p className="truncate uppercase font-medium">{item.Title}</p>
                <p className="truncate">{item.Tagline}</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

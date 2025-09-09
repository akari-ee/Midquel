import { Link } from "react-router";
import { routeConfig } from "~/config/route-config";
import { ArrowUpRightIcon } from "lucide-react";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

interface ArchiveCardProps {
  item: any;
}

export default function ArchiveCard({ item }: ArchiveCardProps) {
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
        <div className="flex flex-col gap-5 h-full">
          <div className="relative overflow-hidden w-full h-full">
            <img
              src={item["Thumbnail Image (Portrait 4:5)"]}
              alt={item["Thumbnail Image (Portrait 4:5):alt"]}
              className="w-full h-full object-cover hover:scale-[1.025] transition-transform duration-[600ms] ease-in-out"
            />
          </div>
          <div className="flex justify-between items-end gap-1">
            <div className="flex flex-col gap-1">
              <h3 className="uppercase font-medium">{item.Title}</h3>
              <p className="text-[#a6a6a6]">{item.Tagline}</p>
            </div>
            <aside>
              <ArrowUpRightIcon className="stroke-1" />
            </aside>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

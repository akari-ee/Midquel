import { Link } from "react-router";
import { appConfig } from "~/config/app-config";
import HoverSwapLabel from "../animation/hover-swap-label";
import { cn } from "~/lib/utils";

interface FooterProps {
  initBg?: string;
}

export default function Footer({ initBg }: FooterProps) {
  return (
    <footer
      className={cn(
        "h-fit px-5 py-6 flex justify-between items-center flex-nowrap relative z-20 bg-background",
        initBg
      )}
    >
      <ul className="flex justify-start items-center gap-4 md:gap-10">
        {appConfig.footer.links.map(({ label, href }) => (
          <li key={label} className="text-sm md:text-base uppercase">
            <Link to={href}>
              <HoverSwapLabel text={label} />
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-sm md:text-base">{appConfig.footer.copyright}</p>
      </div>
    </footer>
  );
}

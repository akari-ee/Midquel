import { Link } from "react-router";
import { appConfig } from "~/config/app-config";
import HoverSwapLabel from "../animation/hover-swap-label";

export default function Footer() {
  return (
    <footer className="h-fit px-5 py-6 flex justify-between items-center flex-nowrap relative z-20 bg-background">
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

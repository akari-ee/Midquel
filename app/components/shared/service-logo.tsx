import { Link, useLocation } from "react-router";
import { appConfig } from "~/config/app-config";
import { routeConfig } from "~/config/route-config";

export default function ServiceLogo() {
  const location = useLocation();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (location.pathname === routeConfig.HOME.href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="font-semibold hover-text-muted-foreground flex-1 md:p-5">
      <Link to={routeConfig.HOME.href} onClick={handleClick}>
        {appConfig.serviceDisplayName}
      </Link>
    </div>
  );
}

import { Link } from "react-router";
import { appConfig } from "~/config/app-config";
import { routeConfig } from "~/config/route-config";

export default function ServiceLogo() {
  return (
    <div className="font-semibold hover-text-muted-foreground flex-1 md:p-5">
      <Link to={routeConfig.HOME.href}>{appConfig.serviceDisplayName}</Link>
    </div>
  );
}

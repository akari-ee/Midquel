import { Link } from "react-router";
import { appConfig } from "~/config/app-config";
import { routeConfig } from "~/config/route-config";

export default function ServiceLogo() {
  return (
    <div className="p-5 font-semibold hover-text-muted-foreground flex-1">
      <Link to={routeConfig.HOME.href}>{appConfig.serviceDisplayName}</Link>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { appConfig } from "~/config/app-config";
import { format } from "date-fns";
import { useNavbarBgOnSection } from "~/hooks/useNavbarBgOnSection";
import { routeConfig } from "~/config/route-config";
import ServiceLogo from "./service-logo";

export default function Navbar() {
  const hasBg = useNavbarBgOnSection({
    sectionId: "archives-section",
    offset: -200,
  });

  return (
    <header
      className={`h-fit px-6 py-5 fixed top-0 z-50 w-full transition-colors duration-500 ${
        hasBg ? "bg-background/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center text-[15px]">
        {/* 좌측 로고 */}
        <ServiceLogo />

        {/* 중앙 네비게이션 */}
        <ul className="flex justify-center items-center gap-6 p-5 uppercase flex-1">
          {appConfig.navItems.map(({ label, href }) => (
            <li key={href} className="hover-text-muted-foreground">
              <Link to={href} prefetch="viewport">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 우측 시간 */}
        <div className="p-5 uppercase flex items-center justify-end flex-1 gap-1">
          <p>{appConfig.location.city}</p>
          <Clock />
        </div>
      </nav>
    </header>
  );
}

function Clock() {
  const [time, setTime] = useState(format(new Date(), "HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(format(new Date(), "HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{time}</div>;
}

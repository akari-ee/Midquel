import { useEffect, useState } from "react";
import { Link, useMatches } from "react-router";
import { appConfig } from "~/config/app-config";
import { format } from "date-fns";
import { useNavbarBgOnSection } from "~/hooks/useNavbarBgOnSection";
import ServiceLogo from "./service-logo";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";

interface NavbarProps {
  initBg?: string;
}

export default function Navbar({ initBg }: NavbarProps) {
  const matches = useMatches();
  const activeHandle = (matches[matches.length - 1]?.handle ?? {}) as {
    navTargetSectionId?: string;
    navOffset?: number;
  };

  const hasBg = useNavbarBgOnSection({
    sectionId: activeHandle.navTargetSectionId ?? "archives-section",
    offset: activeHandle.navOffset ?? -200,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      id="site-header"
      className={cn(
        `overflow-hidden px-6 py-5 fixed top-0 z-50 w-full duration-500 flex flex-col md:justify-between`,
        menuOpen ? "bg-background" : hasBg ? "bg-background" : "bg-transparent",
        initBg
      )}
      initial={{ height: 96 }}
      animate={{ height: menuOpen ? "100vh" : 96 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <nav className="flex justify-between items-center text-[15px] p-5 md:p-0">
        {/* 좌측 로고 */}
        <ServiceLogo />

        {/* 중앙 네비게이션 */}
        <ul className="justify-center items-center gap-6 p-5 uppercase flex-1 md:flex hidden">
          {appConfig.navItems.map(({ label, href }) => (
            <li key={href} className="hover-text-muted-foreground">
              <Link to={href} prefetch="viewport">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 우측 시간 */}
        <div className="p-5 uppercase items-center justify-end flex-1 gap-1 hidden md:flex">
          <p>{appConfig.location.city}</p>
          <Clock />
        </div>

        {/* 모바일 메뉴 */}
        <motion.span
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-block h-fit overflow-hidden cursor-pointer select-none md:hidden"
          aria-controls="site-header"
          initial={false}
        >
          {/* MENU */}
          <motion.span
            className="block"
            animate={{ y: menuOpen ? "-100%" : "0%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            MENU
          </motion.span>

          {/* CLOSE */}
          <motion.span
            className="block -mt-[1.5em]"
            initial={{ y: "100%" }}
            animate={{ y: menuOpen ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            CLOSE
          </motion.span>
        </motion.span>
      </nav>

      {/* 모바일 메뉴바 컨텐츠 */}
      <aside className="">
        <ul className="flex flex-col gap-2 p-5 uppercase">
          {appConfig.navItems.map(({ label, href }) => (
            <li key={href} className="text-5xl font-medium">
              <Link
                to={href}
                prefetch="viewport"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-5 uppercase flex items-center justify-start gap-1">
          <p>{appConfig.location.city}</p>
          <Clock />
        </div>
      </aside>
    </motion.header>
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

import { Outlet } from "react-router";

export const handle = {
  navTargetSectionId: "film-section",
  navOffset: 0,
};

export default function FilmLayoutRoute() {
  return (
    <main className="relative w-full h-full">
      <Outlet />
    </main>
  );
}

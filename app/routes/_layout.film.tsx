import { Outlet } from "react-router";

export default function FilmLayoutRoute() {
  return (
    <main className="relative w-full h-full">
      <Outlet />
    </main>
  );
}

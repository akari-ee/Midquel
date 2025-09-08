import { Outlet } from "react-router";
import Footer from "~/components/shared/footer";
import Navbar from "~/components/shared/navbar";

export default function Layout() {
  return (
    <main className="relative w-full h-full">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white text-center py-4 shadow-inner">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} assistantSkin. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

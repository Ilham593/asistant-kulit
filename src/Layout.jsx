import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./pages/footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Layout() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-amber-50 via-white to-blue-50 animate-bg bg-fixed">
      <header className="sticky top-0 z-50 transition-all duration-300">

        <Navbar />
      </header>

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 space-y-12">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>

      <style>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-bg {
          background-size: 200% 200%;
          animation: bgMove 20s ease infinite;
        }
      `}</style>
    </div>
  );
}

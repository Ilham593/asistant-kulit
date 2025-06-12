import { useState } from "react";
import Sidebar from "./sidebar";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const navLinks = [
  { label: "Beranda", to: "/beranda" },
  { label: "Deteksi", to: "/deteksi" },
  { label: "Riwayat", to: "/riwayat" },
  { label: "Artikel", to: "/edukasi" },
  { label: "Feedback", to: "/feedback" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const mainLabel = token ? "Logout" : "Login";
  const mainTo = token ? "/logout" : "/login";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-16">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-1"
          tabIndex={0}
        >
          <span className="text-black">assistant</span>
          <span className="text-accent">Skin</span>
        </Link>

        <nav className="hidden lg:flex space-x-6">
          {location.pathname !== "/beranda" &&
            navLinks
              .filter((link) => link.label !== "Logout")
              .map((link) => (
                <Link key={link.to} to={link.to} className="hover:text-accent">
                  {link.label}
                </Link>
              ))}
          <Link to={mainTo} className="hover:text-accent">
            {mainLabel}
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 focus:outline-none"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      {open && <Sidebar onClose={() => setOpen(false)} navLinks={navLinks} />}
    </header>
  );
}

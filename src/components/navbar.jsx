import { useState } from "react";
import Sidebar from "./sidebar";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutConfirmModal from "./logout-confirm-modal";

const navLinks = [
  { label: "Beranda", to: "/beranda" },
  { label: "Deteksi", to: "/deteksi" },
  { label: "Riwayat", to: "/riwayat" },
  { label: "Artikel", to: "/edukasi" },
  { label: "Feedback", to: "/feedback" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogoutClick = (e) => {
    if (token) {
      e.preventDefault();
      setShowLogoutConfirm(true);
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/logout");
  };

  return (
    <header className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b border-blue-200 sticky top-0 z-50 shadow-md transition-all animate-fade-in">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-4 md:px-8 lg:px-12">
        <Link
          to="/"
          className="text-2xl font-extrabold flex items-center gap-1 text-blue-700 hover:text-blue-900 transition-colors duration-300"
        >
          assistant<span className="text-amber-500">Skin</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative group ${
                location.pathname === link.to
                  ? "text-amber-600 font-bold"
                  : "hover:text-blue-700"
              } transition-colors duration-300`}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          {token ? (
            <button
              onClick={handleLogoutClick}
              className="hover:text-red-600 font-semibold transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-5 py-2 rounded-lg shadow transition-transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Hamburger Mobile */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-blue-100 text-blue-600 transition"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      {open && <Sidebar onClose={() => setOpen(false)} navLinks={navLinks} />}

      {/* Logout Confirm */}
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />

      <style>{`
    .animate-fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
    </header>
  );
}

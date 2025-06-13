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
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-16">
        <Link
          to="/"
          className="text-2xl font-extrabold flex items-center gap-1 text-black"
        >
          assistant<span className="text-amber-500">Skin</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
          {location.pathname !== "/beranda" &&
            navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-amber-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          {token ? (
            <button
              onClick={handleLogoutClick}
              className="hover:text-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-md transition"
            >
              Login
            </Link>
          )}
        </nav>

        <button
          className="lg:hidden p-2 focus:outline-none hover:text-amber-500"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      {open && <Sidebar onClose={() => setOpen(false)} navLinks={navLinks} />}

      <LogoutConfirmModal
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}

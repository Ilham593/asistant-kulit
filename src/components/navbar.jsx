import { useState } from "react";
import Sidebar from "./sidebar";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
            navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-accent">
                {link.label}
              </Link>
            ))}
          {token ? (
            <button
              onClick={handleLogoutClick}
              className="hover:text-accent focus:outline-none"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-accent">
              Login
            </Link>
          )}
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

      {/* Modal Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Konfirmasi Logout
            </h2>
            <p className="mb-4 text-gray-600">
              Apakah Anda yakin ingin logout?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

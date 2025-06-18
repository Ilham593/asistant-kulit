import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutConfirmModal from "./logout-confirm-modal";

export default function Sidebar({ onClose, navLinks }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onClose();
    navigate("/logout");
  };

  return (
    <aside className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50  transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sidebar  */}
      <div
        className="relative bg-gradient-to-b from-blue-100 to-blue-50 w-72 max-w-full h-full p-6 shadow-xl animate-slide-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-blue-700">Menu</h2>
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FiX size={28} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 mb-8 text-gray-700 font-medium">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={onClose}
              className="hover:text-blue-700 hover:translate-x-1 transition-all duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Tombol Login/Logout */}
        <div className="mt-auto space-y-2">
          {token ? (
            <button
              onClick={handleLogoutClick}
              className="w-full py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="w-full block py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg text-center font-semibold shadow hover:scale-105 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Modal Confirm */}
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />

      <style>{`
      .animate-slide-in {
        animation: slideInLeft 0.4s ease-out;
      }

      @keyframes slideInLeft {
        from {
          transform: translateX(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
  `}</style>
    </aside>
  );
}

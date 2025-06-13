import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Sidebar({ onClose, navLinks }) {
  return (
    <aside
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-72 max-w-full h-full p-6 shadow-xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={onClose}
              className="text-gray-700 hover:text-amber-600 font-medium transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeInOverlay 0.3s ease-in-out;
        }
        .animate-slide-in {
          animation: slideInLeft 0.3s ease-out;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </aside>
  );
}

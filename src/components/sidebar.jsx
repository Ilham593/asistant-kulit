import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Sidebar({ onClose, navLinks }) {
  return (
    <aside className="fixed inset-0 bg-black/30 z-30" onClick={onClose}>
      <div
        className="bg-white w-64 h-full p-6"
        onClick={e=>e.stopPropagation()}
      >
        <button className="mb-8" onClick={onClose} aria-label="Close menu">
          <FiX size={24}/>
        </button>
        <nav className="flex flex-col gap-4">
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to} className="hover:text-accent" onClick={onClose}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

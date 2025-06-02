import { useState } from 'react';
import Sidebar from './sidebar';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const navLinks = [
    { label: 'Beranda', to: '/beranda' },
    { label: 'Deteksi', to: '/deteksi' },
    { label: 'Edukasi', to: '/edukasi' },
    { label: 'Asisten AI', to: '#' },
    { label: 'Logout', to: '#' },
  ];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-16">
        <Link to="/" className="text-2xl font-bold flex items-center gap-1" tabIndex={0}>
            <span className="text-black">assistant</span>
            <span className="text-accent">Skin</span>
        </Link>

        <nav className="hidden lg:flex space-x-6">
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to} className="hover:text-accent">{label}</Link>
          ))}
        </nav>

        <button
          className="lg:hidden p-2 focus:outline-none"
          aria-label="Open menu"
          onClick={()=>setOpen(true)}
        >
          <FiMenu size={24}/>
        </button>
      </div>

      {open && <Sidebar onClose={()=>setOpen(false)} navLinks={navLinks} />}
    </header>
  );
}

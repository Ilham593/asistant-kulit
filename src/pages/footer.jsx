import { Link } from "react-router-dom";
import { FiInstagram, FiMail, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/*  About */}
        <div>
          <h2 className="text-xl font-extrabold mb-4">
            assistant<span className="text-amber-400">Skin</span>
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Deteksi dini kesehatan kulit wajah dengan teknologi AI. Privasi Anda
            aman & hasil lebih praktis.
          </p>
          <p className="text-gray-400 text-xs">
            &copy; 2025 assistantSkin. All rights reserved.
          </p>
        </div>

        {/* Fitur */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-amber-400">Fitur</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/beranda" className="hover:text-amber-400 transition">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/deteksi" className="hover:text-amber-400 transition">
                Deteksi
              </Link>
            </li>
            <li>
              <Link to="/riwayat" className="hover:text-amber-400 transition">
                Riwayat
              </Link>
            </li>
            <li>
              <Link to="/edukasi" className="hover:text-amber-400 transition">
                Artikel
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:text-amber-400 transition">
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-amber-400">Kontak</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:info@assistantskin.com"
                className="flex items-center gap-2 hover:text-amber-400 transition"
              >
                <FiMail /> info@assistantskin.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition"
              >
                WhatsApp: +62 812-3456-7890
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-amber-400">
            Ikuti Kami
          </h3>
          <div className="flex gap-4 text-2xl">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition"
            >
              <FiInstagram />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition"
            >
              <FiYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        Dibangun dengan ❤️ oleh assistantSkin Team
      </div>
    </footer>
  );
}

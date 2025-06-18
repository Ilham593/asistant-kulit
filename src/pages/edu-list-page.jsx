import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const dataArtikel = [
  {
    id: "acne",
    title: "Penyebab Umum Jerawat di Wajah",
    content: "Pelajari berbagai faktor yang dapat menyebabkan timbulnya jerawat di wajah.",
    sumber: "https://www.siloamhospitals.com/informasi-siloam/artikel/kenali-penyebab-munculnya-jerawat-dan-cara-mengatasinya",
    image: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2022/01/03/731481335.png",
  },
  {
    id: "sensitif",
    title: "Tips Merawat Kulit Sensitif",
    content: "Temukan cara-cara efektif untuk merawat kulit sensitif dan mengurangi iritasi.",
    sumber: "https://harpersbazaar.co.id/articles/read/5/2025/22202/perawatan-kulit-sensitif-tips-produk-dan-cara-terbaik-2025",
    image: "https://majalahsunday.com/wp-content/uploads/2021/04/sensitive-skin-face_99326-112.webp",
  },
  {
  id: "kulit-berminyak",
  title: "Cara Merawat Kulit Wajah Berminyak",
  content: "Pelajari tips efektif mengontrol produksi minyak berlebih di wajah.",
  sumber: "https://www.alodokter.com/tips-merawat-wajah-untuk-kulit-wajah-berminyak",
  image: "https://png.pngtree.com/png-clipart/20210704/original/pngtree-oily-face-and-acne-oily-skin-concept-illustration-png-image_6487690.jpg",
},

  {
    id: "retinol",
    title: "Panduan Penggunaan Produk Retinol",
    content: "Sebelum memakai retinol, simak panduan lengkap untuk pemula ini.",
    sumber: "https://hellosehat.com/penyakit-kulit/perawatan-kulit/cara-menggunakan-skincare-retinol/",
    image: "data:image/jpeg;base64,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",
  },
];

export default function ArtikelPage() {
  const [articles] = useState(dataArtikel);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(dataArtikel);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
    } else {
      const matches = articles
        .filter((a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(matches);
    }
  }, [searchQuery, articles]);

  const applyFilter = (query) => {
    const q = query || searchQuery;
    setFilteredArticles(
      articles.filter((a) =>
        a.title.toLowerCase().includes(q.toLowerCase())
      )
    );
    setSuggestions([]);
  };

  const pickSuggestion = (title) => {
    setSearchQuery(title);
    applyFilter(title);
    inputRef.current.focus();
  };

  useEffect(() => {
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2 mb-8" data-aos="fade-up">
          <h1 className="text-4xl font-extrabold text-gray-800">Artikel Edukasi Kulit</h1>
          <p className="text-gray-600 text-base">
            Baca artikel-artikel terbaru tentang kesehatan kulit di bawah ini.
          </p>
        </div>

        {/* Search */}
        <div ref={wrapperRef} className="relative max-w-md mx-auto mb-6" data-aos="fade-up" data-aos-delay="200">
          <input
            ref={inputRef}
            type="search"
            placeholder="🔍 Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilter();
                inputRef.current.blur();
              }
            }}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white shadow focus:ring focus:outline-none pr-10 transition-all duration-200"
          />
          <button
            type="button"
            aria-label="Cari"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition"
            onClick={() => {
              applyFilter();
              inputRef.current.blur();
            }}
            tabIndex={0}
          >
            <FiSearch />
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow max-h-48 overflow-y-auto z-10">
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  onMouseDown={() => pickSuggestion(s.title)}
                  className="px-4 py-2 hover:bg-amber-100 cursor-pointer transition"
                >
                  {s.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredArticles.map((artikel, index) => (
            <div
              key={artikel.id}
              data-aos="zoom-in"
              data-aos-delay="200"
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition animate-slide-up"
            >
              <img
                src={artikel.image}
                alt={artikel.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold text-gray-800">{artikel.title}</h2>
                <p className="text-gray-600 text-sm">{artikel.content}</p>
                <a
                  href={artikel.sumber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 text-sm font-medium hover:underline"
                >
                  Baca sumber resmi →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-10" data-aos="fade-up" data-aos-delay="400">
          <p>
            Artikel ini hanya bersifat edukatif dan tidak menggantikan konsultasi dengan dokter kulit.
          </p>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

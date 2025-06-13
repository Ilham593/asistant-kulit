import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const dataArtikel = [
  {
    id: "acne",
    title: "Acne (Jerawat)",
    content: `
Acne vulgaris adalah kondisi kulit umum akibat pori tersumbat dan peradangan. Penyebabnya termasuk bakteri *C. acnes*, minyak berlebih, dan hormon. Penanganan: salicylic acid, benzoyl peroxide, atau retinoid. Hasil optimal biasanya muncul setelah 4–8 minggu penggunaan rutin.`,
    sumber: "https://www.aad.org/public/diseases/acne",
  },
  {
    id: "blackheads",
    title: "Blackheads (Komedo Terbuka)",
    content: `
Komedo terbuka adalah pori tersumbat yang tampak hitam. Tidak meradang. Penanganan: salicylic acid, benzoyl peroxide, retinoid. Tindakan profesional: ekstraksi manual, chemical peel, mikrodermabrasi.`,
    sumber: "https://www.medicalnewstoday.com/articles/blackheads",
  },
  {
    id: "dark-spots",
    title: "Dark Spots (Noda Gelap)",
    content: `
Noda gelap muncul akibat melanin berlebih. Penyebab: paparan sinar UV, bekas jerawat, melasma. Solusi: sunscreen harian, vitamin C, retinol, tranexamic acid. Prosedur tambahan: chemical peeling atau laser.`,
    sumber: "https://www.healthline.com/health/dark-spot-on-face",
  },
  {
    id: "normal-skin",
    title: "Normal Skin (Kulit Normal)",
    content: `
Kulit normal tidak terlalu berminyak/kering, pori kecil, dan jarang iritasi. Rutin perawatan dasar: cleanser lembut, pelembap, dan sunscreen SPF minimal 30.`,
    sumber: "https://www.cedars-sinai.org/blog/skin-types.html",
  },
  {
    id: "oily-skin",
    title: "Oily Skin (Kulit Berminyak)",
    content: `
Kulit berminyak menghasilkan sebum berlebih, menyebabkan kilap dan pori besar. Tips: pembersih ringan, pelembap oil-free, sunscreen non-comedogenic, hindari produk berat.`,
    sumber: "https://www.clevelandclinic.org/health/diseases/22208-oily-skin",
  },
  {
    id: "wrinkles",
    title: "Wrinkles (Keriput)",
    content: `
Keriput terjadi karena penuaan, UV, ekspresi wajah, atau merokok. Pencegahan: sunscreen harian, retinoid, pelembap. Bisa ditangani dengan botox, filler, atau laser.`,
    sumber:
      "https://www.mayoclinic.org/diseases-conditions/wrinkles/symptoms-causes/syc-20354927",
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 px-4 py-10 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">📚 Artikel Edukasi Kulit</h1>
          <p className="text-gray-600 text-sm">
            Temukan informasi berdasarkan hasil deteksi kulit Anda.
          </p>
        </div>

				<div ref={wrapperRef} className="relative max-w-md mx-auto">
					<input
						ref={inputRef}
						type="search"
						placeholder="🔍 Cari artikel kulit..."
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

        <div className="space-y-6">
          {filteredArticles.map((artikel, i) => (
            <div
              key={artikel.id}
              className="bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-xl animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <h2 className="text-xl font-bold text-amber-600 mb-2">{artikel.title}</h2>
              <p className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
                {artikel.content}
              </p>
              <a
                href={artikel.sumber}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 mt-2 hover:underline text-sm"
              >
                Baca sumber resmi →
              </a>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-10">
          <p>
            Artikel ini hanya bersifat edukatif dan tidak menggantikan konsultasi dengan dokter kulit.
          </p>
          <Link to="/" className="text-blue-600 underline mt-4 block hover:text-blue-700 transition">
            ← Kembali ke Beranda
          </Link>
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

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HomePresenter from "../presenters/home-presenter";
import MapHandler from "../utils/map-handler";
import {
  FiCamera,
  FiClock,
  FiFileText,
  FiBookOpen,
  FiThumbsUp,
} from "react-icons/fi";

const iconMap = {
  camera: FiCamera,
  history: FiClock,
  book: FiFileText,
  quiz: FiBookOpen,
  feedback: FiThumbsUp,
};

export default function HomePage() {
  const presenter = new HomePresenter();
  const cards = presenter.getCards();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapRef.current._leaflet_id) return;
    const map = new MapHandler(mapRef.current);
    map.initMap();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-12 px-4 animate-fade-in">
      <div className="mx-auto max-w-screen-xl space-y-16">
        <section className="flex flex-col-reverse md:flex-row-reverse items-center gap-12 px-4 md:px-10 py-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-6 leading-tight">
              Deteksi Penyakit Kulit <br className="hidden md:inline" /> Mudah &
              Cepat
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              AssistantSkin membantu Anda mengenali masalah kulit sejak dini
              dengan teknologi AI hanya melalui foto. Aman, cepat, dan bisa
              digunakan dari rumah!
            </p>
            <Link
              to="/deteksi"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1"
            >
              Mulai Deteksi Sekarang
            </Link>
          </div>

          <div className="md:w-1/2">
            <img
              src="/img/hero.png"
              alt="Ilustrasi Deteksi Kulit"
              className="w-full max-w-md mx-auto rounded-3xl shadow-xl"
            />
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Apa itu AssistantSkin?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            AssistantSkin adalah platform berbasis kecerdasan buatan (AI) yang
            membantu mendeteksi potensi penyakit kulit melalui foto. Aplikasi
            ini juga menyediakan edukasi kesehatan, pencarian lokasi apotek/RS,
            dan riwayat deteksi.
          </p>
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Cara Menggunakan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: FiCamera,
                title: "1. Unggah Foto",
                desc: "Ambil atau unggah foto area kulit yang ingin diperiksa.",
              },
              {
                icon: FiFileText,
                title: "2. Analisa AI",
                desc: "Klik 'Mulai Deteksi' untuk memulai analisa otomatis.",
              },
              {
                icon: FiBookOpen,
                title: "3. Lihat Hasil",
                desc: "Dapatkan hasil deteksi awal dan rekomendasi tindakan.",
              },
              {
                icon: FiThumbsUp,
                title: "4. Cari Lokasi",
                desc: "Gunakan peta untuk menemukan apotek atau RS terdekat.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="bg-white p-4 rounded-full mb-4 shadow">
                  <Icon size={32} className="text-amber-500" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
            Kenapa Memilih <span className="text-amber-500">AssistantSkin</span>
            ?
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-gray-700">
            {[
              {
                icon: "⚡",
                title: "Cepat & Praktis",
                desc: "Hanya butuh beberapa detik untuk hasil diagnosis awal.",
              },
              {
                icon: "📱",
                title: "Akses Mudah",
                desc: "Bisa digunakan di mana saja hanya dengan smartphone.",
              },
              {
                icon: "🔒",
                title: "Privasi Terjamin",
                desc: "Foto Anda hanya digunakan untuk analisa, tanpa disimpan.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center"
              >
                <div className="text-amber-500 mb-4 text-4xl">{icon}</div>
                <h3 className="font-semibold text-xl mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid px-4 md:px-8 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map(({ title, subtitle, icon, color, path }) => {
            const IconComp = iconMap[icon];
            return (
              <Link to={path || "#"} key={title} tabIndex={-1}>
                <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 animate-card text-center">
                  <IconComp size={36} className="mb-4 text-amber-500 mx-auto" />
                  <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                  <p className="text-sm text-gray-600">{subtitle}</p>
                </article>
              </Link>
            );
          })}
        </section>

        <section className="mt-12 px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Peta Lokasi Apotek & RS Terdekat
          </h2>
          <div
            ref={mapRef}
            className="w-full h-96 rounded-xl overflow-hidden shadow-inner bg-gray-300 z-0"
          />
        </section>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        .animate-card {
          animation: cardIn 0.5s ease-out both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
    `}</style>
    </div>
  );
}

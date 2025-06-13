import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-[#fefaf6] px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Artikel Edukasi Kulit</h1>
          <p className="text-gray-600">
            Informasi perawatan kulit berdasarkan hasil deteksi Anda.
          </p>
        </div>

        {dataArtikel.map((artikel) => (
          <div
            key={artikel.id}
            className="bg-white shadow p-6 rounded-xl space-y-3"
          >
            <h2 className="text-xl font-semibold text-accent">
              {artikel.title}
            </h2>
            <p className="text-gray-800 whitespace-pre-line">
              {artikel.content}
            </p>
            <a
              href={artikel.sumber}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline text-sm"
            >
              Baca sumber resmi →
            </a>
          </div>
        ))}

        <div className="text-center text-sm text-gray-500 mt-10">
          <p>
            Artikel ini hanya bersifat edukatif dan tidak menggantikan
            konsultasi dengan dokter kulit.
          </p>
          <Link to="/" className="text-blue-600 underline mt-4 block">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

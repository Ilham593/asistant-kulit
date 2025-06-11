import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';
import HistoryDetailPresenter from '../presenters/history-detail-presenter';

export default function HistoryDetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const presenter = new HistoryDetailPresenter();

  useEffect(() => {
    presenter.fetchDetail(id).then(setDetail);
  }, [id]);

  if (!detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat detail...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefaf6] py-8 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow p-6 md:p-10 space-y-6">
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <FiCalendar />
          {new Date(detail.date).toLocaleDateString()}
        </div>
        <h1 className="text-2xl font-bold">{detail.disease}</h1>
        <img
          src={detail.imageUrl}
          alt={detail.disease}
          className="w-full h-auto rounded-lg object-cover"
        />
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-gray-950 rounded-lg italic">
          <strong>Disclaimer:</strong> Hasil deteksi ini hanya sebagai referensi awal. assistantSkin membantu memahami kondisi kulit Anda dan bukan
          pengganti dokter. Untuk diagnosis dan penanganan yang tepat, konsultasikan dengan dokter spesialis kulit.
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Tingkat Akurasi</h2>
            <p>{(detail.confidence * 100).toFixed(1)}%</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Rekomendasi Penanganan</h2>
            <p className="text-gray-700">{detail.recommendation}</p>
          </div>
        </div>
        <Link
          to="/riwayat"
          className="inline-flex items-center text-accent font-medium hover:underline"
        >
          <FiArrowLeft className="mr-1" /> Kembali ke Riwayat
        </Link>
      </div>
    </div>
  );
}

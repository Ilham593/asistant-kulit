import { useState } from "react";
import { useSelector } from "react-redux";
import DetectPresenter from "../presenters/detect-presenter";
import { CameraHandler } from "../utils/camera-handler";
import { FiCamera, FiUpload, FiVideo, FiVideoOff } from "react-icons/fi";
import { simpanRiwayat } from "../api/riwayatApi";


export default function DetectPage() {
  const presenter = new DetectPresenter();
  const user = useSelector((state) => state.auth.user);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const {
    videoRef,
    canvasRef,
    streamActive,
    error,
    toggleCamera,
    capturePhoto,
    devices,
    selectedDevice,
    setSelectedDevice,
  } = CameraHandler(setPreview);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (streamActive) toggleCamera(false);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!preview) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = preview;

    img.onload = async () => {
      const res = await presenter.detect(img);
      setResult(res);

      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        try {
          await simpanRiwayat(userId, res);
          console.log("✅ Riwayat berhasil disimpan.");
        } catch (err) {
          console.error("Gagal simpan riwayat:", err.message || err);
        }
      } else {
        console.warn("User belum login. Riwayat tidak disimpan.");
      }
    };

    img.onerror = () => {
      console.error("Gagal memuat gambar untuk deteksi.");
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-10 px-4 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 text-center">
        <FiCamera className="text-amber-500" size={32} />
        <span>Deteksi Penyakit Kulit</span>
      </h1>

      <section className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4 mb-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-gray-800 p-4 rounded">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Deteksi hanya untuk area wajah.</li>
            <li>Pastikan pencahayaan foto jelas dan terang untuk hasil akurat.</li>
          </ul>
        </div>

        <div className="relative h-64 sm:h-[500px] border-2 border-dashed border-amber-400 rounded-xl overflow-hidden flex items-center justify-center bg-white transition-all duration-300">
          {error && (
            <div className="absolute top-2 left-2 right-2 p-3 bg-red-100 text-red-700 rounded shadow text-sm z-10">
              {error}
            </div>
          )}
          <video
            ref={videoRef}
            className={`w-full h-full object-contain rounded-lg ${streamActive ? '' : 'hidden'} transition-all duration-300`}
            autoPlay muted playsInline
          />
          {!streamActive && preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg transition-all duration-300"
            />
          )}
          {!streamActive && !preview && (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 px-4 text-center">
              <FiCamera size={48} className="mb-2" />
              <span className="text-base md:text-lg font-medium">Belum ada foto</span>
              <span className="text-xs md:text-sm mt-1 text-gray-300">
                Silakan ambil atau upload foto untuk mulai deteksi
              </span>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Kontrol Kamera & Upload */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {streamActive && devices.length > 1 && (
            <select
              value={selectedDevice || ""}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full sm:w-auto focus:outline-none focus:ring focus:ring-amber-400"
            >
              {devices.map((device, idx) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Kamera ${idx + 1}`}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={toggleCamera}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg shadow hover:scale-105 transition"
          >
            {streamActive ? <FiVideoOff /> : <FiVideo />}
            {streamActive ? "Tutup Kamera" : "Buka Kamera"}
          </button>
          <button
            onClick={capturePhoto}
            disabled={!streamActive}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg shadow hover:scale-105 transition disabled:opacity-50"
          >
            <FiCamera /> Ambil Foto
          </button>
          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg shadow cursor-pointer hover:scale-105 transition">
            <FiUpload /> Upload Foto
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        </div>
      </section>

      {/* Tombol Deteksi */}
      <div className="my-6 flex justify-center">
        <button
          onClick={handleDetect}
          disabled={!preview}
          className="px-8 py-3 bg-amber-600 rounded-lg text-white font-semibold shadow hover:scale-105 transition disabled:opacity-50"
        >
          Mulai Deteksi
        </button>
      </div>

      {result && (
        <section className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold">Hasil Deteksi Penyakit Kulit</h2>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-gray-800 rounded">
            <strong>Disclaimer:</strong> Hasil ini hanya sebagai referensi awal.
            Untuk diagnosis, konsultasikan dengan dokter spesialis kulit.
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Prediksi Penyakit</h3>
            <p className="text-xl text-red-600 font-bold">
              {result.disease} ({(result.confidence * 100).toFixed(2)}%)
            </p>
          </div>

          {result.recommendations?.length > 0 && (
            <div className="p-4 border rounded-xl bg-[#fefaf6] mt-6">
              <h3 className="font-semibold mb-5 text-gray-800">Rekomendasi Produk</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {result.recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row bg-white border-l-4 border-accent rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 sm:bg-transparent">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-48 sm:h-24 object-cover object-center rounded-t-xl sm:rounded-t-none sm:rounded-l-xl transition"
                        style={{ background: "#f3f4f6" }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-amber-600 mb-1">{item.brand}</p>
                        <p className="text-gray-700 text-sm font-semibold mb-2">{item.name}</p>
                        <p className="text-green-600 text-sm font-bold mb-2">{item.price}</p>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener"
                        className="mt-2 inline-block text-amber-600 text-sm font-medium hover:underline"
                      >
                        Lihat Produk →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

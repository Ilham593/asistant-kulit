import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DetectPresenter from "../presenters/detect-presenter";
import { CameraHandler } from "../utils/camera-handler";
import { FiCamera, FiUpload, FiVideo, FiVideoOff } from "react-icons/fi";
import { simpanRiwayat } from "../api/riwayatApi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DetectPage() {
  const presenter = new DetectPresenter();
  const user = useSelector((state) => state.auth.user);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loadingDetect, setLoadingDetect] = useState(false);

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

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (streamActive) toggleCamera(false);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!preview) return;
    setLoadingDetect(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = preview;

    img.onload = async () => {
      try {
        const res = await presenter.detect(img);
        setResult(res);

        if (user && (user._id || user.id)) {
          const userId = user._id || user.id;
          await simpanRiwayat(userId, res);
          console.log("✅ Riwayat berhasil disimpan.");
        } else {
          console.warn("User belum login. Riwayat tidak disimpan.");
        }
      } catch (err) {
        console.error("Gagal melakukan deteksi:", err.message || err);
      } finally {
        setLoadingDetect(false);
      }
    };

    img.onerror = () => {
      console.error("Gagal memuat gambar untuk deteksi.");
      setLoadingDetect(false);
    };
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 animate-fade-in">
      {/* Title */}
      <h1
        className="text-3xl font-extrabold text-center text-gray-800 mb-8"
        data-aos="fade-up"
      >
        Deteksi Penyakit Kulit
      </h1>

      {/* Section Upload  */}
      <section
        className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6 mb-8"
        data-aos="zoom-in"
      >
        {/* Preview  */}
        <div className="flex flex-col items-center justify-center border border-blue-200 rounded-xl p-6 bg-blue-50">
          <div className="relative w-auto h-80 md:w-72 md:h-96 rounded-xl border-4 border-blue-200 overflow-hidden flex items-center justify-center bg-white">
            {error && (
              <div className="absolute p-3 bg-red-100 text-red-700 rounded shadow text-sm z-10">
                {error}
              </div>
            )}
            <video
              ref={videoRef}
              className={`object-cover w-full h-full ${
                streamActive ? "" : "hidden"
              } transition-all duration-300`}
              autoPlay
              muted
              playsInline
            />
            {!streamActive && preview && (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full transition-all duration-300"
              />
            )}
            {!streamActive && !preview && (
              <div className="text-gray-400 text-center px-4">
                <FiCamera size={48} className="mb-2 mx-auto" />
                <p className="text-base font-medium">Belum ada foto</p>
                <p className="text-sm text-gray-300">
                  Silakan ambil atau upload foto untuk mulai deteksi
                </p>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Tips: Pastikan wajah terkena cahaya cukup, tidak ada makeup tebal.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
          data-aos="fade-up"
        >
          <button
            onClick={toggleCamera}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 transition font-semibold"
          >
            {streamActive ? <FiVideoOff /> : <FiVideo />}
            {streamActive ? "Tutup Kamera" : "Aktifkan Kamera"}
          </button>

          <button
            onClick={capturePhoto}
            disabled={!streamActive}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition font-semibold disabled:opacity-50"
          >
            <FiCamera /> Ambil Foto
          </button>

          <label className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow cursor-pointer transition font-semibold">
            <FiUpload /> Upload Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        </div>

        {/* Detect Button */}
        <div
          className="mt-8 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <button
            onClick={handleDetect}
            disabled={!preview || loadingDetect}
            className="w-full sm:w-auto px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loadingDetect && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loadingDetect ? "Memproses..." : "Mulai Deteksi"}
          </button>
        </div>
      </section>

      {/* hasil Section */}
      {result && (
        <section
          className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6 mb-8 animate-fade-in"
          data-aos="fade-up"
        >
          <h2 className="text-xl font-bold">Hasil Deteksi Penyakit Kulit</h2>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-gray-800 rounded">
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
              <h3 className="font-semibold mb-5 text-gray-800">
                Rekomendasi Produk
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {result.recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row bg-white border-l-4 border-blue-300 rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden"
                    data-aos="zoom-in"
                    data-aos-delay={`${index * 100}`}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 sm:bg-transparent">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-48 sm:h-24 object-cover object-center rounded-t-xl sm:rounded-t-none sm:rounded-l-xl transition"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-blue-600 mb-1">
                          {item.brand}
                        </p>
                        <p className="text-gray-700 text-sm font-semibold mb-2">
                          {item.name}
                        </p>
                        <p className="text-green-600 text-sm font-bold mb-2">
                          {item.price}
                        </p>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener"
                        className="mt-2 inline-block text-blue-500 text-sm font-medium hover:underline"
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

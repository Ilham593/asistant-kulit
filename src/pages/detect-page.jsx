import { useState } from 'react';
import DetectPresenter from '../presenters/detect-presenter';
import { CameraHandler } from '../utils/camera-handler';
import { FiCamera, FiUpload, FiVideo, FiVideoOff } from 'react-icons/fi';

export default function DetectPage() {
  const presenter = new DetectPresenter();
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const { videoRef, canvasRef, streamActive, error, toggleCamera, capturePhoto, devices, selectedDevice, setSelectedDevice } = CameraHandler(setPreview);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (streamActive) toggleCamera(false);
    setPreview(URL.createObjectURL(file));
  };

  const handleDetect = async () => {
    if (!preview) return;
    const img = new Image();
    img.src = preview;
    img.onload = async () => {
      const res = await presenter.detect(img);
      setResult(res);
    };
  };

  return (
    <>
    <div className="min-h-screen bg-[#fefaf6] py-8 px-4">
      <h1 className="p-4 md:p-8 text-2xl font-semibold flex items-center justify-center gap-2">
        <FiCamera size={28} /> Deteksi Penyakit Kulit
      </h1>

      <section className="container mx-auto max-w-3xl p-4 md:p-8 border rounded-lg space-y-4">
        <div className="text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <ul className="pl-2 space-y-3">
            <li>Deteksi hanya bisa dilakukan di area wajah</li>
            <li>Pastikan foto yang diupload terang dan jelas untuk hasil deteksi yang akurat.</li>
          </ul>
        </div>

        <div className="relative h-[500px] border-2 border-accent border-dashed rounded-lg p-2 overflow-hidden flex items-center justify-center">
          {error && (
            <div className="absolute top-2 left-2 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <video
            ref={videoRef}
            className={`w-full h-full object-contain rounded-lg ${streamActive ? '' : 'hidden'}`}
            autoPlay
            muted
            playsInline
          />
          {!streamActive && preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          )}
          {!streamActive && !preview && (
            <p className="text-gray-400">Belum ada foto</p>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {streamActive && devices.length > 1 && (
            <select
              value={selectedDevice || ''}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accent"
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>
          )}
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90"
            onClick={toggleCamera}
          >
            {streamActive ? <FiVideoOff /> : <FiVideo />}
            {streamActive ? 'Tutup Kamera' : 'Buka Kamera'}
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary rounded-lg hover:opacity-90 disabled:opacity-50"
            onClick={capturePhoto}
            disabled={!streamActive}
          >
            <FiCamera /> Ambil Foto
          </button>
          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary rounded-lg cursor-pointer hover:opacity-90">
            <FiUpload /> Upload Foto
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>
      </section>

      <div className="my-6 flex justify-center px-4 md:px-8">
        <button
          className="px-8 py-3 bg-accent rounded-lg text-white font-medium hover:opacity-90"
          onClick={handleDetect}
          disabled={!preview}
        >
          Mulai Deteksi
        </button>
      </div>

      {result && (
        <section className="my-6 container mx-auto max-w-3xl p-6 bg-white rounded-lg shadow space-y-6"
          aria-labelledby="result-heading">
            
          <h2 className="text-xl font-semibold mb-4">
            Hasil Deteksi Penyakit Kulit
          </h2>

          {/* Disclaimer */}
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-gray-950 rounded-lg italic">
            <strong>Disclaimer:</strong> Hasil deteksi ini hanya sebagai referensi awal. assistantSkin membantu memahami kondisi kulit Anda dan bukan pengganti Dokter. Untuk diagnosis dan penanganan yang tepat, konsultasikan dengan dokter spesialis kulit.
          </div>

          {/* Data dari Model ML */}
          <div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Prediksi Penyakit</h3>
              <p className="text-xl text-red-600">
                {result.disease} ({(result.confidence*100).toFixed(2)}%)
              </p>
            </div>

            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-semibold mb-5">Rekomendasi Produk</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.recommendations.map((item) => (
                  <div key={item.id} className="flex border rounded-lg overflow-hidden space-y-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                    <div className="p-2 flex-1">
                      <p className="font-medium">{item.brand}</p>
                      <p className="text-gray-700 text-sm">{item.name}</p>
                      <p className="text-green-600 text-sm">{item.price}</p>
                      <a href={item.link} target="_blank" rel="noopener" className="text-accent text-sm hover:underline">
                        Lihat Produk →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
}
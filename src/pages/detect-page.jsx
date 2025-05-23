import { useState } from 'react';
import DetectPresenter from '../presenters/detect-presenter';
import { CameraHandler } from '../utils/camera-handler';
import { FiCamera, FiUpload, FiVideo, FiVideoOff } from 'react-icons/fi';

export default function DetectPage() {
  const presenter = new DetectPresenter();
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const { videoRef, canvasRef, streamActive, error, toggleCamera, capturePhoto } = CameraHandler(setPreview);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleDetect = async () => {
    if (!preview) return;
    const res = await presenter.detect(preview);
    setResult(res);
  };

  return (
    <>
      <h1 className="p-4 md:p-8 text-2xl font-semibold flex items-center justify-center gap-2">
        <FiCamera size={28} /> Deteksi Penyakit Kulit
      </h1>

      <section className="container mx-auto max-w-7xl p-4 md:p-8 border rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 h-[500px] border-2 border-accent border-dashed rounded-lg p-2 overflow-hidden">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded mb-2">
                {error}
              </div>
            )}
            <video
              ref={videoRef}
              className={`w-full h-full object-contain rounded-lg ${
                streamActive ? '' : 'hidden'
              }`}
              autoPlay
              muted
              playsInline
            />
            {!streamActive && !preview && (
              <p className="h-full flex items-center justify-center text-gray-400">
                Kamera belum aktif
              </p>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="flex-1 h-[500px] border-2 border-accent border-dashed rounded-lg overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain max-h-full max-w-full"
              />
            ) : (
              <p className="h-full flex items-center justify-center text-gray-400">
                Belum ada foto
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap sm:flex-nowrap gap-4 justify-center">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded hover:opacity-90"
            onClick={toggleCamera}
          >
            {streamActive ? <FiVideoOff /> : <FiVideo />}
            {streamActive ? 'Tutup Kamera' : 'Buka Kamera'}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded hover:opacity-90"
            onClick={capturePhoto}
            disabled={!streamActive}
          >
            <FiCamera /> Ambil Foto
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-primary rounded cursor-pointer hover:opacity-90">
            <FiUpload /> Upload Foto
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>
      </section>

      <div className="mt-6 flex justify-center px-4 md:px-8">
        <button
          className="px-8 py-3 bg-accent rounded-lg text-white font-medium hover:opacity-90"
          onClick={handleDetect}
          disabled={!preview}
        >
          Proses Deteksi
        </button>
      </div>

      {result && (
        <section className="mt-6 p-4 md:p-8 bg-white rounded shadow">
          <h2 className="font-semibold">Hasil Deteksi:</h2>
          <p>Penyakit: {result.disease}</p>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
        </section>
      )}
    </>
  );
}
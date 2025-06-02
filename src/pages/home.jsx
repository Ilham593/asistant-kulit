import React from "react";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/bg-home.png')" }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="flex justify-between items-center px-6 py-4 text-white">
          <h1 className="text-xl font-semibold">assistantSkin</h1>
          <a href="#" className="text-sm hover:underline">
            Login
          </a>
        </nav>

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="bg-white/20 p-8 md:p-12 rounded-lg max-w-2xl w-full text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              Deteksi Kondisi Kulit Anda
            </h2>
            <p className="mb-6 text-base md:text-lg text-gray-700">
              Aplikasi untuk membantu mendeteksi penyakit kulit secara cepat dan akurat.
            </p>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition">
              Login
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Disclaimer: Hasil deteksi bukan merupakan diagnosis medis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

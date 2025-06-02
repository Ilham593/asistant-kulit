import React from "react";
import { Link } from "react-router-dom";

const LogoutPage = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf6] flex items-center justify-center px-4">
      <div className="bg-[#f4eafc] rounded-3xl p-8 max-w-md w-full text-center shadow-md">
        <img
          src=""
          alt="ops"
          className="w-40 h-auto mx-auto mb-6"
        />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Anda telah logout.
        </h1>
        <p className="text-lg text-gray-700 mb-6">Sampai jumpa kembali!</p>

        <Link
          to="/"
          className="inline-block bg-[#b97d67] text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-[#a66f5b] transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default LogoutPage;

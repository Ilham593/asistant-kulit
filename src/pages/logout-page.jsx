import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/autsSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    const timer = setTimeout(() => {
      navigate("/beranda");
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-lg animate-slide-up">
        <div className="text-5xl mb-4">👋</div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Anda telah logout.
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Terima kasih telah menggunakan <span className="text-blue-600 font-bold">assistantSkin</span>.
        </p>

        <Link
          to="/beranda"
          className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition"
        >
          ⬅ Kembali ke Beranda
        </Link>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LogoutPage;

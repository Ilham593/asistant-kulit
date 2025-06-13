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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-lg animate-slide-up">
        <div className="text-5xl mb-4">👋</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Anda telah logout.
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih telah menggunakan assistantSkin.
        </p>

        <Link
          to="/"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition"
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/autsSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/beranda");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/beranda");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 to-yellow-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden animate-fade-in">
        <div className="md:w-1/2 p-10 bg-gradient-to-br from-amber-400 to-yellow-300 text-white flex flex-col justify-center items-center">
          <div className="text-6xl mb-4 animate-bounce">🧴</div>
          <h2 className="text-3xl font-extrabold">Welcome Back!</h2>
          <p className="text-center mt-2 text-sm opacity-90">
            Login untuk melanjutkan ke dashboard Anda.
          </p>
        </div>

        <div className="md:w-1/2 p-8 flex items-center justify-center bg-white">
          <form className="w-full max-w-sm animate-slide-in" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Log in to assistantSkin</h3>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                placeholder="your_username"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-amber-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.6s ease-in-out forwards;
          }

          .animate-slide-in {
            animation: slideIn 0.6s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../features/auth/autsSlice";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
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
    const data = {
      username: formData.username,
      password: formData.password,
    };
    const res = await dispatch(register(data));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login"); 
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefaf6] px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
            <span className="text-lg font-bold text-gray-900">
              assistantSkin
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
          <p className="text-gray-600">
            Create your account to start using assistantSkin.
          </p>
        </div>

        <div className="md:w-1/2 bg-white p-8 flex items-center justify-center">
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Sign Up
            </h3>

            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="your_username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 text-white py-2 rounded-md hover:bg-amber-500 transition"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-black font-medium hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

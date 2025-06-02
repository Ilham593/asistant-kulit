import React from "react";

const LoginPage = () => {
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in</h2>
          <p className="text-gray-600">
            Enter your credentials to access your account.
          </p>
        </div>

        <div className="md:w-1/2 bg-white p-8 flex items-center justify-center">
          <form className="w-full max-w-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Log in
            </h3>
            <div className="mb-4">
              <label
                className="block text-sm text-gray-600 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="your_username"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm text-gray-600 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-400 text-white py-2 rounded-md hover:bg-amber-500 transition"
            >
              Log in
            </button>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-black font-medium hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

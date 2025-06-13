export default function LogoutConfirmModal({ open, onCancel, onConfirm }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-slide-up">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Konfirmasi Logout
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Anda yakin ingin keluar dari akun?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFeedbackList, postFeedback } from "../api/feedbackApi";

export default function FeedbackPage() {
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const data = await getFeedbackList();
      setFeedbackList(data);
    } catch (err) {
      console.error("❌ Gagal ambil feedback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Anda harus login untuk memberi komentar.");
    if (!comment.trim()) return;

    try {
      await postFeedback(comment, user.nama_lengkap || user.username);
      setComment("");
      fetchFeedback();
    } catch (err) {
      console.error("❌ Gagal kirim feedback:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-10 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        💬 Feedback & Komentar
      </h1>

      {user ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mb-10 animate-slide-up"
        >
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis komentar Anda..."
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none transition"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition font-medium shadow"
            >
              Kirim Komentar
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center mb-10 animate-slide-up">
          <div className="bg-white border border-yellow-300 rounded-xl px-6 py-4 shadow text-center flex items-center gap-2">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Silakan{" "}
              <a
                href="/login"
                className="text-amber-600 hover:underline transition"
              >
                login
              </a>{" "}
              untuk memberi komentar.
            </span>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">🔄 Memuat komentar...</p>
        ) : feedbackList.length === 0 ? (
          <p className="text-center text-gray-500">📭 Belum ada komentar.</p>
        ) : (
          feedbackList.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition animate-slide-up"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-800">{item.user || "Pengguna"}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString("id-ID")}
                </p>
              </div>
              <p className="text-gray-700">{item.komentar}</p>
            </div>
          ))
        )}
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

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
    <div className="min-h-screen bg-[#fefaf6] p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Feedback & Komentar</h1>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 max-w-xl mx-auto">
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis komentar Anda di sini..."
          className="w-full min-h-[120px] border border-gray-400 rounded-lg p-3 resize-none focus:outline-none focus:ring focus:border-accent"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-2 bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500"
          >
            Kirim Komentar
          </button>
        </div>
      </form>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="bg-white border border-yellow-300 rounded-lg px-6 py-4 shadow text-center flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span className="text-gray-700 font-medium mb">
              Silakan <a href="/login" className="text-accent hover:text-accent/80">Login</a> untuk memberi komentar.
            </span>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {loading ? (
          <p className="text-center">Memuat komentar...</p>
        ) : feedbackList.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada komentar.</p>
        ) : (
          feedbackList.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow border text-gray-800"
            >
              <p className="font-semibold">{item.user || "Pengguna"}</p>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(item.createdAt).toLocaleString("id-ID")}
              </p>
              <p>{item.komentar}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

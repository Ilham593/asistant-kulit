import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFeedbackList, postFeedback } from "../api/feedbackApi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const emojiRatings = [
  { label: "😞", value: 1 },
  { label: "😐", value: 2 },
  { label: "🙂", value: 3 },
  { label: "😊", value: 4 },
  { label: "😄", value: 5 },
];

const badWords = [
  "anjing", "kontol", "bangsat", "babi", "tai", "tolol", "idiot", "memek", "goblok", "kampret",
  "pantek", "ngentot", "sialan", "asu", "bego", "anjrit", "setan", "brengsek", "bucin", "bocah", "bocil", "anjir"
];

const censorBadWords = (text) => {
  let result = text;
  badWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, "****");
  });
  return result;
};

export default function FeedbackPage() {
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false,
    });
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
    if (!comment.trim()) return alert("Komentar tidak boleh kosong.");
    if (!rating) return alert("Silakan pilih rating.");

    const cleanComment = censorBadWords(comment);

    try {
      await postFeedback(
        `Rating: ${rating} | ${cleanComment}`,
        user.nama_lengkap || user.username
      );
      setComment("");
      setRating(0);
      fetchFeedback();
    } catch (err) {
      console.error("❌ Gagal kirim feedback:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 px-4 py-10 animate-fade-in">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2" data-aos="fade-up">
          <h1 className="text-4xl font-extrabold text-gray-800">Feedback</h1>
          <p className="text-gray-600 text-lg">
            Please provide your feedback below.
          </p>
        </div>

        {user ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3 text-center">
                How satisfied are you with the app?
              </label>
              <div className="flex justify-center gap-4 text-4xl">
                {emojiRatings.map((emoji) => (
                  <button
                    key={emoji.value}
                    type="button"
                    onClick={() => setRating(emoji.value)}
                    className={`transition transform hover:scale-110 ${
                      rating === emoji.value ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {emoji.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block font-semibold text-gray-800 mb-2"
              >
                Comments
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar Anda..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-lg font-semibold shadow transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white border border-blue-200 rounded-xl px-6 py-4 shadow text-center flex items-center gap-2">
              <span className="text-gray-700 font-medium">
                Silakan{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline transition"
                >
                  login
                </a>{" "}
                untuk memberi feedback.
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">
              🔄 Memuat feedback...
            </p>
          ) : feedbackList.length === 0 ? (
            <p className="text-center text-gray-500">📭 Belum ada feedback.</p>
          ) : (
            feedbackList.map((item, index) => (
              <div
                key={item._id}
                className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-800">
                    {item.user || "Pengguna"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
                <p className="text-gray-700 whitespace-pre-line">
                  {item.komentar}
                </p>
              </div>
            ))
          )}
        </div>
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

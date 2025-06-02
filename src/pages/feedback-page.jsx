import { useState } from 'react';
import FeedbackPresenter from '../presenters/feedback-presenter';
import { FiEdit2 } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar, AiOutlineCheckCircle } from 'react-icons/ai';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);

  const presenter = new FeedbackPresenter({
    onSubmitSuccess: () => {
      setShowPopup(true);
      setSubmitting(false);
      setRating(0);
      setComment('');
      setEmail('');
      setMessage(null);
    },
    onSubmitError: () => {
      setMessage({ type: 'error', text: 'Gagal mengirim feedback. Coba lagi.' });
      setSubmitting(false);
    },
  });

  const handleStarClick = (index) => {
    if (rating === index) {
      setRating(0);
    } else {
      setRating(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Silakan pilih rating (1–5)!' });
      return;
    }
    setSubmitting(true);
    await presenter.submitFeedback(rating, comment, email);
  };

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4 md:px-8 my-14">
        {!showPopup && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
              <FiEdit2 size={28} className="mr-2 text-gray-700" />
              <h1 className="text-2xl font-semibold">Beri Feedback</h1>
            </div>

            {message && (
              <div
                className={`mb-4 px-4 py-3 rounded ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-800 font-medium mb-2">
                  Rating Anda
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleStarClick(i)}
                      className="text-3xl focus:outline-none"
                    >
                      {i <= rating ? (
                        <AiFillStar className="text-yellow-400" />
                      ) : (
                        <AiOutlineStar className="text-gray-300 hover:text-gray-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                  Email (opsional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-accent"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-800 font-medium mb-2">
                  Komentar / Kritik / Saran
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tuliskan komentar Anda..."
                  className="w-full min-h-[120px] border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-secondaryAccent text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? 'Mengirim...' : 'Kirim'}
              </button>
            </form>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
              <AiOutlineCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
              <h2 className="text-xl font-semibold mb-2">Feedback Berhasil Dikirim</h2>
              <a
                href="/beranda"
                className="text-accent font-medium hover:underline"
              >
                Kembali Ke Beranda
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

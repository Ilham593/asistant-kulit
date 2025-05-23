import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EduDetailPresenter from '../presenters/edu-detail-presenter';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';

export default function EduDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const presenter = new EduDetailPresenter();

  useEffect(() => {
    presenter.getArticleById(id).then(setArticle);
  }, [id]);

  if (!article) return null;

  return (
    <div className="min-h-screen bg-primary py-8 px-4">
      <div className="container mx-auto max-w-5xl p-4 md:p-8 bg-white rounded-lg shadow">
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FiCalendar className="mr-1"/> {new Date(article.date).toLocaleDateString()}
        </div>
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto rounded-lg mb-6 object-cover"
        />
        <div className="prose prose-md max-w-none mb-6">
          {article.content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link
          to="/edukasi"
          className="inline-flex items-center text-accent font-medium hover:underline"
        >
          <FiArrowLeft className="mr-1"/> Kembali ke Artikel Edukasi
        </Link>
      </div>
    </div>
  );
}

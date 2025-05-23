import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EduListPresenter from '../presenters/edu-list-presenter';
import { FiCalendar, FiBookOpen, FiArrowRight } from 'react-icons/fi';

export default function EduListPage() {
  const [articles, setArticles] = useState([]);
  const presenter = new EduListPresenter();

  useEffect(() => {
    presenter.getArticles().then(setArticles);
  }, []);

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 justify-center">
        <FiBookOpen size={28} /> Artikel Edukasi
      </h1>

      <input
        type="search"
        placeholder="Cari Artikel"
        className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring focus:outline-none"
      />

      <div className="space-y-4">
        {articles.map(({ id, title, date, excerpt, imageUrl }) => (
          <Link key={id} to={`/edukasi/${id}`}>
            <article className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4 hover:shadow-md transition min-h-[160px]">
              <div className="sm:w-1/3 w-full h-40 sm:h-auto flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:ml-6 mt-4 sm:mt-0 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <FiCalendar className="mr-1"/> {new Date(date).toLocaleDateString()}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{title}</h2>
                  <p className="text-gray-700">{excerpt}</p>
                </div>
                <div className="text-orange-500 font-medium flex items-center mt-4">
                  Baca Selengkapnya <FiArrowRight className="ml-1"/>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

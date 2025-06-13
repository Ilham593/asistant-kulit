import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HomePresenter from '../presenters/home-presenter';
import MapHandler from '../utils/map-handler';
import {
  FiCamera, FiClock, FiFileText, FiBookOpen, FiThumbsUp
} from 'react-icons/fi';

const iconMap = {
  camera: FiCamera,
  history: FiClock,
  book: FiFileText,
  quiz: FiBookOpen,
  feedback: FiThumbsUp,
};

export default function HomePage() {
  const presenter = new HomePresenter();
  const cards = presenter.getCards();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapRef.current._leaflet_id) return;
    const map = new MapHandler(mapRef.current);
    map.initMap();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-10 px-4 animate-fade-in">
      <div className="mx-auto max-w-screen-xl space-y-10">

        <section className="grid px-4 md:px-8 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map(({ title, subtitle, icon, color, path }) => {
            const IconComp = iconMap[icon];
            const bg = color === 'white' ? 'bg-white' : `bg-${color}`;

            return (
              <Link to={path || '#'} key={title} tabIndex={-1}>
                <article
                  className={`${bg} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-[1.03] bg-white animate-card`}
                  role="button"
                >
                  <IconComp size={36} className="mb-4 text-amber-500" />
                  <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                  <p className="text-sm text-gray-600">{subtitle}</p>
                </article>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Peta Lokasi Apotek & RS Terdekat</h2>
          <div
            ref={mapRef}
            className="w-full h-96 rounded-xl overflow-hidden shadow-inner bg-gray-300 z-0"
          />
        </section>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        .animate-card {
          animation: cardIn 0.5s ease-out both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

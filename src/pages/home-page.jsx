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
    <>
      <section className="container mx-auto p-4 md:p-8 grid gap-4
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map(({ title, subtitle, icon, color, path }) => {
          const IconComp = iconMap[icon];
          const bg = color==='white'? 'bg-white' : `bg-${color}`;
          return (
            <Link to={path || '#'} key={title} tabIndex={-1}>
                <article
                key={title}
                className={`${bg} rounded-lg p-6 shadow hover:shadow-md transition`}
                role="button"
                >
                <IconComp size={32} className="mb-4 text-gray-700"/>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-600">{subtitle}</p>
                </article>
            </Link>
          );
        })}
      </section>

      <section className="container mx-auto mt-8 p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4">
          Peta Lokasi Apotek & RS Terdekat
        </h2>
        <div ref={mapRef} className="w-full h-96 bg-gray-200 rounded overflow-hidden"></div>
      </section>
    </>
  );
}

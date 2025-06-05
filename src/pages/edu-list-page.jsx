import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import EduListPresenter from '../presenters/edu-list-presenter';
import { FiCalendar, FiBookOpen, FiArrowRight, FiSearch } from 'react-icons/fi';

export default function EduListPage() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const presenter = new EduListPresenter();

  useEffect(() => {
    presenter.getArticles().then((data) => {
      setArticles(data);
      setFilteredArticles(data);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      setSuggestionIndex(-1);
    } else {
      const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
      const matches = sorted.filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);

      setSuggestions(matches);
      setSuggestionIndex(-1);
    }
  }, [searchQuery, articles]);

  const handleSearchClick = () => {
    const filtered = articles.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
    setSuggestions([]);
    setSuggestionIndex(-1);
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    const filtered = articles.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredArticles(filtered);
    setSuggestions([]);
    setSuggestionIndex(-1);
    inputRef.current.focus();
  };

  const handleInputKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestionIndex >= 0 && suggestionIndex < suggestions.length) {
        const title = suggestions[suggestionIndex].title;
        handleSuggestionClick(title);
      } else {
        handleSearchClick();
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSuggestionIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setSuggestions([]);
        setSuggestionIndex(-1);
      }
    };
    const handleScroll = () => {
      setSuggestions([]);
      setSuggestionIndex(-1);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto max-w-6xl p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 justify-center">
        <FiBookOpen size={28} /> Artikel Edukasi
      </h1>

      <div ref={wrapperRef} className="relative w-full sm:max-w-md flex items-center">
        <input
          ref={inputRef}
          type="search"
          placeholder="Cari Artikel"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none pr-10 sm:pr-4"
        />
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:hidden" />
        <button
          onClick={handleSearchClick}
          className="hidden sm:flex items-center justify-center ml-2 px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90"
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto z-10">
            {suggestions.map((item, idx) => (
              <li
                key={item.id}
                onMouseDown={() => handleSuggestionClick(item.title)}
                className={`px-4 py-2 text-sm cursor-pointer ${
                  idx === suggestionIndex
                    ? 'bg-accent text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        {filteredArticles.map(({ id, title, date, excerpt, imageUrl}) => (
          <Link key={id} to={`/edukasi/${id}`}>
            <article className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-8 hover:shadow-md transition min-h-[200px] mb-6">
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
    </div>
    
  );
}

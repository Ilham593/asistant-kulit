import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/home-page';
import DetectPage from './pages/detect-page';
import EduListPage from './pages/edu-list-page';
import EduDetailPage from './pages/edu-detail-page';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white text-center py-4 shadow-inner">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} assistantSkin. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="deteksi" element={<DetectPage />} />
          <Route path="/edukasi" element={<EduListPage />} />
          <Route path="/edukasi/:id" element={<EduDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

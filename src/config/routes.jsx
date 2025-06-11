import Layout from "../Layout";
import HomePage from "../pages/home-page";
import DetectPage from "../pages/detect-page";
import EduListPage from "../pages/edu-list-page";
import EduDetailPage from "../pages/edu-detail-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import LogoutPage from "../pages/logout-page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import FeedbackPage from "../pages/feedback-page";
import { useSelector } from "react-redux";
import HistoryPage from "../pages/history-page";
import HistoryDetailPage from "../pages/history-detail-page";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "beranda", element: <HomePage /> },
      { path: "riwayat", element: <HistoryPage /> },
      { path: "riwayat/:id", element: <HistoryDetailPage /> },
      { path: "deteksi", element: <DetectPage /> },
      { path: "edukasi", element: <EduListPage /> },
      { path: "edukasi/:id", element: <EduDetailPage /> },
      { path: "feedback", element: <FeedbackPage /> },
    ],
  },
]);

export default router;
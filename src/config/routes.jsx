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
import HistoryPage from "../pages/history-page";
import HistoryDetailPage from "../pages/history-detail-page";

const router = createBrowserRouter([
  {
    path: "/login",
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
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="beranda" replace /> },
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
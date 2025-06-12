import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import HomePage from '../pages/home-page';
import DetectPage from '../pages/detect-page';
import EduListPage from '../pages/edu-list-page';
import EduDetailPage from '../pages/edu-detail-page';
import LoginPage from '../pages/login-page';
import RegisterPage from '../pages/register-page';
import LogoutPage from '../pages/logout-page';
import FeedbackPage from '../pages/feedback-page';
import HistoryPage from '../pages/history-page';
import HistoryDetailPage from '../pages/history-detail-page';
import PrivateRoute from './PrivateRoute';

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
      {
        path: "beranda",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "riwayat",
        element: (
          <PrivateRoute>
            <HistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "riwayat/:id",
        element: (
          <PrivateRoute>
            <HistoryDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: "deteksi",
        element: (
          <PrivateRoute>
            <DetectPage />
          </PrivateRoute>
        ),
      },
      {
        path: "edukasi",
        element: (
          <PrivateRoute>
            <EduListPage />
          </PrivateRoute>
        ),
      },
      {
        path: "edukasi/:id",
        element: (
          <PrivateRoute>
            <EduDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <PrivateRoute>
            <FeedbackPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

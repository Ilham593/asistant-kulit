import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../pages/home-page";
import DetectPage from "../pages/detect-page";
import EduDetailPage from "../pages/edu-detail-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import LogoutPage from "../pages/logout-page";
import FeedbackPage from "../pages/feedback-page";
import PrivateRoute from "./PrivateRoute";
import RiwayatPage from "../pages/riwayat-page";
import ArtikelPage from "../pages/edu-list-page";
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
            <RiwayatPage />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "riwayat/:id",
      //   element: (
      //     <PrivateRoute>
      //       <HistoryDetailPage />
      //     </PrivateRoute>
      //   ),
      // },
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
            <ArtikelPage />
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

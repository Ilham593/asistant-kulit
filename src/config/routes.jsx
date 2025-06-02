import Layout from "../Layout";
import HomePage from "../pages/home-page";
import DetectPage from "../pages/detect-page";
import EduListPage from "../pages/edu-list-page";
import EduDetailPage from "../pages/edu-detail-page";
import Home from "../pages/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "beranda", element: <HomePage /> },
      { path: "deteksi", element: <DetectPage /> },
      { path: "edukasi", element: <EduListPage /> },
      { path: "edukasi/:id", element: <EduDetailPage /> },
    ],
  },
]);

export default router;

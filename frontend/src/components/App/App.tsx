import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const GardenPage = lazy(() => import("../../pages/GardenPage/GardenPage"));

const AdminLoginPage = lazy(() => import("../../pages/admin/AdminLoginPage"));
const AdminHomePage = lazy(() => import("../../pages/admin/AdminHomePage"));
const AdminArchivesPage = lazy(
  () => import("../../pages/admin/AdminArchivesPage")
);
const AdminGalleryPage = lazy(
  () => import("../../pages/admin/AdminGalleryPage")
);
const AdminCategoryPage = lazy(
  () => import("../../pages/admin/AdminCategoryPage")
);

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/garden" element={<GardenPage />} />
            {/* Додай тут інші основні сторінки */}
          </Route>

          {/* Admin panel */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminHomePage />}>
            <Route path="archives" element={<AdminArchivesPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="categories" element={<AdminCategoryPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

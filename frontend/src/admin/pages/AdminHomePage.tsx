import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminLoggedIn") || "{}");
    const oneDay = 24 * 60 * 60 * 1000;

    if (!adminData.loggedIn || Date.now() - adminData.timestamp > oneDay) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      {/* Бічна панель */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
          Адмін панель
        </h1>
        <Link to="archives" className="p-4 hover:bg-gray-700">
          Архіви
        </Link>
        <Link to="gallery" className="p-4 hover:bg-gray-700">
          Галерея
        </Link>
      </nav>

      {/* Контент */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
}

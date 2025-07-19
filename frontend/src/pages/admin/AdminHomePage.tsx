import { Outlet, Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminHomePage() {
  useAdminAuth();

  return (
    <div className="flex h-screen">
      {/* Бічна панель */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
          Адмін панель
        </h1>
        <Link to="archives" className="p-4 hover:bg-gray-700">
          Архіви
        </Link>
        <Link to="gallery" className="p-4 hover:bg-gray-700">
          Галерея
        </Link>
        <Link to="categories" className="p-4 hover:bg-gray-700">
          Категорії
        </Link>
      </nav>

      {/* Контент */}
      <div className="flex-1 bg-gray-100 p-6 ml-64">
        <Outlet />
      </div>
    </div>
  );
}

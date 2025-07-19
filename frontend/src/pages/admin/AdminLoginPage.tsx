import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import apiClient from "../../services/apiClient";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Перевірка пароля через запит на бекенд
    await apiClient
      .post(
        "/admin/login",
        {},
        {
          headers: { "x-admin-password": password },
        }
      )
      .then(() => {
        localStorage.setItem(
          "adminPassword",
          JSON.stringify({ password, timestamp: Date.now() })
        );
        toast.success("Успішний вхід!");
        navigate("../admin");
      })
      .catch((error) => {
        toast.error("Неправильний пароль! " + error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">
          Вхід для адміністратора
        </h1>
        <input
          type="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Увійти
        </button>
      </div>
    </div>
  );
}

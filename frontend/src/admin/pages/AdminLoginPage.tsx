import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminPassword = "123456"; // Замініть на реальний пароль із бекенду

    if (password === adminPassword) {
      localStorage.setItem(
        "adminLoggedIn",
        JSON.stringify({ loggedIn: true, timestamp: Date.now() })
      );
      toast.success("Успішний вхід!");
      navigate("/admin");
    } else {
      toast.error("Неправильний пароль!");
    }
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

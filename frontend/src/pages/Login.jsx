import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      login(res.data.employee, res.data.token);

      toast.success("Welcome " + res.data.employee.name);

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white w-96 rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Employee Login
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border rounded p-3 mb-4"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded p-3 mb-6"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}
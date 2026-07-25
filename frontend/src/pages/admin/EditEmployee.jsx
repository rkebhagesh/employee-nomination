import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import Navbar from "../../components/layout/Navbar";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee",
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await api.get(`/employees/${id}`);

      setForm(res.data);
    } catch (err) {
      toast.error("Employee not found");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/employees/${id}`, form);

      toast.success("Employee updated successfully");

      navigate("/admin");
    } catch (err) {
      toast.error("Unable to update employee");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="employee">
              Employee
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Update Employee
          </button>

        </form>

      </div>
    </>
  );
}
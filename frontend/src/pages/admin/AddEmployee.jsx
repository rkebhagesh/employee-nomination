import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import Navbar from "../../components/layout/Navbar";

export default function AddEmployee() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/employees", form);

      toast.success("Employee added successfully");

      navigate("/admin");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to add employee."
      );

    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          >
            <option value="employee">
              Employee
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Save Employee
          </button>

        </form>

      </div>
    </>
  );
}
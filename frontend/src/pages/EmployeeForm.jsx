import { useState } from "react";
import axios from "axios";
import api from "../services/api";

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/employees", employee);

      alert(res.data.message);
 
      setEmployee({
        name: "",
        email: "",
        department: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
    >
      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={employee.name}
        onChange={handleChange}
        className="w-full border p-2 mb-3" required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
        className="w-full border p-2 mb-3" required
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
        className="w-full border p-2 mb-3" required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Employee
      </button>
    </form>
  );
}

export default EmployeeForm;
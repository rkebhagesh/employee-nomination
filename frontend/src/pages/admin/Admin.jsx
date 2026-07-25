import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/layout/Navbar";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

export default function Admin() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        loadEmployees();

    }, []);

    const loadEmployees = async () => {

        const res = await api.get("/employees");

        setEmployees(res.data);

    };

    const deleteEmployee = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/employees/${id}`);

    toast.success("Employee deleted successfully");

    loadEmployees();

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Unable to delete employee."
    );

  }

};

    return (

        <div className="p-8">


           <div className="flex justify-between mb-5">

  <h1 className="text-3xl font-bold">

    Employee Management

  </h1>

  <Link
    to="/admin/add"
    className="bg-blue-600 text-white px-5 py-2 rounded"
  >
    Add Employee
  </Link>

</div>

            <Navbar />

            <table className="w-full border">

                <thead className="bg-gray-100 text-left">

                    <tr className="bg-gray-200">

                        <th className="p-3">Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Role</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {employees.map(emp => (

                        <tr key={emp.id}>

                            <td className="p-3">

                                {emp.name}

                            </td>

                            <td>{emp.email}</td>

                            <td>{emp.department}</td>

                            <td>{emp.role}</td>

                           <td className="space-x-2">

  <Link
    to={`/admin/edit/${emp.id}`}
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    Edit
  </Link>

  <button
    onClick={() => deleteEmployee(emp.id)}
    className="bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}
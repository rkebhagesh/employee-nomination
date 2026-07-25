import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function Nominate() {
  const { employee } = useAuth();

 const [employees, setEmployees] = useState([]);

 const [form, setForm] = useState({
   nominee_id: "",
   reason: ""
 });

 useEffect(() => {
   loadEmployees();
 }, []);

 const loadEmployees = async () => {
   const res = await api.get("/employees");

   setEmployees(res.data);
 };

const submitNomination = async (e) => {
  e.preventDefault();

  try {
    const monthYear = new Date()
      .toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      .replace(" ", "-");

    const check = await axios.get(
      "/nominations/check",
      {
        params: {
          nominated_by: employee.id,
          nominee_id: form.nominee_id,
          month_year: monthYear,
        },
      }
    );

    if (check.data.exists) {
      alert("You have already nominated this employee this month.");
      return;
    }

    await axios.post(
      "/nominations",
      {
        ...form,
        nominated_by: employee.id,
        month_year: monthYear,
      }
    );

    alert("Nomination Submitted");

    // Clear form
    setForm({
      nominee_id: "",
      reason: "",
    });

  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

 return (
   <div className="min-h-screen bg-gray-100 p-8">

     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

       <Navbar />

       <form onSubmit={submitNomination}>

        <select
  value={form.nominee_id}
  required
  className="w-full border p-3 rounded mb-4"
  onChange={(e) =>
    setForm({
      ...form,
      nominee_id: e.target.value,
    })
  }
>
  <option value="">Select Employee</option>
           {employees.map((emp) => (
             <option
               key={emp.id}
               value={emp.id}
             >
               {emp.name}
             </option>
           ))}
         </select>
         <textarea
  rows="5"
  value={form.reason}
  placeholder="Reason for nomination"
  className="w-full border p-3 rounded mb-4"
  onChange={(e) =>
    setForm({
      ...form,
      reason: e.target.value,
    })
  }
  required
/>
         <button
           className="bg-blue-600 text-white px-6 py-3 rounded"
         >
           Submit
         </button>

       </form>

     </div>
   </div>
 );
}
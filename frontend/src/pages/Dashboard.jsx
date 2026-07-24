import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/dashboard/StatCard";


export default function Dashboard() {

 const [nominations, setNominations] = useState([]);
 const [stats, setStats] = useState({
    total: 0,
    monthly: 0,
  });

 useEffect(() => {
   loadData();
 }, []);

 const { employee } = useAuth();

 const loadData = async () => {
   const res = await axios.get(
     "http://localhost:5000/api/nominations"
   );

   setNominations(res.data);
   console.log(res.data);
   const statRes = await api.get("/nominations/stats");
   setStats(statRes.data);
 };

 return (
   <div className="p-8">

    <Navbar />

    <h1 className="text-3xl font-bold">

Welcome,

<span className="text-blue-600">

 {employee.name}

</span>

 👋

</h1>

<div className="grid md:grid-cols-2 gap-5 mb-8">

   <StatCard
      title="Total Nominations"
      value={stats.total}
      color="bg-blue-600"
   />

   <StatCard
      title="This Month"
      value={stats.monthly}
      color="bg-green-600"
   />

</div>


     <table className="w-full bg-white shadow">

       <thead>
         <tr className="bg-gray-200">
           <th className="p-3">Nominee</th>
           <th className="p-3">Nominated By</th>
           <th className="p-3">Reason</th>
           <th className="p-3">Month</th>
         </tr>
       </thead>

       <tbody>
         {nominations.map((item) => (
           <tr key={item.id}>
             <td className="p-3">{item.nominee}</td>
             <td className="p-3">{item.nominated_by}</td>
             <td className="p-3">{item.reason}</td>
             <td className="p-3">{item.month_year}</td>
           </tr>
         ))}
       </tbody>

     </table>

   </div>
 );
}
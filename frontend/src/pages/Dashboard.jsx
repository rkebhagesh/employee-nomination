import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

 const [nominations, setNominations] = useState([]);

 useEffect(() => {
   loadData();
 }, []);

 const loadData = async () => {
   const res = await axios.get(
     "http://localhost:5000/api/nominations"
   );

   setNominations(res.data);
   console.log(res.data);
 };

 return (
   <div className="p-8">

     <h1 className="text-3xl font-bold mb-6">
       Nomination Dashboard
     </h1>

     <button
       onClick={() => (window.location.href = "/nominate")}
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
     >
       Nominate now!
     </button>

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
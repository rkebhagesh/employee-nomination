import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Nominate from "./pages/Nominate";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/nominate" element={<Nominate />} />
    <Route path="/add-employee" element={<EmployeeForm />} />
   </Routes>
  </BrowserRouter>
 );
}

export default App;
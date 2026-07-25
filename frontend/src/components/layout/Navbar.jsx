import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {Link} from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const { employee, logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  return (

    <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Employee Nomination
      </h1>

      <div className="flex items-center gap-5">

        <span>
          Welcome, {employee?.name}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

        {employee?.role === "admin" && (

    <Link
        to="/admin"
        className="hover:underline"
    >
        Admin
    </Link>

)}

      </div>

    </div>

  );

}
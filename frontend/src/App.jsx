import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/nomination/Dashboard";
import Nominate from "./pages/nomination/Nominate";

import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import AddEmployee from "./pages/admin/AddEmployee";
import EditEmployee from "./pages/admin/EditEmployee";

function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Nominate */}
      <Route
        path="/nominate"
        element={
          <ProtectedRoute>
            <Nominate />
          </ProtectedRoute>
        }
      />

      <Route
          path="/admin"
          element={
              <ProtectedRoute>
                  <Admin />
              </ProtectedRoute>
          }
      />

      <Route
        path="/admin/add"
        element={
          <ProtectedRoute>
            <AddEmployee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <ProtectedRoute>
            <EditEmployee />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Nominate from "./pages/Nominate";

import ProtectedRoute from "./components/ProtectedRoute";

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

    </Routes>
  );
}

export default App;
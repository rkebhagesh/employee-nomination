import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(() => {
    const stored = localStorage.getItem("employee");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (employeeData, jwtToken) => {
    localStorage.setItem("employee", JSON.stringify(employeeData));
    localStorage.setItem("token", jwtToken);

    setEmployee(employeeData);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("employee");
    localStorage.removeItem("token");

    setEmployee(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        employee,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
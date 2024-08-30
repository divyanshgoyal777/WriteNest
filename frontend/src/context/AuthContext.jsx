import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
  });

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setAuth({
      user: userData,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth({
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

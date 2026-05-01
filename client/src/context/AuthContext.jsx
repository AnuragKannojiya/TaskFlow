import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskflowUser");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (_error) {
      localStorage.removeItem("taskflowUser");
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("taskflowToken"));

  useEffect(() => {
    const handleForcedLogout = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener("taskflow:logout", handleForcedLogout);

    return () => {
      window.removeEventListener("taskflow:logout", handleForcedLogout);
    };
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("taskflowToken", token);
    } else {
      localStorage.removeItem("taskflowToken");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("taskflowUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("taskflowUser");
    }
  }, [user]);

  const signup = async (formData) => {
    const { data } = await api.post("/auth/signup", formData);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const login = async (formData) => {
    const { data } = await api.post("/auth/login", formData);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), signup, login, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

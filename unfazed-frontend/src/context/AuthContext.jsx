/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("IN"); // 'IN' vs 'GLOBAL'

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("unfazed_token");
      if (!token) {
        // Fallback default demo user for frictionless review
        setUser({
          id: "66e01a9b4000000000000001",
          name: "Dr. Ashmita Singh",
          email: "dr.ashmita@unfazed.in",
          slug: "ashmita-singh",
          role: "therapist",
          subscriptionTier: "pro",
        });
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("unfazed_token");
        setUser({
          id: "66e01a9b4000000000000001",
          name: "Dr. Ashmita Singh",
          email: "dr.ashmita@unfazed.in",
          slug: "ashmita-singh",
          role: "therapist",
          subscriptionTier: "pro",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("unfazed_token", token);
    localStorage.setItem("unfazed_therapist_id", userData.id);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("unfazed_token");
    localStorage.removeItem("unfazed_therapist_id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, country, setCountry, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;

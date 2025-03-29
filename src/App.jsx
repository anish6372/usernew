import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup";
import UserManagement from "./Components/UserManagement";

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle login and save token to localStorage
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Handle logout and clear token from localStorage
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Load token from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false); // Mark as loaded
  }, []);

  // Show nothing while loading (prevents flickering)
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Always show login first when app starts */}
        <Route
          path="/"
          element={token ? <Navigate to="/users" replace /> : <LoginSignup onLogin={handleLogin} />}
        />
        {/* Show UserManagement if logged in, otherwise redirect to login */}
        <Route
          path="/users"
          element={token ? <UserManagement onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        {/* Redirect any unknown route to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
// src/routes/Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Convert from "../convert/Convert";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/convert"
        element={isLoggedIn ? <Convert /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const token = localStorage.getItem("jwtToken");

  // If token exists, render the component, otherwise redirect to /login
  return token ? component : <Navigate to="/login" />;
};

export default ProtectedRoute;

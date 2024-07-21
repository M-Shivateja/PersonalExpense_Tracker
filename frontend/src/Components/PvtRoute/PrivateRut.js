import React from "react";
import { Navigate } from "react-router-dom";
function PrivateRut({ children }) {
  const isAuth = !!localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRut;

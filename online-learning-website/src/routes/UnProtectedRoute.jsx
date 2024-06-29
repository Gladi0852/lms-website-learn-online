import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isAuthorised } = useSelector((store) => store.loginStatus);
  if (!isAuthorised) return element;
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

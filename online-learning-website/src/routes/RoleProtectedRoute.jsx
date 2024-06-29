import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ element, disallowedRoles }) => {
  const { role } = useSelector((store) => store.userInfo);
  if (disallowedRoles.includes(role)) return <Navigate to="/" replace />;
  return element;
};

export default RoleProtectedRoute;

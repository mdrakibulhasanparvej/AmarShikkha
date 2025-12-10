import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../component/LoadingSpinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const locations = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) {
    return <Navigate to="/login" state={locations.pathname} />;
  }
  return children;
};

export default PrivateRoutes;

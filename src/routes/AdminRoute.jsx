import React from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userData: dbUser, isLoading } = useUser();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  // Proper admin check
  if (dbUser?.role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/loading-spinner";

export function RoleProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    console.log("User not authenticated or user data missing");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log(`User role ${user.role} not in allowed roles: ${allowedRoles.join(', ')}`);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
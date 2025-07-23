import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "@/lib/jwt";
import type { DecodedToken } from "@/lib/jwt";

export function RoleProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const user = getAuthUser() as DecodedToken | null;
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
} 
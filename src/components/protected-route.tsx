import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

export function ProtectedRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
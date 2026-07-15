import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function UserOnlyRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role === "admin") {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}
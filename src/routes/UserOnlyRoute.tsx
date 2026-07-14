import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function UserOnlyRoute() {
  const { user } = useAuth();
  return user?.role === "admin" ? <Navigate to="/admin/manage-books" replace /> : <Outlet />;
}
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLoader } from "@/components/ui/PageLoader";

export function AdminRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}
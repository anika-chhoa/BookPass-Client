import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Unauthorized() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const attemptedPath = (location.state as { from?: string })?.from;
  const isAdmin = user?.role === "admin";
  const homePath = user ? (isAdmin ? "/admin/overview" : "/dashboard") : "/";

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-lg py-xxl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center flex flex-col items-center gap-lg"
      >
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-secondary" strokeWidth={1.75} />
        </div>

        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Access Restricted</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {isAdmin
              ? "This area is reserved for member accounts. As an administrator, your dashboard covers catalog management, users, bookings, and payments."
              : "This area is reserved for administrators. If you believe you should have access, please contact your library administrator."}
          </p>
          {attemptedPath && (
            <p className="font-label-sm text-label-sm text-on-surface-variant/70 mt-sm">
              Requested page: <span className="font-mono">{attemptedPath}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-sm w-full">
          <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>
          <Link to={homePath} className="flex-1">
            <Button fullWidth>
              <Home className="w-4 h-4" /> {user ? "My Dashboard" : "Homepage"}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
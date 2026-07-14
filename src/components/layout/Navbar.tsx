import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();
  const dashboardPath = user?.role === "admin" ? "/admin/overview" : "/dashboard";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 bg-surface/95 backdrop-blur-md border-b border-outline-variant"
    >
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-lg md:px-margin-desktop">
        <div className="flex items-center gap-xl">
          <Link to="/" className="font-headline-lg text-headline-lg font-bold text-primary">
            Libro
          </Link>
          <div className="hidden md:flex items-center gap-lg">
            <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md">
              Home
            </Link>
            <Link to="/books" className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
              Browse Books
            </Link>
            {user && (
              <Link to={dashboardPath} className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
                Dashboard
              </Link>
            )}
            <Link to="/pricing" className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
              Subscription
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-md">
          {user ? (
            <Link to={dashboardPath}>
              <Button variant="outline" size="sm">My Account</Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button variant="ghost" size="sm" className="hidden md:inline-flex">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" size="sm">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
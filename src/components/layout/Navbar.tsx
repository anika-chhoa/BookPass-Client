import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const LOGGED_OUT_LINKS = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Browse Books" },
  { to: "/about", label: "About Us" },
];

const LOGGED_IN_LINKS = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Browse Books" },
  { to: "/pricing", label: "Subscription" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Blog" },
];

function NavLink({ to, label, isActive }: { to: string; label: string; isActive: boolean }) {
  return (
    <Link to={to} className="relative py-xs group">
      <span
        className={`font-label-md text-label-md transition-colors ${
          isActive ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
        }`}
      >
        {label}
      </span>
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const dashboardPath = user?.role === "admin" ? "/admin/overview" : "/dashboard";
  const navLinks = user ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  const isLinkActive = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  const handleLogout = async () => {
    setAvatarOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 h-14 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant"
    >
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-lg md:px-margin-desktop">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary shrink-0 transition-opacity hover:opacity-80">
          OpenShelf
        </Link>

        <div className="hidden lg:flex items-center gap-lg">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} label={link.label} isActive={isLinkActive(link.to)} />
          ))}
          {user && (
            <NavLink to={dashboardPath} label="Dashboard" isActive={isLinkActive(dashboardPath)} />
          )}
        </div>

        <div className="hidden lg:flex items-center gap-md">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-sm px-sm py-1 rounded-full hover:bg-surface-container-low transition-colors"
              >
                <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-outline-variant" />
                <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${avatarOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {avatarOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setAvatarOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-sm w-56 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg z-20 overflow-hidden"
                    >
                      <div className="px-md py-sm border-b border-outline-variant">
                        <p className="font-label-md text-label-md text-on-surface line-clamp-1">{user.name}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">{user.email}</p>
                      </div>
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-sm px-md py-sm font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-sm px-md py-sm font-label-sm text-label-sm text-error hover:bg-surface-container-low transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/register">
                <Button variant="ghost" size="sm">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" size="sm">Login</Button>
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-on-surface" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-surface border-t border-outline-variant overflow-hidden"
          >
            <div className="flex flex-col px-lg py-md gap-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`py-sm font-label-md text-label-md transition-colors border-l-2 pl-sm ${
                    isLinkActive(link.to)
                      ? "text-primary border-primary"
                      : "text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileOpen(false)}
                    className={`py-sm font-label-md text-label-md transition-colors border-l-2 pl-sm ${
                      isLinkActive(dashboardPath)
                        ? "text-primary border-primary"
                        : "text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setMobileOpen(false)}
                    className="py-sm font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary/40 pl-sm"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/privacy"
                    onClick={() => setMobileOpen(false)}
                    className="py-sm font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary/40 pl-sm"
                  >
                    Privacy & Terms
                  </Link>
                </>
              )}
              <div className="flex gap-sm pt-sm">
                {user ? (
                  <Button variant="outline" fullWidth onClick={handleLogout}>Log Out</Button>
                ) : (
                  <>
                    <Link to="/register" className="flex-1"><Button variant="ghost" fullWidth>Register</Button></Link>
                    <Link to="/login" className="flex-1"><Button variant="primary" fullWidth>Login</Button></Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
import { ArrowLeft } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";

const USER_NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/my-bookings", label: "My Bookings", end: false },
  { to: "/favorites", label: "Favorites", end: false },
  { to: "/dashboard/profile", label: "Profile", end: false },
];

const ADMIN_NAV_ITEMS = [
  { to: "/admin/overview", label: "Overview", end: false },
  { to: "/items/manage", label: "Manage Books", end: false },
  { to: "/items/add", label: "Add Book", end: false },
  { to: "/dashboard/users", label: "All Users", end: false },
  { to: "/dashboard/bookings", label: "Booking History", end: false },
  { to: "/dashboard/payments", label: "Payments", end: false },
  { to: "/dashboard/profile", label: "Profile", end: false },
];

export default function DashboardLayout() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navItems = isAdmin ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <Container className="py-lg min-h-screen">
      <Link
        to="/"
        className="inline-flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors mb-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-md mb-lg">
        <img
          src={user?.avatarUrl}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-outline-variant"
        />
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">
            {isAdmin ? "Admin Dashboard" : "Dashboard"}
          </h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {user?.name} · {isAdmin ? "Administrator" : `${user?.plan} plan`}
          </p>
        </div>
      </div>

      <div className="flex md:hidden gap-sm overflow-x-auto pb-sm mb-lg -mx-md px-md">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "shrink-0 px-md py-sm rounded-xl font-label-md text-label-md whitespace-nowrap",
                isActive ? "bg-primary !text-white" : "bg-surface-container-low text-on-surface-variant"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-xl">
        <nav className="hidden md:flex flex-col gap-xs w-48 shrink-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "px-md py-sm rounded-xl font-label-md text-label-md transition-colors",
                  isActive ? "bg-primary !text-white" : "text-on-surface-variant hover:bg-surface-container-low"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
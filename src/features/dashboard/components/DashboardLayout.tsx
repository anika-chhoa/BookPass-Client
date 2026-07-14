import { NavLink, Outlet } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/my-bookings", label: "My Bookings", end: false },
  { to: "/favorites", label: "Favorites", end: false },
  { to: "/dashboard/profile", label: "Profile", end: false },
];

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <Container className="py-xl min-h-screen">
      <div className="flex items-center gap-md mb-lg">
        <div className="flex flex-col justify-center items-center gap-4 px-lg">
        <img
          src={user?.avatarUrl}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-outline-variant"
        />
        <p className="font-label-sm text-label-sm text-on-surface-variant">{user?.name} · {user?.plan} plan</p>
        </div>
        {/* <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Dashboard</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{user?.name} · {user?.plan} plan</p>
        </div> */}
      </div>

      <div className="flex md:hidden gap-sm overflow-x-auto pb-sm mb-lg -mx-md px-md">
        {NAV_ITEMS.map((item) => (
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
          {NAV_ITEMS.map((item) => (
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
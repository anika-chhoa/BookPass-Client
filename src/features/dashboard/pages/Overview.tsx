import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { apiGetDashboardStats, type DashboardStats } from "../api/dashboard.api";

const PRIMARY = "#204e2b";
const SECONDARY = "#bc4749";

function StatCard({ label, value, danger }: { label: string; value: number; danger?: boolean }) {
  return (
    <Card hoverable={false} className="items-center text-center">
      <p className={`font-headline-lg text-headline-lg ${danger && value > 0 ? "text-secondary" : "text-primary"}`}>{value}</p>
      <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{label}</p>
    </Card>
  );
}

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetDashboardStats().then(setStats).catch((err) => setError(err instanceof Error ? err.message : "Failed to load stats"));
  }, []);

  if (error) return <p className="text-error font-label-sm text-label-sm">{error}</p>;
  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
      </div>
    );
  }

  const usagePercent = stats.planLimit > 0 ? Math.min(100, Math.round((stats.planUsed / stats.planLimit) * 100)) : 0;
  const radialData = [{ name: "used", value: usagePercent, fill: PRIMARY }];

  return (
    <div className="flex flex-col gap-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <StatCard label="Active Bookings" value={stats.activeBookings} />
        <StatCard label="Overdue" value={stats.overdueBookings} danger />
        <StatCard label="Returned (lifetime)" value={stats.returnedBookings} />
        <StatCard label="Favorites" value={stats.totalFavorites} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <Card hoverable={false} className="lg:col-span-2">
          <h2 className="font-headline-md text-body-lg text-on-surface mb-md">Bookings by Month</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill={PRIMARY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card hoverable={false} className="items-center">
          <h2 className="font-headline-md text-body-lg text-on-surface self-start mb-md">Plan Usage</h2>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={12} angleAxisId={0} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-md text-headline-md text-primary">{stats.planUsed}/{stats.planLimit}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant capitalize">{stats.plan} plan</span>
            </div>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-md text-center">
            Resets {new Date(stats.periodResetDate).toLocaleDateString()}
          </p>
        </Card>
      </div>
    </div>
  );
}
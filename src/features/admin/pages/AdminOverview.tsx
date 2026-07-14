import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { apiGetAdminStats, type AdminStats } from "../api/admin.api";

const PRIMARY = "#204e2b";
const SECONDARY = "#bc4749";
const TERTIARY = "#384c00";
const PLAN_COLORS: Record<string, string> = { free: "#9ca3af", pro: PRIMARY, premium: SECONDARY };

function formatCurrency(cents: number) {
  return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <Card hoverable={false} className="items-center text-center">
      <p className={`font-headline-lg text-headline-lg ${accent ? "text-secondary" : "text-primary"}`}>{value}</p>
      <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{label}</p>
    </Card>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetAdminStats().then(setStats).catch((err) => setError(err instanceof Error ? err.message : "Failed to load stats"));
  }, []);

  if (error) return <p className="text-error font-label-sm text-label-sm">{error}</p>;
  if (!stats) {
    return (
      <div className="min-h-screen grid grid-cols-2 md:grid-cols-5 gap-md">
        <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
      </div>
    );
  }

  const planData = stats.planDistribution.map((p) => ({ name: p.plan, value: p.count }));

  return (
    <div className="min-h-screen flex flex-col gap-lg">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary">Admin Overview</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Platform-wide statistics at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Books" value={stats.totalBooks} />
        <StatCard label="Active Bookings" value={stats.activeBookings} />
        <StatCard label="Overdue" value={stats.overdueBookings} accent />
        <StatCard label="Total Revenue" value={formatCurrency(stats.totalRevenue)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <Card hoverable={false} className="lg:col-span-2">
          <h2 className="font-headline-md text-body-lg text-on-surface mb-md">Revenue by Month</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `$${v / 100}`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="amount" fill={PRIMARY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card hoverable={false} className="items-center">
          <h2 className="font-headline-md text-body-lg text-on-surface self-start mb-md">Plan Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={planData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {planData.map((entry) => (
                    <Cell key={entry.name} fill={PLAN_COLORS[entry.name] ?? PRIMARY} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  formatter={(value: string) => <span className="capitalize font-label-sm text-label-sm text-on-surface-variant">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <Card hoverable={false} className="lg:col-span-2">
          <h2 className="font-headline-md text-body-lg text-on-surface mb-md">Bookings by Month</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill={TERTIARY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card hoverable={false}>
          <h2 className="font-headline-md text-body-lg text-on-surface mb-md">Top Categories</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.topCategories} layout="vertical" margin={{ left: 12 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} fontSize={12} />
                <YAxis type="category" dataKey="category" width={80} fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill={SECONDARY} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
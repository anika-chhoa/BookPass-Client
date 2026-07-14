import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { apiListAdminPayments } from "../api/admin.api";

function formatAmount(amountTotal: number, currency: string) {
  return (amountTotal / 100).toLocaleString(undefined, { style: "currency", currency: currency.toUpperCase() });
}

export default function AdminPayments() {
  const [data, setData] = useState<Awaited<ReturnType<typeof apiListAdminPayments>> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    apiListAdminPayments(page).then(setData).catch((err) => setError(err instanceof Error ? err.message : "Failed to load payments"));
  }, [page]);

  return (
    <div className="flex flex-col gap-lg min-h-screen">
      <div>
        <h1 className="font-headline-lg text-headline-md text-primary">Payments</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Successful subscription payments across all users.
        </p>
      </div>

      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!data ? (
        <Card hoverable={false} padded={false}>
          <SkeletonTable rows={6} columns={5} />
        </Card>
      ) : data.items.length === 0 ? (
        <Card hoverable={false} className="items-center text-center py-xxl">
          <p className="text-on-surface-variant font-body-md">No payments recorded yet.</p>
        </Card>
      ) : (
        <>
          <Card hoverable={false} padded={false} className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">User</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Email</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Plan</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Amount</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Session ID</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((p) => (
                    <tr key={p.id} className="border-b border-outline-variant last:border-0">
                      <td className="px-md py-sm">
                        <span className="font-body-md text-body-md text-on-surface line-clamp-1">{p.userName}</span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{p.userEmail}</span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant capitalize">{p.plan}</span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-primary whitespace-nowrap">
                          {formatAmount(p.amountTotal, p.currency)}
                        </span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-mono text-label-sm text-on-surface-variant">
                          {p.stripeSessionId.slice(0, 18)}…
                        </span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
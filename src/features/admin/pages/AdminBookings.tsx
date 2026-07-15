import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { apiListAdminBookings } from "../api/admin.api";

function StatusBadge({ status, isOverdue }: { status: string; isOverdue: boolean }) {
  if (status === "returned") {
    return (
      <span className="inline-block px-sm py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
        Returned
      </span>
    );
  }
  if (isOverdue) {
    return (
      <span className="inline-block px-sm py-1 rounded-full bg-error/10 text-error font-label-sm text-label-sm">
        Overdue
      </span>
    );
  }
  return (
    <span className="inline-block px-sm py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
      Active
    </span>
  );
}

export default function AdminBookings() {
  const [data, setData] = useState<Awaited<ReturnType<typeof apiListAdminBookings>> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    apiListAdminBookings(page).then(setData).catch((err) => setError(err instanceof Error ? err.message : "Failed to load bookings"));
  }, [page]);

  return (
    <div className="flex flex-col gap-lg min-h-screen">
      <div>
        <h1 className="font-headline-lg text-headline-md text-primary">Booking History</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          All bookings across every user.
        </p>
      </div>

      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!data ? (
        <Card hoverable={false} padded={false}>
          <SkeletonTable rows={6} columns={5} />
        </Card>
      ) : (
        <>
          <Card hoverable={false} padded={false} className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">User</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Email</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Book</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Booked</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Due</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((b) => {
                    const isOverdue = b.status === "active" && new Date(b.dueDate) < new Date();
                    return (
                      <tr key={b.id} className="border-b border-outline-variant last:border-0">
                        <td className="px-md py-sm">
                          <span className="font-body-md text-body-md text-on-surface line-clamp-1">{b.userName}</span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{b.userEmail}</span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="font-label-sm text-label-sm text-on-surface line-clamp-1">{b.bookTitle}</span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
                            {new Date(b.bookedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-md py-sm">
                          <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
                            {new Date(b.dueDate).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-md py-sm">
                          <StatusBadge status={b.status} isOverdue={isOverdue} />
                        </td>
                      </tr>
                    );
                  })}
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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { apiListMyBookings, apiReturnBooking, type Booking } from "@/features/bookings/api/bookings.api";

function StatusBadge({ status, isOverdue }: { status: Booking["status"]; isOverdue: boolean }) {
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

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    apiListMyBookings().then(setBookings).catch((err) => setError(err instanceof Error ? err.message : "Failed to load bookings"));
  };
  useEffect(load, []);

  const handleReturn = async (id: string) => {
    setReturningId(id);
    try { await apiReturnBooking(id); load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Failed to return book"); }
    finally { setReturningId(null); }
  };

  return (
    <div className="flex flex-col gap-lg min-h-screen">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary">My Bookings</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Track your active loans and borrowing history.
        </p>
      </div>

      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!bookings ? (
        <Card hoverable={false} padded={false}>
          <SkeletonTable rows={4} columns={4} />
        </Card>
      ) : bookings.length === 0 ? (
        <Card hoverable={false} className="items-center text-center py-xxl">
          <p className="text-on-surface-variant font-body-md">No bookings yet — browse books to get started.</p>
        </Card>
      ) : (
        <Card hoverable={false} padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Book</th>
                  <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Status</th>
                  <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Date</th>
                  <th className="text-right font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const isOverdue = b.status === "active" && new Date(b.dueDate) < new Date();
                  return (
                    <tr key={b.id} className="border-b border-outline-variant last:border-0">
                      <td className="px-md py-sm">
                        <div className="flex items-center gap-md">
                          <img
                            src={b.bookCoverUrl}
                            alt={b.bookTitle}
                            className="w-10 aspect-[3/4] object-cover rounded-md shrink-0"
                          />
                          <span className="font-body-md text-body-md text-on-surface line-clamp-1">{b.bookTitle}</span>
                        </div>
                      </td>
                      <td className="px-md py-sm">
                        <StatusBadge status={b.status} isOverdue={isOverdue} />
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
                          {b.status === "returned"
                            ? `Returned ${new Date(b.returnedAt!).toLocaleDateString()}`
                            : `Due ${new Date(b.dueDate).toLocaleDateString()}`}
                        </span>
                      </td>
                      <td className="px-md py-sm text-right">
                        {b.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            isLoading={returningId === b.id}
                            onClick={() => handleReturn(b.id)}
                          >
                            Return
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
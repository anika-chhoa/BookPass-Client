import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { apiListMyBookings, apiReturnBooking, type Booking } from "@/features/bookings/api/bookings.api";

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
    <Container className="py-xxl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">My Bookings</h1>
      {error && <p className="text-error font-label-sm text-label-sm mb-md">{error}</p>}
      {!bookings ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg"><SkeletonCard /><SkeletonCard /></div>
      ) : bookings.length === 0 ? (
        <p className="text-on-surface-variant font-body-md">No bookings yet — browse books to get started.</p>
      ) : (
        <div className="flex flex-col gap-md">
          {bookings.map((b) => {
            const isOverdue = b.status === "active" && new Date(b.dueDate) < new Date();
            return (
              <Card key={b.id} hoverable={false} className="flex-row items-center gap-md">
                <img src={b.bookCoverUrl} alt={b.bookTitle} className="w-16 aspect-[3/4] object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-headline-md text-body-lg text-on-surface">{b.bookTitle}</h3>
                  <p className={`font-label-sm text-label-sm ${isOverdue ? "text-error" : "text-on-surface-variant"}`}>
                    {b.status === "returned" ? `Returned ${new Date(b.returnedAt!).toLocaleDateString()}` : `Due ${new Date(b.dueDate).toLocaleDateString()}${isOverdue ? " — Overdue" : ""}`}
                  </p>
                </div>
                {b.status === "active" && (
                  <Button variant="outline" size="sm" isLoading={returningId === b.id} onClick={() => handleReturn(b.id)}>Return</Button>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { GRID_BREAKPOINTS, GRID_GAP } from "@/constants/theme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { apiCreateBooking } from "@/features/bookings/api/bookings.api";
import { apiGetBook, apiListBooks } from "@/features/books/api/books.api";
import { BookCard } from "@/features/books/components/BookCard";
import type { Book } from "@/features/books/types/book";
import {
  apiAddFavorite,
  apiRemoveFavorite,
} from "@/features/favorites/api/favorites.api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;
    setBook(null);
    apiGetBook(id)
      .then((b) => {
        setBook(b);
        return apiListBooks({ category: b.category, limit: 5 });
      })
      .then((res) =>
        setRelated(res.items.filter((b) => b.id !== id).slice(0, 4)),
      )
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load book"),
      );
  }, [id]);

  const requireAuth = (action: () => void) => {
    if (!user) navigate("/login");
    else action();
  };
  console.log(book);

  const handleBookNow = () =>
    requireAuth(async () => {
      if (!book) return;
      setBookingLoading(true);
      setBookingMessage("");
      try {
        await apiCreateBooking(book.id);
        setBookingMessage("Booked! Check My Bookings to see your due date.");
        setBook({ ...book, availableCopies: book.totalCopies - 1 });
      } catch (err) {
        setBookingMessage(
          err instanceof Error ? err.message : "Booking failed",
        );
      } finally {
        setBookingLoading(false);
      }
    });

  const handleFavorite = () =>
    requireAuth(async () => {
      if (!book) return;
      setFavoriteLoading(true);
      try {
        if (isFavorited) {
          await apiRemoveFavorite(book.id);
          setIsFavorited(false);
        } else {
          await apiAddFavorite(book.id);
          setIsFavorited(true);
        }
      } catch (err) {
        setBookingMessage(
          err instanceof Error ? err.message : "Failed to update favorites",
        );
      } finally {
        setFavoriteLoading(false);
      }
    });

  if (error)
    return (
      <Container className="py-xxl">
        <p className="text-error font-body-md">{error}</p>
      </Container>
    );
  if (!book)
    return (
      <Container className="py-xxl">
        <SkeletonCard />
      </Container>
    );

  return (
    <Container className="py-xxl">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-xl mb-xxl">
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-full aspect-[3/4] object-cover rounded-xl border border-outline-variant"
        />

        <div className="flex flex-col gap-md">
          <span className="w-fit rounded-lg bg-tertiary-container px-sm py-xs font-label-sm text-label-sm text-on-tertiary-container">
            {book.category}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary">
            {book.title}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            by {book.writer}
          </p>
          <RatingStars
            rating={book.rating}
            reviewCount={book.reviewCount}
            size="md"
          />

          <p className="font-body-md text-body-md text-on-surface whitespace-pre-line">
            {book.description}
          </p>

          <div className="flex gap-xl font-label-sm text-label-sm text-on-surface-variant">
            <span>{book.pages} pages</span>
            <span>
              Published {new Date(book.publishedDate).toLocaleDateString()}
            </span>
            <span>
               {book.totalCopies} available
            </span>
          </div>

          {bookingMessage && (
            <p className="font-label-sm text-label-sm text-primary">
              {bookingMessage}
            </p>
          )}

          <div className="flex gap-md mt-md">
            <Button
              disabled={book.totalCopies === 0}
              isLoading={bookingLoading}
              loadingText="Booking..."
              onClick={handleBookNow}
            >
              {book.totalCopies === 0
                ? "Currently Unavailable"
                : "Book Now"}
            </Button>
            <Button
              variant="outline"
              isLoading={favoriteLoading}
              onClick={handleFavorite}
            >
              {isFavorited ? "★ Favorited" : "Add to Favorite"}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h2 className="font-headline-md text-headline-md text-primary mb-md">
            Related Books
          </h2>
          <div className={`grid ${GRID_BREAKPOINTS.browseBooks} ${GRID_GAP}`}>
            {related.map((b) => (
              <BookCard
                key={b.id}
                book={b}
                onViewDetails={(bid) => navigate(`/books/${bid}`)}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

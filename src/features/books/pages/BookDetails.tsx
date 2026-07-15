import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { SkeletonBookDetails } from "@/components/ui/Skeleton";
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
import { ReviewSection } from "@/features/reviews/components/ReviewSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BookGallery } from "../components/BookGallery";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
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

  const handleBookNow = () =>
    requireAuth(async () => {
      if (!book) return;
      setBookingLoading(true);
      try {
        await apiCreateBooking(book.id);
        toast.success(`"${book.title}" booked! Check My Bookings for your due date.`);
        navigate("/my-bookings");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Booking failed";
        if (message.toLowerCase().includes("plan's limit")) {
          navigate("/pricing", { state: { limitReached: true } });
          return;
        }
        toast.error(message);
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
          toast.success(`"${book.title}" removed from favorites`);
        } else {
          await apiAddFavorite(book.id);
          setIsFavorited(true);
          toast.success(`"${book.title}" added to favorites`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update favorites";
        toast.error(message);
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
        <SkeletonBookDetails />
      </Container>
    );

  return (
    <Container className="py-xxl min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-xl mb-xxl">
        <BookGallery coverUrl={book.coverUrl} images={book.images} title={book.title} />

        <div className="flex flex-col gap-md">
          <span className="w-fit rounded-lg bg-tertiary-container px-sm py-xs font-label-sm text-label-sm text-on-tertiary-container">
            {book.category}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary">
            {book.title}
          </h1>
          <div className="flex items-center gap-sm">
            <img
              src={book.writerPhotoUrl}
              alt={book.writerName}
              className="w-8 h-8 rounded-full object-cover border border-outline-variant"
            />
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              by {book.writerName}
            </p>
          </div>
          <RatingStars
            rating={book.rating}
            reviewCount={book.reviewCount}
            size="md"
          />

          <p className="font-body-lg text-body-lg text-on-surface font-medium">
            {book.shortDescription}
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line">
            {book.description}
          </p>

          <div className="flex gap-xl font-label-sm text-label-sm text-on-surface-variant">
            <span>{book.pages} pages</span>
            <span>
              Published {new Date(book.publishedDate).toLocaleDateString()}
            </span>
            <span>{book.totalCopies} available</span>
          </div>

          <div className="flex gap-md mt-md">
            <Button
              disabled={book.totalCopies === 0}
              isLoading={bookingLoading}
              loadingText="Booking..."
              onClick={handleBookNow}
            >
              {book.totalCopies === 0 ? "Currently Unavailable" : "Book Now"}
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
      <ReviewSection bookId={book.id} />
      {related.length > 0 && (
        <>
          <h2 className="font-headline-md text-headline-md text-primary mb-md mt-12">
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { StarRatingInput } from "./StarRatingInput";
import { apiListBookReviews, apiCreateReview, type Review } from "../api/reviews.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function ReviewSection({ bookId }: { bookId: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const load = () => {
    apiListBookReviews(bookId).then((res) => {
      setReviews(res);
      if (user) setHasReviewed(res.some((r) => r.userName === user.name));
    });
  };
  useEffect(load, [bookId]);

  const handleSubmit = async () => {
    if (!user) return navigate("/login");
    if (rating === 0) return setError("Please select a star rating");
    setError("");
    setLoading(true);
    try {
      await apiCreateReview(bookId, rating, comment);
      setComment("");
      setRating(0);
      setHasReviewed(true);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-primary mb-md">Reviews</h2>
      {!hasReviewed && (
        <div className="flex flex-col gap-sm mb-xl p-lg rounded-xl border border-outline-variant">
          <StarRatingInput value={rating} onChange={setRating} />
          <textarea
            placeholder={user ? "Share your thoughts on this book..." : "Log in to leave a review"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user}
            rows={3}
            className="rounded-xl border border-outline-variant px-md py-sm font-body-md"
          />
          {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
          <Button size="sm" className="self-start" isLoading={loading} loadingText="Posting..." onClick={handleSubmit}>
            {user ? "Post Review" : "Log In to Review"}
          </Button>
        </div>
      )}
      {!reviews ? (
        <p className="text-on-surface-variant font-body-md">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-on-surface-variant font-body-md">No reviews yet — be the first to share your thoughts.</p>
      ) : (
        <div className="flex flex-col gap-md">
          {reviews.map((r) => (
            <div key={r.id} className="p-lg rounded-xl border border-outline-variant">
              <div className="flex items-center justify-between mb-xs">
                <span className="font-label-md text-label-md text-on-surface">{r.userName}</span>
                <span className="text-secondary">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
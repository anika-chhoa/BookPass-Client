import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { apiListMyFavorites, apiRemoveFavorite, type Favorite } from "@/features/favorites/api/favorites.api";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    apiListMyFavorites().then(setFavorites).catch((err) => setError(err instanceof Error ? err.message : "Failed to load favorites"));
  };
  useEffect(load, []);

  const handleRemove = async (bookId: string) => {
    setRemovingId(bookId);
    try { await apiRemoveFavorite(bookId); setFavorites((prev) => prev?.filter((f) => f.bookId !== bookId) ?? null); }
    catch (err) { setError(err instanceof Error ? err.message : "Failed to remove favorite"); }
    finally { setRemovingId(null); }
  };

  return (
    <Container className="py-xxl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Favorites</h1>
      {error && <p className="text-error font-label-sm text-label-sm mb-md">{error}</p>}
      {!favorites ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg"><SkeletonCard /><SkeletonCard /></div>
      ) : favorites.length === 0 ? (
        <p className="text-on-surface-variant font-body-md">No favorites yet — browse books and tap the star.</p>
      ) : (
        <div className="flex flex-col gap-md">
          {favorites.map((f) => (
            <Card key={f.id} hoverable={false} className="flex-row items-center gap-md">
              <img src={f.bookCoverUrl} alt={f.bookTitle} className="w-16 aspect-[3/4] object-cover rounded-lg" />
              <div className="flex-1">
                <Link to={`/books/${f.bookId}`} className="font-headline-md text-body-lg text-on-surface hover:text-secondary">{f.bookTitle}</Link>
                <p className="font-label-sm text-label-sm text-on-surface-variant">by {f.bookWriter}</p>
              </div>
              <Button variant="outline" size="sm" isLoading={removingId === f.bookId} onClick={() => handleRemove(f.bookId)}>Remove</Button>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
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
    <div className="flex flex-col gap-lg min-h-screen">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary">Favorites</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Books you've saved for later.
        </p>
      </div>

      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!favorites ? (
        <Card hoverable={false} padded={false}>
          <SkeletonTable rows={4} columns={3} />
        </Card>
      ) : favorites.length === 0 ? (
        <Card hoverable={false} className="items-center text-center py-xxl">
          <p className="text-on-surface-variant font-body-md">No favorites yet — browse books and tap the star.</p>
        </Card>
      ) : (
        <Card hoverable={false} padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Book</th>
                  <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Writer</th>
                  <th className="text-right font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((f) => (
                  <tr key={f.id} className="border-b border-outline-variant last:border-0">
                    <td className="px-md py-sm">
                      <div className="flex items-center gap-md">
                        <img
                          src={f.bookCoverUrl}
                          alt={f.bookTitle}
                          className="w-10 aspect-[3/4] object-cover rounded-md shrink-0"
                        />
                        <Link
                          to={`/books/${f.bookId}`}
                          className="font-body-md text-body-md text-on-surface hover:text-secondary line-clamp-1"
                        >
                          {f.bookTitle}
                        </Link>
                      </div>
                    </td>
                    <td className="px-md py-sm">
                      <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
                        {f.bookWriter}
                      </span>
                    </td>
                    <td className="px-md py-sm text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        isLoading={removingId === f.bookId}
                        onClick={() => handleRemove(f.bookId)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
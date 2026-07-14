import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { BookCard } from "@/features/books/components/BookCard";
import { apiListBooks } from "@/features/books/api/books.api";
import type { Book } from "@/features/books/types/book";
import { GRID_BREAKPOINTS, GRID_GAP } from "@/constants/theme";

const inputClass = "rounded-xl border border-outline-variant px-md py-sm font-body-md";

export default function Browse() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[] | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"newest" | "rating">("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    setBooks(null);
    apiListBooks({ search: search || undefined, category: category || undefined, sort, page, limit: 12 })
      .then((res) => { setBooks(res.items); setTotalPages(res.totalPages); })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load books"));
  }, [search, category, sort, page]);

  return (
    <Container className="py-xxl min-h-screen">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Browse Books</h1>
      <div className="flex flex-wrap gap-md mb-lg">
        <input placeholder="Search by title or writer..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className={inputClass + " flex-1 min-w-[200px]"} />
        <input placeholder="Category" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className={inputClass} />
        <select value={sort} onChange={(e) => { setSort(e.target.value as "newest" | "rating"); setPage(1); }} className={inputClass}>
          <option value="newest">Newest</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      {error && <p className="text-error font-label-sm text-label-sm mb-md">{error}</p>}
      <div className={`grid ${GRID_BREAKPOINTS.browseBooks} ${GRID_GAP} mb-lg`}>
        {!books
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : books.length === 0
          ? <p className="col-span-full text-on-surface-variant font-body-md">No books found.</p>
          : books.map((book) => <BookCard key={book.id} book={book} onViewDetails={(id) => navigate(`/books/${id}`)} />)}
      </div>
      {books && totalPages > 1 && (
        <div className="flex items-center justify-center gap-md">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
    </Container>
  );
}
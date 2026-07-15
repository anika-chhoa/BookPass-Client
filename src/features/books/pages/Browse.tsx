import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { BookCard } from "@/features/books/components/BookCard";
import { apiListBooks, apiListCategories } from "@/features/books/api/books.api";
import type { Book } from "@/features/books/types/book";
import { GRID_BREAKPOINTS, GRID_GAP } from "@/constants/theme";
import { Button } from "@/components/ui/Button";

const inputClass = "rounded-xl border border-outline-variant px-md py-sm font-body-md";
const PAGE_SIZE = 8;

const RATING_OPTIONS = [
  { label: "Any Rating", value: "" },
  { label: "3★ & up", value: "3" },
  { label: "4★ & up", value: "4" },
  { label: "4.5★ & up", value: "4.5" },
];

const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviewed", value: "mostReviewed" },
];

export default function Browse() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const minRating = searchParams.get("minRating") ?? "";
  const sort = (searchParams.get("sort") as "newest" | "rating" | "mostReviewed") ?? "newest";
  const page = Number(searchParams.get("page") ?? "1");

  const [books, setBooks] = useState<Book[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(search);
  const [error, setError] = useState("");

  useEffect(() => {
    apiListCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setBooks(null);
    apiListBooks({
      search: search || undefined,
      category: category || undefined,
      minRating: minRating ? Number(minRating) : undefined,
      sort,
      page,
      limit: PAGE_SIZE,
    })
      .then((res) => {
        setBooks(res.items);
        setTotalPages(res.totalPages);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load books"));
  }, [search, category, minRating, sort, page]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchInput);
  };

  const handlePageChange = (newPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(newPage));
    setSearchParams(next);
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = search || category || minRating || sort !== "newest";

  return (
    <Container className="py-xxl min-h-screen">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Browse Books</h1>

      <form onSubmit={handleSearchSubmit} className="relative mb-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input
          placeholder="Search by title or writer..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={inputClass + " w-full pl-10"}
        />
      </form>

      <div className="flex flex-wrap items-center gap-md mb-lg">
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className={inputClass}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(e) => updateParam("minRating", e.target.value)}
          className={inputClass}
        >
          {RATING_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className={inputClass}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button
            onClick={handleReset}
            className="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant hover:text-error transition-colors"
          >
            <X className="w-4 h-4" /> Reset Filters
          </Button>
        )}
      </div>

      {error && <p className="text-error font-label-sm text-label-sm mb-md">{error}</p>}

      <div className={`grid ${GRID_BREAKPOINTS.browseBooks} ${GRID_GAP} mb-lg`}>
        {!books
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
          : books.length === 0
          ? <p className="col-span-full text-on-surface-variant font-body-md">No books found matching your filters.</p>
          : books.map((book) => <BookCard key={book.id} book={book} onViewDetails={(id) => navigate(`/books/${id}`)} />)}
      </div>

      {books && books.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </Container>
  );
}
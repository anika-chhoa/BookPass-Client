import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BookCard } from "@/features/books/components/BookCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import type { Book } from "@/features/books/types/book";

export function FeaturedBooksSection({ books, loading }: { books: Book[]; loading: boolean }) {
  const navigate = useNavigate();
  if (!loading && books.length === 0) return null;

  return (
    <section className="py-xxl max-w-[1280px] mx-auto px-lg">
      <div className="flex justify-between items-end mb-xl">
        <div>
          <span className="text-secondary font-label-md tracking-[0.2em] uppercase mb-xs block">Curated Selection</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Featured Titles</h2>
        </div>
        <Link to="/books" className="text-primary font-label-md hover:underline">View All →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : books.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <BookCard book={book} onViewDetails={(id) => navigate(`/books/${id}`)} />
              </motion.div>
            ))}
      </div>
    </section>
  );
}
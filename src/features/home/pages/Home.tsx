import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BookCard } from "@/features/books/components/BookCard";
import { RatingStars } from "@/components/ui/RatingStars";
import { apiListBooks, apiListCategories } from "@/features/books/api/books.api";
import { apiGetPublicStats, type PublicStats } from "@/features/home/api/home.api";
import { apiGetFeaturedReviews, type FeaturedReview } from "@/features/reviews/api/featuredReviews.api";
import type { Book } from "@/features/books/types/book";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [reviews, setReviews] = useState<FeaturedReview[]>([]);

  useEffect(() => {
    apiListBooks({ sort: "rating", limit: 4 }).then((res) => setFeaturedBooks(res.items)).catch(() => {});
    apiListCategories().then(setCategories).catch(() => {});
    apiGetPublicStats().then(setStats).catch(() => {});
    apiGetFeaturedReviews(3).then(setReviews).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <header className="relative h-[614px] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600')" }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to bottom, rgba(32,78,43,0.9), rgba(25,28,25,0.75))" }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="relative z-20 text-center px-margin-mobile max-w-4xl mx-auto"
        >
          <h1 className="font-headline-lg text-headline-lg md:text-[56px] md:leading-[64px] font-bold text-white mb-lg">
            Your Next Great Adventure Awaits
          </h1>
          <p className="text-white/90 font-body-lg mb-xl max-w-2xl mx-auto">
            Access thousands of titles, from timeless classics to modern bestsellers, in our curated library.
          </p>
          <Link to="/books">
            <Button variant="secondary" size="lg">Browse the Catalog</Button>
          </Link>
        </motion.div>
      </header>

      <section className="py-xl bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-lg">
          <div className="grid grid-cols-3 gap-xl text-center">
            {[
              { label: "Books Available", value: stats?.totalBooks },
              { label: "Active Members", value: stats?.totalUsers },
              { label: "Reviews Written", value: stats?.totalReviews },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-xs"
              >
                <span className="font-headline-lg text-headline-lg text-primary">
                  {s.value !== undefined ? `${s.value.toLocaleString()}+` : "—"}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-xxl max-w-[1280px] mx-auto px-lg">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <span className="text-secondary font-label-md tracking-[0.2em] uppercase mb-xs block">Curated Selection</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Featured Titles</h2>
          </div>
          <Link to="/books" className="text-primary font-label-md hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
          {featuredBooks.map((book, i) => (
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

      {categories.length > 0 && (
        <section className="py-xxl bg-surface-container-high">
          <div className="max-w-[1280px] mx-auto px-lg">
            <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-xl">Browse by Category</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  onClick={() => navigate(`/books?category=${encodeURIComponent(cat)}`)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-surface p-xl rounded-xl border border-outline-variant flex flex-col items-center gap-md hover:border-primary hover:shadow-md transition-colors text-center"
                >
                  <span className="font-headline-md text-body-lg text-on-surface">{cat}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="py-xxl bg-surface">
          <div className="max-w-[1280px] mx-auto px-lg">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Reader Experiences</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">
                Real feedback from readers across our catalog.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {reviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-surface-container-low p-xl rounded-xl border border-outline-variant flex flex-col justify-between"
                >
                  <div>
                    <RatingStars rating={r.rating} reviewCount={0} />
                    <p className="italic text-on-surface my-lg line-clamp-4">"{r.comment}"</p>
                  </div>
                  <div className="flex items-center gap-md">
                    <img src={r.userAvatarUrl} alt={r.userName} className="w-12 h-12 rounded-full object-cover" />
                    <p className="font-label-md text-label-md text-on-surface">{r.userName}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
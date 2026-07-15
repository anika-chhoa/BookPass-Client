import { useEffect, useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { StatsSection } from "../components/StatsSection";
import { TopWritersSection } from "../components/TopWritersSection";
import { HowToBookSection } from "../components/HowToBookSection";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { apiListBooks, apiListCategories } from "@/features/books/api/books.api";
import { apiListWriters, type Writer } from "@/features/writers/api/writers.api";
import { apiGetPublicStats, type PublicStats } from "../api/home.api";
import { apiGetFeaturedReviews, type FeaturedReview } from "@/features/reviews/api/featuredReviews.api";
import type { Book } from "@/features/books/types/book";
import { FeaturedBooksSection } from "../components/FeaturedBooksSection";

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [reviews, setReviews] = useState<FeaturedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  Promise.all([
    apiListBooks({ sort: "rating", limit: 4 }).then((res) => setFeaturedBooks(res.items)),
    apiListCategories().then(setCategories),
    apiListWriters(4).then(setWriters),
    apiGetPublicStats().then(setStats),
    apiGetFeaturedReviews(3).then(setReviews),
  ]).catch(() => {}).finally(() => setLoading(false));
}, []);

  useEffect(() => {
    apiListBooks({ sort: "rating", limit: 4 }).then((res) => setFeaturedBooks(res.items)).catch(() => {});
    apiListCategories().then(setCategories).catch(() => {});
    apiListWriters(4).then(setWriters).catch(() => {});
    apiGetPublicStats().then(setStats).catch(() => {});
    apiGetFeaturedReviews(3).then(setReviews).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection />
      <FeaturedBooksSection books={featuredBooks} loading={loading} />
      <CategoriesSection categories={categories} />
      <StatsSection stats={stats} />
      <TopWritersSection writers={writers} />
      <HowToBookSection />
      <WhyChooseUsSection />
      <ReviewsSection reviews={reviews} />
    </div>
  );
}
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { apiListBooks, apiListCategories } from "@/features/books/api/books.api";
import { apiListWriters, type Writer } from "@/features/writers/api/writers.api";
import { apiGetFeaturedReviews, type FeaturedReview } from "@/features/reviews/api/featuredReviews.api";
import type { Book } from "@/features/books/types/book";
import { apiGetPublicStats, PublicStats } from "@/features/home/api/home.api";
import { HeroSection } from "@/features/home/components/HeroSection";
import { FeaturedBooksSection } from "@/features/home/components/FeaturedBooksSection";
import { CategoriesSection } from "@/features/home/components/CategoriesSection";
import { StatsSection } from "@/features/home/components/StatsSection";
import { TopWritersSection } from "@/features/home/components/TopWritersSection";
import { HowToBookSection } from "@/features/home/components/HowToBookSection";
import { WhyChooseUsSection } from "@/features/home/components/WhyChooseUsSection";
import { ReviewsSection } from "@/features/home/components/ReviewsSection";

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [reviews, setReviews] = useState<FeaturedReview[]>([]);

  useEffect(() => {
    apiListBooks({ sort: "rating", limit: 4 }).then((res) => setFeaturedBooks(res.items)).catch(() => {});
    apiListCategories().then(setCategories).catch(() => {});
    apiListWriters(4).then(setWriters).catch(() => {});
    apiGetPublicStats().then(setStats).catch(() => {});
    apiGetFeaturedReviews(3).then(setReviews).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <HeroSection />
      <FeaturedBooksSection books={featuredBooks} />
      <CategoriesSection categories={categories} />
      <StatsSection stats={stats} />
      <TopWritersSection writers={writers} />
      <HowToBookSection />
      <WhyChooseUsSection />
      <ReviewsSection reviews={reviews} />
      <Footer />
    </div>
  );
}
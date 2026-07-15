import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { RatingStars } from "@/components/ui/RatingStars";
import type { FeaturedReview } from "../../reviews/api/featuredReviews.api";

export function ReviewsSection({ reviews }: { reviews: FeaturedReview[] }) {
  if (reviews.length === 0) return null;

  return (
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
              className="relative bg-surface-container-low p-xl rounded-xl border border-outline-variant flex flex-col justify-between"
            >
              <Quote className="absolute -top-4 -left-4 w-9 h-9 text-secondary bg-surface rounded-full p-2 shadow-sm" strokeWidth={1.75} />
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
  );
}
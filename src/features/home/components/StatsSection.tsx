import { motion } from "framer-motion";
import { BookMarked, Users, MessageSquareQuote } from "lucide-react";
import type { PublicStats } from "../api/home.api";

export function StatsSection({ stats }: { stats: PublicStats | null }) {
  const items = [
    { label: "Books Available", value: stats?.totalBooks, icon: BookMarked },
    { label: "Active Members", value: stats?.totalUsers, icon: Users },
    { label: "Reviews Written", value: stats?.totalReviews, icon: MessageSquareQuote },
  ];

  return (
    <section className="py-xxl bg-primary text-white">
      <div className="max-w-[1280px] mx-auto px-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-xl text-center">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-sm"
            >
              <s.icon className="w-8 h-8 text-secondary" strokeWidth={1.75} />
              <span className="font-headline-lg text-headline-lg">
                {s.value !== undefined ? `${s.value.toLocaleString()}+` : "—"}
              </span>
              <span className="font-label-md text-label-md text-white/75 tracking-wider uppercase">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
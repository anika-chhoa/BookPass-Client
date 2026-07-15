import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, FlaskConical, Landmark, UserSearch, Sparkles,
  Heart, Rocket, Ghost, Feather, Library,
} from "lucide-react";

const ICON_MAP: Record<string, typeof BookOpen> = {
  fiction: BookOpen,
  science: FlaskConical,
  history: Landmark,
  biography: UserSearch,
  fantasy: Sparkles,
  romance: Heart,
  "sci-fi": Rocket,
  horror: Ghost,
  poetry: Feather,
};

function iconFor(category: string) {
  return ICON_MAP[category.toLowerCase()] ?? Library;
}

export function CategoriesSection({ categories }: { categories: string[] }) {
  const navigate = useNavigate();
  const topFour = categories.slice(0, 4);
  if (categories.length === 0) return null;

  return (
    <section className="py-xxl bg-surface-container-high">
      <div className="max-w-[1280px] mx-auto px-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-xl">Browse by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg">
          {topFour.map((cat, i) => {
            const Icon = iconFor(cat);
            return (
              <motion.button
                key={cat}
                onClick={() => navigate(`/books?category=${encodeURIComponent(cat)}`)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-surface p-xl rounded-xl border border-outline-variant flex flex-col items-center gap-md hover:border-primary hover:shadow-md transition-colors text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
                </div>
                <span className="font-headline-md text-body-lg text-on-surface">{cat}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
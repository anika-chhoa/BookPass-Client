import { motion } from "framer-motion";
import type { Writer } from "@/features/writers/api/writers.api";

export function TopWritersSection({ writers }: { writers: Writer[] }) {
  if (writers.length === 0) return null;

  return (
    <section className="py-xxl bg-surface-container-high">
      <div className="max-w-[1280px] mx-auto px-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-xl">Meet the Writers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg">
          {writers.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-surface p-xl rounded-xl border border-outline-variant flex flex-col items-center gap-md text-center hover:border-primary hover:shadow-md transition-colors group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                <img src={w.photoUrl} alt={w.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-headline-md text-body-lg text-on-surface">{w.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
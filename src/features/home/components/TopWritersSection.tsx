import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Writer } from "@/features/writers/api/writers.api";

export function TopWritersSection({ writers }: { writers: Writer[] }) {
  const navigate = useNavigate();
  if (writers.length === 0) return null;

  const handleSelect = (writer: Writer) => {
    navigate(`/books?search=${encodeURIComponent(writer.name)}`);
  };

  return (
    <section className="py-xxl bg-surface-container-high">
      <div className="max-w-[1280px] mx-auto px-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-xl">Meet the Writers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg">
          {writers.map((w, i) => (
            <motion.button
              key={w.id}
              onClick={() => handleSelect(w)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-surface p-xl rounded-xl border border-outline-variant flex flex-col items-center gap-md text-center hover:border-primary hover:shadow-md transition-colors group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                <img src={w.photoUrl} alt={w.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-headline-md text-body-lg text-on-surface">{w.name}</h4>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
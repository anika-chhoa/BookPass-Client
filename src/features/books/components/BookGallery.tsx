import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function BookGallery({ coverUrl, images, title }: { coverUrl: string; images: string[]; title: string }) {
  const allImages = [coverUrl, ...images];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-sm">
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low">
        <AnimatePresence mode="wait">
          <motion.img
            key={allImages[activeIndex]}
            src={allImages[activeIndex]}
            alt={`${title} — image ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-sm">
          {allImages.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "aspect-[3/4] rounded-lg overflow-hidden border-2 transition-colors",
                i === activeIndex ? "border-primary" : "border-transparent hover:border-outline-variant"
              )}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
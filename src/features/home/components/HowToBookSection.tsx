import { motion } from "framer-motion";
import { CreditCard, BookMarked, Sparkles } from "lucide-react";

const STEPS = [
  { icon: CreditCard, title: "Subscribe", description: "Choose a membership plan that fits your reading habits, from free to premium." },
  { icon: BookMarked, title: "Select", description: "Browse our catalog and reserve titles from your personal shelf in seconds." },
  { icon: Sparkles, title: "Read", description: "Pick up your book and dive in — track due dates right from your dashboard." },
];

export function HowToBookSection() {
  return (
    <section className="py-xxl max-w-[1280px] mx-auto px-lg">
      <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-xl">
        Start Reading in 3 Simple Steps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="text-center flex flex-col items-center gap-md"
          >
            <div className="w-20 h-20 rounded-xl border-2 border-dashed border-primary/40 flex items-center justify-center">
              <step.icon className="w-8 h-8 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">{step.title}</h3>
            <p className="text-on-surface-variant max-w-[280px]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
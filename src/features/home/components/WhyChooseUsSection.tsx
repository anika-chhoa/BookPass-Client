import { motion } from "framer-motion";
import { Library, Clock, ShieldCheck, Sparkles } from "lucide-react";

const REASONS = [
  { icon: Library, title: "Vast Catalog", description: "Thousands of titles across every genre, curated and growing every week." },
  { icon: Clock, title: "Flexible Loans", description: "Borrowing periods that scale with your plan — no rigid due dates." },
  { icon: ShieldCheck, title: "Reliable & Secure", description: "Your data and borrowing history are protected, always in your control." },
  { icon: Sparkles, title: "Built for Readers", description: "A clean, distraction-free experience designed around how you actually read." },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-xxl bg-surface-container-high">
      <div className="max-w-[1280px] mx-auto px-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-xl">Why Choose OpenShelf</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface p-xl rounded-xl border border-outline-variant flex flex-col items-center text-center gap-md"
            >
              <r.icon className="w-8 h-8 text-primary" strokeWidth={1.75} />
              <h3 className="font-headline-md text-body-lg text-on-surface">{r.title}</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
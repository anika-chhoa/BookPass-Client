import { motion } from "framer-motion";
import { Library, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-surface pt-32 pb-xxl max-w-3xl mx-auto px-lg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="text-secondary font-label-md tracking-[0.2em] uppercase mb-xs block text-center">Our Story</span>
        <h1 className="font-headline-lg text-headline-lg text-primary text-center mb-lg">About OpenShelf</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl text-center">
          OpenShelf was built on a simple belief: access to great books shouldn't be complicated.
          We're a digital library platform that connects readers with a growing catalog of titles,
          wrapped in a fast, modern experience that gets out of your way.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg my-xxl">
        {[
          { icon: Library, title: "Our Mission", text: "To make borrowing books as effortless as streaming a show — no lines, no friction." },
          { icon: Users, title: "Our Community", text: "Built for readers of every kind, from casual browsers to voracious bookworms." },
          { icon: Heart, title: "Our Promise", text: "A clean, honest platform — your data stays yours, your reading habits stay private." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-surface-container-low p-xl rounded-xl border border-outline-variant text-center flex flex-col items-center gap-md"
          >
            <item.icon className="w-8 h-8 text-primary" strokeWidth={1.75} />
            <h3 className="font-headline-md text-body-lg text-on-surface">{item.title}</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-white rounded-xl p-xl text-center"
      >
        <h2 className="font-headline-md text-headline-md mb-sm">Growing Every Day</h2>
        <p className="font-body-md text-white/85">
          Our catalog expands weekly as we add new titles across every genre — from timeless
          classics to the latest releases. This is just the beginning.
        </p>
      </motion.div>
    </div>
  );
}
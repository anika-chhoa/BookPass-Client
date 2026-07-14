import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/books?search=${encodeURIComponent(query.trim())}` : "/books");
  };

  return (
    <header className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600')" }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(32,78,43,0.9), rgba(25,28,25,0.75))" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center px-margin-mobile max-w-4xl mx-auto"
      >
        <h1 className="font-headline-lg text-headline-lg md:text-[56px] md:leading-[64px] font-bold text-white mb-lg">
          Your Next Great Adventure Awaits
        </h1>
        <p className="text-white/90 font-body-lg mb-xl max-w-2xl mx-auto">
          Access thousands of titles, from timeless classics to modern bestsellers, in our curated library.
        </p>
        <form onSubmit={handleSearch} className="flex items-center max-w-xl mx-auto relative mb-lg">
          <Search className="absolute left-4 w-5 h-5 text-outline" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or category…"
            className="w-full pl-12 pr-4 py-4 rounded-full border-none focus:ring-2 focus:ring-primary bg-white text-on-surface font-body-md shadow-lg"
          />
          <Button type="submit" variant="secondary" className="absolute right-2" size="sm">
            Search
          </Button>
        </form>
        <a href="/books">
          <Button variant="outline" className="!text-white !border-white hover:!bg-white/10">
            Browse the Catalog
          </Button>
        </a>
      </motion.div>
    </header>
  );
}
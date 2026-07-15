import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Slide {
  image: string;
  eyebrow: string;
  headline: string;
  subhead: string;
}

const SLIDES: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&q=80",
    eyebrow: "50,000+ Titles",
    headline: "Your Next Great Read Is Waiting",
    subhead:
      "From debut novels to timeless classics, explore a collection curated for every kind of reader.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80",
    eyebrow: "New This Month",
    headline: "Discover Something Unexpected",
    subhead:
      "Wander the stacks — award-winning fiction, deep research, and everything in between.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80",
    eyebrow: "Free to Join",
    headline: "Turn the Page on Your Next Chapter",
    subhead:
      "Borrow, renew, and reserve online. Your library card unlocks all of it.",
  },
];

const AUTOPLAY_MS = 6000;

export function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(
      query.trim()
        ? `/books?search=${encodeURIComponent(query.trim())}`
        : "/books",
    );
  };

  const goTo = (index: number) => setActive(index);
  const goPrev = () =>
    setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setActive((i) => (i + 1) % SLIDES.length);

  const slide = SLIDES[active];

  return (
    <header
      className="relative h-[70vh] min-h-[560px] flex items-center justify-center overflow-hidden pt-28 pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            scale: { duration: AUTOPLAY_MS / 1000 + 1, ease: "linear" },
          }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slide.image}')` }}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(32,78,43,0.9), rgba(25,28,25,0.75))",
        }}
      />

      {/* Slide arrows */}
      <button
        aria-label="Previous slide"
        onClick={goPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next slide"
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-20 text-center px-margin-mobile max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block text-white/80 font-body-md tracking-[0.2em] uppercase text-xs md:text-sm mb-md">
              {slide.eyebrow}
            </span>
            <h1 className="font-headline-lg text-headline-lg md:text-[56px] md:leading-[64px] font-bold text-white mb-lg">
              {slide.headline}
            </h1>
            <p className="text-white/90 font-body-lg mb-xl max-w-2xl mx-auto">
              {slide.subhead}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Search — unchanged behavior */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center max-w-xl mx-auto relative mb-lg"
        >
          <Search className="absolute left-4 w-5 h-5 text-outline" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="w-full pl-12 pr-28 py-4 rounded-full border-none focus:ring-2 focus:ring-primary bg-white text-on-surface font-body-md shadow-lg transition-shadow focus:shadow-xl"
          />
          <Button
            type="submit"
            variant="secondary"
            className="absolute right-2"
            size="sm"
          >
            Search
          </Button>
        </motion.form>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col items-center gap-sm"
        >
          <Link to="/books" className="group relative inline-block">
            <Button
              variant="secondary"
              size="lg"
              className="relative overflow-hidden !px-8 shadow-[0_0_0_0_rgba(255,255,255,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore the Books
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {/* shimmer sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </Button>
          </Link>

          <p className="text-white/60 font-body-sm text-xs tracking-wide">
            Free to join · No late fees · 24/7 online access
          </p>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="relative h-1.5 rounded-full overflow-hidden bg-white/30 transition-all duration-300"
            style={{ width: i === active ? 32 : 8 }}
          >
            {i === active && !isPaused && !prefersReducedMotion && (
              <motion.span
                key={`progress-${active}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-white"
              />
            )}
            {i === active && (isPaused || prefersReducedMotion) && (
              <span className="absolute inset-0 bg-white" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
}

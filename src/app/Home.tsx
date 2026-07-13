import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { BookCard } from "@/features/books/components/BookCard";
import { TYPE } from "@/constants/theme";
import type { Book } from "@/features/books/types/book";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

const sampleBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    writer: "F. Scott Fitzgerald",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    category: "Fiction",
    description:
      "A tale of wealth, love, and disillusionment in 1920s New York, told through the eyes of Nick Carraway.",
    pages: 180,
    publishedDate: "1925-04-10",
    rating: 4.5,
    reviewCount: 128,
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: "2",
    title: "Atomic Habits",
    writer: "James Clear",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    category: "Productivity",
    description:
      "A practical guide to building good habits and breaking bad ones, one small change at a time.",
    pages: 320,
    publishedDate: "2018-10-16",
    rating: 4.8,
    reviewCount: 342,
    totalCopies: 8,
    availableCopies: 6,
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-surface">
      <Container className="py-xxl">
        <div className="flex justify-end gap-md mb-lg">
          {user ? (
            <Link to="/account">
              <Button variant="outline" size="sm">My Account</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        <h1 className={TYPE.h1 + " text-primary mb-sm"}>Phase 0 — Design System Check</h1>
        <p className={TYPE.bodyMd + " text-on-surface-variant mb-xl"}>
          BookCard, Button, and Skeleton primitives rendered with the locked token set.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-xl">
          <BookCard book={sampleBooks[0]} />
          <BookCard book={sampleBooks[1]} />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="flex flex-wrap gap-md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isLoading loadingText="Booking...">Book Now</Button>
        </div>
      </Container>
    </main>
  );
}
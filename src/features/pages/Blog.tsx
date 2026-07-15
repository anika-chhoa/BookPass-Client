import { BookOpen } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-lg pt-32 pb-xxl">
      <BookOpen className="w-12 h-12 text-primary mb-lg" strokeWidth={1.5} />
      <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">The OpenShelf Blog</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
        We're working on reading guides, author spotlights, and platform updates. Check back soon.
      </p>
    </div>
  );
}
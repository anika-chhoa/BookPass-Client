import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "../components/ImageUpload";
import { apiCreateBook } from "@/features/books/api/books.api";

const inputClass = "rounded-xl border border-outline-variant px-md py-sm font-body-md w-full";

export default function AddItem() {
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!coverUrl) { setError("Please upload a cover image"); return; }

    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await apiCreateBook({
        title: form.get("title") as string,
        writer: form.get("writer") as string,
        category: form.get("category") as string,
        shortDescription: form.get("shortDescription") as string,
        fullDescription: form.get("fullDescription") as string,
        coverUrl,
        price: Number(form.get("price")),
        pages: Number(form.get("pages")),
        publishedDate: form.get("publishedDate") as string,
        totalCopies: Number(form.get("totalCopies")),
      });
      navigate("/admin/manage-books");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-xxl max-w-2xl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Add Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
        <ImageUpload value={coverUrl} onChange={setCoverUrl} />
        <input name="title" required placeholder="Title" className={inputClass} />
        <input name="writer" required placeholder="Writer" className={inputClass} />
        <input name="category" required placeholder="Category (e.g. Fiction)" className={inputClass} />
        <textarea name="shortDescription" required maxLength={300} placeholder="Short description (max 300 chars)" className={inputClass} rows={2} />
        <textarea name="fullDescription" required placeholder="Full description" className={inputClass} rows={5} />
        <div className="grid grid-cols-2 gap-md">
          <input name="price" type="number" min="0" step="0.01" required placeholder="Price ($)" className={inputClass} />
          <input name="pages" type="number" min="1" required placeholder="Pages" className={inputClass} />
          <input name="publishedDate" type="date" required className={inputClass} />
          <input name="totalCopies" type="number" min="1" required placeholder="Total copies" className={inputClass} />
        </div>
        <Button type="submit" isLoading={loading} loadingText="Adding...">Add Book</Button>
      </form>
    </Container>
  );
}
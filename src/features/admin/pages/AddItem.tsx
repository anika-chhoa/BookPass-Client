import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
      const book = await apiCreateBook({
        title: form.get("title") as string,
        writer: form.get("writer") as string,
        category: form.get("category") as string,
        description: form.get("description") as string,
        coverUrl,
        pages: Number(form.get("pages")),
        publishedDate: form.get("publishedDate") as string,
        totalCopies: Number(form.get("totalCopies")),
      });
      toast.success(`"${book.title}" was added to the catalog`);
      navigate("/admin/manage-books");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create book";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-lg">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary">Add Book</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Add a new title to the catalog.
        </p>
      </div>

      <Card hoverable={false} className="max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
          <ImageUpload value={coverUrl} onChange={setCoverUrl} />
          <input name="title" required placeholder="Title" className={inputClass} />
          <input name="writer" required placeholder="Writer" className={inputClass} />
          <input name="category" required placeholder="Category (e.g. Fiction)" className={inputClass} />
          <textarea name="description" required placeholder="Description" className={inputClass} rows={5} />
          <div className="grid grid-cols-2 gap-md">
            <input name="pages" type="number" min="1" required placeholder="Pages" className={inputClass} />
            <input name="publishedDate" type="date" required className={inputClass} />
            <input name="totalCopies" type="number" min="1" required placeholder="Total copies" className={inputClass} />
          </div>
          <Button type="submit" isLoading={loading} loadingText="Adding...">Add Book</Button>
        </form>
      </Card>
    </div>
  );
}
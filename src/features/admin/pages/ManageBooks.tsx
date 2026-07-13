import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { apiListBooks, apiDeleteBook } from "@/features/books/api/books.api";
import type { Book } from "@/features/books/types/book";

export default function ManageBooks() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    apiListBooks({ limit: 50 }).then((res) => setBooks(res.items)).catch((err) => setError(err instanceof Error ? err.message : "Failed to load books"));
  };
  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this book? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await apiDeleteBook(id);
      setBooks((prev) => prev?.filter((b) => b.id !== id) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Container className="py-xxl">
      <div className="flex items-center justify-between mb-lg">
        <h1 className="font-headline-lg text-headline-lg text-primary">Manage Books</h1>
        <Link to="/admin/add-item"><Button size="sm">Add Book</Button></Link>
      </div>
      {error && <p className="text-error font-label-sm text-label-sm mb-md">{error}</p>}
      {!books ? (
        <SkeletonTable rows={6} columns={5} />
      ) : books.length === 0 ? (
        <p className="text-on-surface-variant font-body-md">No books yet. Add your first one.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline-variant">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr className="font-label-sm text-label-sm text-on-surface-variant">
                <th className="p-md">Cover</th><th className="p-md">Title</th><th className="p-md">Category</th><th className="p-md">Copies</th><th className="p-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-t border-outline-variant font-body-md text-body-md">
                  <td className="p-md"><img src={book.coverUrl} alt={book.title} className="w-10 aspect-[3/4] object-cover rounded" /></td>
                  <td className="p-md">{book.title}</td>
                  <td className="p-md">{book.category}</td>
                  <td className="p-md">{book.availableCopies}/{book.totalCopies}</td>
                  <td className="p-md">
                    <div className="flex gap-sm">
                      <Link to={`/books/${book.id}`}><Button variant="ghost" size="sm">View</Button></Link>
                      <Button variant="outline" size="sm" isLoading={deletingId === book.id} onClick={() => handleDelete(book.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { apiListBooks, apiDeleteBook } from "@/features/books/api/books.api";
import type { Book } from "@/features/books/types/book";

const PAGE_SIZE = 10;

export default function ManageBooks() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [targetBook, setTargetBook] = useState<Book | null>(null);

  const load = () => {
    apiListBooks({ page, limit: PAGE_SIZE })
      .then((res) => {
        setBooks(res.items);
        setTotalPages(res.totalPages);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load books"));
  };
  useEffect(load, [page]);

  const handleConfirmDelete = async () => {
    if (!targetBook) return;
    setDeletingId(targetBook.id);
    try {
      await apiDeleteBook(targetBook.id);
      setBooks((prev) => prev?.filter((b) => b.id !== targetBook.id) ?? null);
      toast.success(`"${targetBook.title}" was deleted`);
      setTargetBook(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete book");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Manage Books</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
            View, and remove books from the catalog.
          </p>
        </div>
        <Link to="/admin/add-item"><Button size="sm">Add Book</Button></Link>
      </div>

      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!books ? (
        <Card hoverable={false} padded={false}>
          <SkeletonTable rows={6} columns={5} />
        </Card>
      ) : books.length === 0 ? (
        <Card hoverable={false} className="items-center text-center py-xxl">
          <p className="text-on-surface-variant font-body-md">No books yet. Add your first one.</p>
        </Card>
      ) : (
        <>
          <Card hoverable={false} padded={false} className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Cover</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Title</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Category</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Copies</th>
                    <th className="text-right font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border-b border-outline-variant last:border-0">
                      <td className="px-md py-sm">
                        <img src={book.coverUrl} alt={book.title} className="w-10 aspect-[3/4] object-cover rounded-md" />
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-body-md text-body-md text-on-surface line-clamp-1">{book.title}</span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{book.category}</span>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{book.totalCopies}</span>
                      </td>
                      <td className="px-md py-sm text-right">
                        <div className="flex gap-sm justify-end">
                          <Link to={`/books/${book.id}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            isLoading={deletingId === book.id}
                            onClick={() => setTargetBook(book)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <ConfirmModal
        open={targetBook !== null}
        title="Delete this book?"
        description={targetBook ? `"${targetBook.title}" will be permanently removed. This cannot be undone.` : ""}
        confirmLabel="Yes, delete"
        tone="secondary"
        isLoading={deletingId === targetBook?.id}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTargetBook(null)}
      />
    </div>
  );
}
import { useState, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { apiUploadImage } from "@/features/books/api/books.api";

const MAX_IMAGES = 6;

export function MultiImageUpload({ value, onChange }: { value: string[]; onChange: (urls: string[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (value.length >= MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} additional images allowed`);
      return;
    }
    setError("");
    setUploading(true);
    try {
      const { url } = await apiUploadImage(file);
      onChange([...value, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-sm">
      <label className="font-label-sm text-label-sm text-on-surface-variant">
        Additional Images ({value.length}/{MAX_IMAGES})
      </label>

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-sm">
          {value.map((url, i) => (
            <div key={url} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-outline-variant group">
              <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length < MAX_IMAGES && (
        <div className="flex items-center gap-sm">
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="font-body-md text-body-md" />
          {uploading && <Spinner size="sm" />}
        </div>
      )}
      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
    </div>
  );
}
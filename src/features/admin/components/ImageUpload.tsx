import { useState, type ChangeEvent } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { apiUploadImage } from "../../books/api/books.api";

export function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await apiUploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-sm">
      <label className="font-label-sm text-label-sm text-on-surface-variant">Cover Image</label>
      {value && <img src={value} alt="Cover preview" className="w-32 aspect-[3/4] object-cover rounded-xl border border-outline-variant" />}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="font-body-md text-body-md" />
      {uploading && <span className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm"><Spinner size="sm" /> Uploading...</span>}
      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
    </div>
  );
}
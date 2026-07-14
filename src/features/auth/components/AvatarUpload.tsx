import { useState, type ChangeEvent } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { apiUploadAvatar } from "../api/auth.api";

const PLACEHOLDER = "https://placehold.co/200x200/204e2b/ffffff?text=User";

export function AvatarUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await apiUploadAvatar(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-sm">
      <label className="font-label-sm text-label-sm text-on-surface-variant self-start">Profile Picture</label>
      <div className="relative">
        <img
          src={value || PLACEHOLDER}
          alt="Avatar preview"
          className="w-24 h-24 object-cover rounded-full border-2 border-outline-variant"
        />
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <Spinner size="sm" />
          </div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="font-body-md text-body-md" />
      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
    </div>
  );
}
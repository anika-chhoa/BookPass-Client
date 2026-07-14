import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { apiListWriters, apiCreateWriter, apiUploadWriterPhoto, type Writer } from "@/features/writers/api/writers.api";

const inputClass = "rounded-xl border border-outline-variant px-md py-sm font-body-md w-full";

export function WriterPicker({ value, onChange }: { value: string; onChange: (writerId: string) => void }) {
  const [writers, setWriters] = useState<Writer[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    apiListWriters().then(setWriters).catch((err) => setError(err instanceof Error ? err.message : "Failed to load writers"));
  };
  useEffect(load, []);

  const handlePhotoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await apiUploadWriterPhoto(file);
      setNewPhotoUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateWriter = async () => {
    if (!newName || !newPhotoUrl) {
      setError("Writer name and photo are both required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const writer = await apiCreateWriter(newName, newPhotoUrl);
      setWriters((prev) => [...(prev ?? []), writer]);
      onChange(writer.id);
      setCreating(false);
      setNewName("");
      setNewPhotoUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create writer");
    } finally {
      setSaving(false);
    }
  };

  if (!writers) {
    return <p className="font-label-sm text-label-sm text-on-surface-variant">Loading writers...</p>;
  }

  return (
    <div className="flex flex-col gap-sm">
      <label className="font-label-sm text-label-sm text-on-surface-variant">Writer</label>
      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!creating ? (
        <div className="flex gap-sm items-center">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select a writer…</option>
            {writers.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
          <Button type="button" variant="outline" size="sm" onClick={() => setCreating(true)}>
            + New
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-sm p-md rounded-xl border border-outline-variant bg-surface-container-low">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Writer name"
            className={inputClass}
          />
          <div className="flex items-center gap-sm">
            {newPhotoUrl && (
              <img src={newPhotoUrl} alt="Writer preview" className="w-12 h-12 rounded-full object-cover" />
            )}
            <input type="file" accept="image/*" onChange={handlePhotoFile} disabled={uploading} className="font-body-md text-body-md" />
            {uploading && <Spinner size="sm" />}
          </div>
          <div className="flex gap-sm">
            <Button type="button" size="sm" isLoading={saving} loadingText="Saving..." onClick={handleCreateWriter}>
              Save Writer
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setCreating(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
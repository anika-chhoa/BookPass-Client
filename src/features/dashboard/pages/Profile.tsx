import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AvatarUpload } from "@/features/auth/components/AvatarUpload";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useState, type FormEvent } from "react";

function PlanBadge({ plan }: { plan: string }) {
  return (
    <span className="inline-block px-md py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm capitalize">
      {plan} plan
    </span>
  );
}

function ProfileView({ onEdit }: { onEdit: () => void }) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Card
      hoverable={false}
      className="max-w-md mx-auto items-center text-center p-16"
    >
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-28 h-28 rounded-full object-cover border-2 border-outline-variant"
      />
      <h2 className="font-headline-md text-headline-md text-on-surface mt-lg line-clamp-1">
        {user.name}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-xs line-clamp-1">
        {user.email}
      </p>
      <div className="mt-sm">
        <PlanBadge plan={user.plan} />
      </div>
      <Button
        variant="outline"
        onClick={onEdit}
        className="mt-lg w-full sm:w-auto"
      >
        Edit Profile
      </Button>
    </Card>
  );
}

function ProfileEditForm({ onDone }: { onDone: () => void }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updateUser({ name, avatarUrl });
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card hoverable={false} className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-md text-body-lg text-on-surface">
          Edit Profile
        </h2>
        <button
          type="button"
          onClick={onDone}
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface"
        >
          Cancel
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        {error && (
          <p className="text-error font-label-sm text-label-sm">{error}</p>
        )}
        <AvatarUpload value={avatarUrl} onChange={setAvatarUrl} />
        <div>
          <label className="font-label-sm text-label-sm text-on-surface-variant">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-xs rounded-xl border border-outline-variant px-md py-sm font-body-md w-full"
          />
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Email: {user?.email} (not editable)
        </p>
        <Button
          type="submit"
          isLoading={loading}
          loadingText="Saving..."
          fullWidth
        >
          Save Changes
        </Button>
      </form>
    </Card>
  );
}

export default function Profile() {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <ProfileEditForm onDone={() => setEditing(false)} />
  ) : (
    <ProfileView onEdit={() => setEditing(true)} />
  );
}

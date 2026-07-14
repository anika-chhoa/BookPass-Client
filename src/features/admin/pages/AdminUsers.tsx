import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { apiListAdminUsers, apiUpdateUserRole, type AdminUser } from "../api/admin.api";

function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`inline-block px-sm py-1 rounded-full font-label-sm text-label-sm capitalize ${
        role === "admin" ? "bg-secondary/10 text-secondary" : "bg-surface-container-high text-on-surface-variant"
      }`}
    >
      {role}
    </span>
  );
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [data, setData] = useState<Awaited<ReturnType<typeof apiListAdminUsers>> | null>(null);
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [targetUser, setTargetUser] = useState<AdminUser | null>(null);

  const load = () => {
    apiListAdminUsers(page).then(setData).catch((err) => setError(err instanceof Error ? err.message : "Failed to load users"));
  };
  useEffect(load, [page]);

  const nextRole = targetUser?.role === "admin" ? "user" : "admin";

  const handleConfirmRoleChange = async () => {
    if (!targetUser) return;
    setUpdatingId(targetUser.id);
    try {
      await apiUpdateUserRole(targetUser.id, nextRole);
      setTargetUser(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-lg">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary">All Users</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Manage registered users and their access level.
        </p>
      </div>

      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}

      {!data ? (
        <Card hoverable={false} padded={false}>
          <SkeletonTable rows={6} columns={5} />
        </Card>
      ) : (
        <>
          <Card hoverable={false} padded={false} className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">User</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Email</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Role</th>
                    <th className="text-left font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Plan</th>
                    <th className="text-right font-label-sm text-label-sm text-on-surface-variant px-md py-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((u) => (
                    <tr key={u.id} className="border-b border-outline-variant last:border-0">
                      <td className="px-md py-sm">
                        <div className="flex items-center gap-md">
                          <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <span className="font-body-md text-body-md text-on-surface line-clamp-1">
                            {u.name} {u.id === currentUser?.id && <span className="text-on-surface-variant">(You)</span>}
                          </span>
                        </div>
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{u.email}</span>
                      </td>
                      <td className="px-md py-sm">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-md py-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant capitalize">{u.plan}</span>
                      </td>
                      <td className="px-md py-sm text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={u.id === currentUser?.id}
                          isLoading={updatingId === u.id}
                          onClick={() => setTargetUser(u)}
                        >
                          {u.role === "admin" ? "Make User" : "Make Admin"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}

      <ConfirmModal
        open={targetUser !== null}
        title={`Change role to ${nextRole}?`}
        description={
          targetUser
            ? `${targetUser.name} will ${nextRole === "admin" ? "gain full admin access" : "lose admin access"} immediately.`
            : ""
        }
        confirmLabel={`Yes, make ${nextRole}`}
        tone={nextRole === "admin" ? "secondary" : "primary"}
        isLoading={updatingId === targetUser?.id}
        onConfirm={handleConfirmRoleChange}
        onCancel={() => setTargetUser(null)}
      />
    </div>
  );
}
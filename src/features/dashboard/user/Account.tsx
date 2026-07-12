import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Account() {
  const { user, logout } = useAuth();
  return (
    <Container className="py-xxl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Welcome, {user?.name}</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
        {user?.email} · {user?.plan} plan
      </p>
      <Button variant="outline" onClick={logout}>
        Log Out
      </Button>
    </Container>
  );
}
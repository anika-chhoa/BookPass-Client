import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Account() {
  const { user, logout } = useAuth();
  return (
    <Container className="py-xxl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Welcome, {user?.name}</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-lg">{user?.email} · {user?.plan} plan</p>
      <div className="flex flex-wrap gap-md">
        <Link to="/my-bookings"><Button variant="outline">My Bookings</Button></Link>
        <Link to="/favorites"><Button variant="outline">Favorites</Button></Link>
        <Button variant="ghost" onClick={logout}>Log Out</Button>
      </div>
    </Container>
  );
}
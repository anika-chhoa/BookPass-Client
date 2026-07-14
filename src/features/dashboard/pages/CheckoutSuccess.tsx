import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function CheckoutSuccess() {
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <Container className="py-xxl flex flex-col justify-center items-center text-center max-w-lg min-h-screen">
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-lg">
        <span className="text-white text-2xl">✓</span>
      </div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Payment Successful</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
        {user ? `You're now on the ${user.plan} plan. Start exploring your new borrowing limits.` : "Your plan has been updated."}
      </p>
      <div className="flex flex-wrap gap-md justify-center">
        <Link to="/"><Button variant="outline">Go to Homepage</Button></Link>
        <Link to="/books"><Button variant="primary">Browse Books</Button></Link>
      </div>
    </Container>
  );
}
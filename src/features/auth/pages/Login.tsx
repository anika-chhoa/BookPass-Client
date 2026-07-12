import { Container } from "@/components/layout/Container";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Login() {
  return (
    <Container className="py-xxl flex flex-col items-center">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Log In</h1>
      <LoginForm />
    </Container>
  );
}
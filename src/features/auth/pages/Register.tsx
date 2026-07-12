import { Container } from "@/components/layout/Container";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function Register() {
  return (
    <Container className="py-xxl flex flex-col items-center">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Create Account</h1>
      <RegisterForm />
    </Container>
  );
}
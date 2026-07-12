import { Container } from "@/components/layout/Container";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container className="py-xxl flex flex-col items-center h-screen">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Log In</h1>
      <LoginForm />
      <p className="mt-md font-body-md text-body-md text-on-surface-variant">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </Container>
  );
}
import { Container } from "@/components/layout/Container";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Container className="py-xxl flex flex-col items-center h-screen">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-lg">Create Account</h1>
      <RegisterForm />
      <p className="mt-md font-body-md text-body-md text-on-surface-variant">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </Container>
  );
}
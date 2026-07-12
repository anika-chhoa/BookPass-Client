import { Button } from "@/components/ui/Button";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DEMO_EMAIL = "demo@libro.com";
const DEMO_PASSWORD = "Demo1234!";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setDemoLoading(true);
    try {
      await login(DEMO_EMAIL, DEMO_PASSWORD);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo login failed");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-md max-w-sm w-full"
    >
      {error && (
        <p className="text-error font-label-sm text-label-sm">{error}</p>
      )}
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-xl border border-outline-variant px-md py-sm font-body-md"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-xl border border-outline-variant px-md py-sm font-body-md"
      />
      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        loadingText="Logging in..."
      >
        Log In
      </Button>
      <Button
        type="button"
        variant="outline"
        isLoading={demoLoading}
        loadingText="Signing in..."
        onClick={handleDemoLogin}
      >
        Try Demo Account
      </Button>
    </form>
  );
}

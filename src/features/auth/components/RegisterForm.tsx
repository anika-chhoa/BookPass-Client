import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md max-w-sm w-full">
      {error && <p className="text-error font-label-sm text-label-sm">{error}</p>}
      <input
        required
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-xl border border-outline-variant px-md py-sm font-body-md"
      />
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
        minLength={8}
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-xl border border-outline-variant px-md py-sm font-body-md"
      />
      <Button type="submit" isLoading={loading} loadingText="Creating account...">
        Create Account
      </Button>
      <div className="flex items-center gap-md text-on-surface-variant font-label-sm text-label-sm">
        <span className="flex-1 border-t border-outline-variant" />
        or
        <span className="flex-1 border-t border-outline-variant" />
      </div>
      <GoogleSignInButton />
    </form>
  );
}
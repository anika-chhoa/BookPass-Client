import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { AppRouter } from "./AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
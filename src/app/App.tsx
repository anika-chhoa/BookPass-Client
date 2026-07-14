import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { AppRouter } from "./AppRouter";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}
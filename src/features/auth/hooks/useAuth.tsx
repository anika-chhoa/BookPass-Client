import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiLogin, apiRegister, apiRefresh, apiLogout, apiGoogleLogin, type AuthUser } from "../api/auth.api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const googleLogin = async (idToken: string) => setUser(await apiGoogleLogin(idToken));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRefresh().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => setUser(await apiLogin(email, password));
  const register = async (name: string, email: string, password: string) => setUser(await apiRegister(name, email, password));
  const logout = async () => { await apiLogout(); setUser(null); };
  

  return <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
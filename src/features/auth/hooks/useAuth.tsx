import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiLogin, apiRegister, apiRefresh, apiLogout, apiGoogleLogin, apiUpdateProfile, type AuthUser } from "../api/auth.api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, avatarUrl?: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (updates: { name?: string; avatarUrl?: string }) => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRefresh().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => setUser(await apiLogin(email, password));
  const register = async (name: string, email: string, password: string, avatarUrl?: string) =>
    setUser(await apiRegister(name, email, password, avatarUrl));
  const googleLogin = async (idToken: string) => setUser(await apiGoogleLogin(idToken));
  const logout = async () => { await apiLogout(); setUser(null); };
  const refreshUser = async () => setUser(await apiRefresh());
  const updateUser = async (updates: { name?: string; avatarUrl?: string }) => setUser(await apiUpdateProfile(updates));

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
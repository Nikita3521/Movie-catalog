import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { id: string; email: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = "http://localhost:5000"; // потом вынесешь в .env фронта

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const me = await res.json();
        // твой бек /me может возвращать { _id, email } — подстрахуемся:
        setUser({ id: me.id ?? me._id, email: me.email });
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user); // {id,email} с бека
  };

  const register = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.message || "Register failed");
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user); // {id,email} с бека
  };

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout, register }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

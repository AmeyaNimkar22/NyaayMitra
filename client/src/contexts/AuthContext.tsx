import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * MOCK AUTHENTICATION
 * -------------------
 * This does NOT talk to a real backend yet (see project context, section 10).
 * It only simulates "being logged in" by keeping a fake user object in
 * localStorage. Later, `login`/`signup` here will be swapped for real
 * API calls to FastAPI without changing how the rest of the app uses
 * `useAuth()`.
 */

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  /** Simulates logging in. In the mock version this always succeeds if both fields are filled. */
  login: (email: string, password: string) => boolean;
  /** Simulates creating an account. */
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "nyaaymitra_mock_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) return false;
    // Mock: derive a display name from the email, e.g. "sanika@x.com" -> "Sanika"
    const namePart = email.split("@")[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    setUser({ name, email });
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password.trim()) return false;
    setUser({ name, email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

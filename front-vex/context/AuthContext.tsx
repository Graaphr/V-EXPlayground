"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

type AuthType = {
  user: any;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ GET USER
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // 🔥 interceptor sudah handle token → gak perlu headers lagi
      const res = await api.get("/api/user");

      // ⚠️ sesuaikan dengan backend kamu
      setUser(res.data.user ?? res.data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO LOAD USER
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ LOGIN
  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  // 🔥 LOGOUT (SUDAH KE API)
  const logout = async () => {
    try {
      await api.post("/api/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ HOOK
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus di dalam provider");
  return ctx;
};

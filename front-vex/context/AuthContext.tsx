"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

type AuthType = {
  user: any;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState(true);
const [initialized, setInitialized] = useState(false);
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      setInitialized(true);
      return;
    }

    try {
      const res = await api.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus di dalam provider");
  return ctx;
};

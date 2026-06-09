import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";
import { login } from "../api/client";

interface AuthState {
  user: User | null;
  tier: "normal" | "subscriber" | "owner";
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthState>({
  user: null,
  tier: "normal",
  loading: true,
  error: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    tier: "normal",
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function init() {
      try {
        const tg = (window as any).Telegram?.WebApp;
        if (!tg) {
          setState((s) => ({ ...s, loading: false, error: "No Telegram" }));
          return;
        }
        tg.ready();
        tg.expand();

        const initData = tg.initData;
        if (!initData) {
          setState((s) => ({
            ...s,
            loading: false,
            error: "No initData",
          }));
          return;
        }

        const res = await login(initData);
        if (res.ok && res.user) {
          setState({
            user: res.user,
            tier: res.tier,
            loading: false,
            error: null,
          });
        } else {
          setState((s) => ({ ...s, loading: false, error: "Auth failed" }));
        }
      } catch (e: any) {
        setState((s) => ({
          ...s,
          loading: false,
          error: e.message || "Error",
        }));
      }
    }
    init();
  }, []);

  return (
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";
import { login } from "../api/client";
import WebApp from "@twa-dev/sdk";

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
        if (!WebApp.initData) {
          setState((s) => ({
            ...s,
            loading: false,
            error: "No initData from Telegram",
          }));
          return;
        }

        WebApp.ready();
        WebApp.expand();

        const res = await login(WebApp.initData);
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
      } catch (e: unknown) {
        setState((s) => ({
          ...s,
          loading: false,
          error: e instanceof Error ? e.message : "Error",
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

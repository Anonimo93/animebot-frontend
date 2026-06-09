import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/TelegramProvider";
import type { ReactNode } from "react";

interface Props {
  minTier?: "normal" | "subscriber" | "owner";
  children: ReactNode;
}

const TIER_ORDER: Record<string, number> = {
  normal: 0,
  subscriber: 1,
  owner: 2,
};

export default function ProtectedRoute({ minTier = "normal", children }: Props) {
  const { user, tier } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (TIER_ORDER[tier] < TIER_ORDER[minTier]) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

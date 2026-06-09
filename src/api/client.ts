/// <reference types="vite/client" />
import type {
  LoginResponse,
  SearchResponse,
  SeriesDetail,
  UserStats,
  UserSeries,
  AdminStats,
  AdminSeries,
  Subscription,
} from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "";

let _userId: number | null = null;

export function setUserId(id: number) {
  _userId = id;
}

async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (_userId) {
    headers["X-User-Id"] = String(_userId);
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}

export async function login(initData: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data: LoginResponse = await res.json();
  if (data.ok && data.user) {
    setUserId(data.user.id);
  }
  return data;
}

export async function searchSeries(q: string): Promise<SearchResponse> {
  return fetchApi(`/api/series/search?q=${encodeURIComponent(q)}`);
}

export async function getSeriesDetail(slug: string): Promise<SeriesDetail> {
  return fetchApi(`/api/series/${slug}`);
}

export async function getUserStats(): Promise<UserStats> {
  return fetchApi("/api/user/stats");
}

export async function getUserSeries(): Promise<{ series: UserSeries[] }> {
  return fetchApi("/api/user/series");
}

export async function getUserSubscription(): Promise<Subscription> {
  return fetchApi("/api/user/subscription");
}

export async function getAdminStats(): Promise<AdminStats> {
  return fetchApi("/api/admin/stats");
}

export async function getAdminSeries(): Promise<{ series: AdminSeries[] }> {
  return fetchApi("/api/admin/series");
}

export async function toggleSeries(
  id: number,
  active: boolean
): Promise<{ ok: boolean }> {
  return fetchApi(`/api/admin/series/${id}/toggle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active }),
  });
}

export async function deleteSeries(
  id: number
): Promise<{ ok: boolean }> {
  return fetchApi(`/api/admin/series/${id}`, { method: "DELETE" });
}

export async function getAdminLogs(n?: number): Promise<{ logs: string }> {
  const params = n ? `?n=${n}` : "";
  return fetchApi(`/api/admin/logs${params}`);
}

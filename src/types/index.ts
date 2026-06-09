export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface LoginResponse {
  ok: boolean;
  user: User;
  tier: "normal" | "subscriber" | "owner";
}

export interface AnimeResult {
  title: string;
  slug: string;
  url: string;
  cover: string;
  source: "animeflv" | "local";
  local_id?: number;
}

export interface SearchResponse {
  results: AnimeResult[];
}

export interface SeriesDetail {
  title: string;
  slug: string;
  synopsis: string;
  genres: string[];
  cover: string;
  episodes: string[];
  score: string;
  type: string;
  status: string;
}

export interface UserStats {
  series_count: number;
  episodes: {
    total: number;
    published: number;
    pending: number;
    errors: number;
  };
  subscription: {
    active: boolean;
    plan: string | null;
    end_date: string | null;
  } | null;
}

export interface UserSeries {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  last_episode: string | null;
  main_channel_id: number | null;
  created_at: string;
}

export interface AdminStats {
  series: number;
  episodes: number;
  active_subscriptions: number;
  users: number;
  plans: number;
}

export interface AdminSeries {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  last_episode: string | null;
  owner_id: number;
  main_channel_id: number | null;
  backup_channel_id: number | null;
  created_at: string;
}

export interface Subscription {
  active: boolean;
  plan: string | null;
  plan_id: number | null;
  end_date: string | null;
  created_at: string | null;
  queue_priority: number;
}

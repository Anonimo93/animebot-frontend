import { useEffect, useState } from "react";
import { getUserStats, getUserSubscription, getUserSeries } from "../api/client";
import type { UserStats, Subscription, UserSeries } from "../types";

export default function Stats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [series, setSeries] = useState<UserSeries[]>([]);

  useEffect(() => {
    getUserStats().then(setStats).catch(() => {});
    getUserSubscription().then(setSub).catch(() => {});
    getUserSeries()
      .then((d) => setSeries(d.series))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {sub && sub.active && (
        <div className="p-4 border rounded-lg bg-green-50">
          <h3 className="font-bold text-lg">Suscripción</h3>
          <p>Plan: {sub.plan || "N/A"}</p>
          <p>Vence: {sub.end_date || "N/A"}</p>
          <p>Prioridad: {sub.queue_priority}</p>
        </div>
      )}

      {stats && (
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">Estadísticas</h3>
          <p>Series: {stats.series_count}</p>
          <p>
            Episodios: {stats.episodes.total} (
            {stats.episodes.published} pub, {stats.episodes.pending} pend,{" "}
            {stats.episodes.errors} err)
          </p>
        </div>
      )}

      {series.length > 0 && (
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">Mis Series</h3>
          <ul className="space-y-1">
            {series.map((s) => (
              <li key={s.id} className="text-sm">
                {s.active ? "🟢" : "🔴"} {s.name}
                {s.last_episode && ` — Ep. ${s.last_episode}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!stats && !sub && (
        <p className="text-center opacity-60">Cargando...</p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/client";
import type { AdminStats } from "../../types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    getAdminStats().then(setStats).catch(() => {});
  }, []);

  if (!stats) return <p className="text-center">Cargando...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Panel Admin</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Series", value: stats.series },
          { label: "Episodios", value: stats.episodes },
          { label: "Suscr. activas", value: stats.active_subscriptions },
          { label: "Usuarios", value: stats.users },
          { label: "Planes", value: stats.plans },
        ].map(({ label, value }) => (
          <div key={label} className="p-4 border rounded-lg text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm opacity-60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

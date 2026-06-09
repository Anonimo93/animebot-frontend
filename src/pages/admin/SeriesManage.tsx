import { useEffect, useState } from "react";
import {
  getAdminSeries,
  toggleSeries,
  deleteSeries,
} from "../../api/client";
import type { AdminSeries } from "../../types";

export default function SeriesManage() {
  const [series, setSeries] = useState<AdminSeries[]>([]);

  async function load() {
    try {
      const data = await getAdminSeries();
      setSeries(data.series);
    } catch {}
  }

  useEffect(() => {
    load();
  }, []);

  async function handleToggle(s: AdminSeries) {
    try {
      await toggleSeries(s.id, !s.active);
      await load();
    } catch {}
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar esta serie y todos sus episodios?")) return;
    try {
      await deleteSeries(id);
      await load();
    } catch {}
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Series</h2>
      <div className="space-y-2">
        {series.map((s) => (
          <div key={s.id} className="p-3 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-semibold">
                {s.active ? "🟢" : "🔴"} {s.name}
              </p>
              <p className="text-xs opacity-60">
                ID: {s.id} · Dueño: {s.owner_id} · Ep. {s.last_episode || "N/A"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggle(s)}
                className={`px-2 py-1 rounded text-sm ${
                  s.active ? "bg-yellow-200" : "bg-green-200"
                }`}
              >
                {s.active ? "Desactivar" : "Activar"}
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="px-2 py-1 rounded text-sm bg-red-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {series.length === 0 && (
          <p className="text-center opacity-60">Sin series</p>
        )}
      </div>
    </div>
  );
}

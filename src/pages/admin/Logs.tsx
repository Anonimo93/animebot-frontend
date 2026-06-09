import { useEffect, useState } from "react";
import { getAdminLogs } from "../../api/client";

export default function AdminLogs() {
  const [logs, setLogs] = useState("");

  useEffect(() => {
    getAdminLogs(100)
      .then((d) => setLogs(d.logs))
      .catch(() => setLogs("Error obteniendo logs"));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Logs</h2>
      <pre className="p-3 bg-gray-900 text-green-400 text-xs rounded-lg overflow-auto max-h-[70vh] whitespace-pre-wrap">
        {logs || "Cargando..."}
      </pre>
    </div>
  );
}

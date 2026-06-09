import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/TelegramProvider";

export default function Layout() {
  const { user, tier, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">AnimeBot</h1>
        {user && (
          <p className="text-sm opacity-70">
            {user.first_name} ·{" "}
            {tier === "owner"
              ? "Owner"
              : tier === "subscriber"
              ? "Suscriptor"
              : "Usuario"}
          </p>
        )}
        <nav className="flex gap-3 mt-3 flex-wrap">
          <Link
            to="/"
            className={`px-3 py-1 rounded ${
              location.pathname === "/"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Buscar
          </Link>
          {tier !== "normal" && (
            <Link
              to="/stats"
              className={`px-3 py-1 rounded ${
                location.pathname === "/stats"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Stats
            </Link>
          )}
          {tier === "owner" && (
            <>
              <Link
                to="/admin"
                className={`px-3 py-1 rounded ${
                  location.pathname === "/admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Admin
              </Link>
              <Link
                to="/admin/series"
                className={`px-3 py-1 rounded ${
                  location.pathname === "/admin/series"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Series
              </Link>
              <Link
                to="/admin/logs"
                className={`px-3 py-1 rounded ${
                  location.pathname === "/admin/logs"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Logs
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

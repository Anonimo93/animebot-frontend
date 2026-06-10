import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/TelegramProvider";

export default function Layout() {
  const { user, tier, loading, error } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-[var(--tg-theme-text-color)]">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{backgroundColor: 'var(--tg-theme-destructive-bg-color, #fee)', color: 'var(--tg-theme-destructive-text-color, #c00)', border: '1px solid var(--tg-theme-section-separator-color, #fcc)'}}>
          {error}
        </div>
      )}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">AnimeBot</h1>
        {user && (
          <p className="text-sm text-[var(--tg-theme-hint-color)]">
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
                ? "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                : "bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
            }`}
          >
            Buscar
          </Link>
          {tier !== "normal" && (
            <Link
              to="/stats"
              className={`px-3 py-1 rounded ${
                location.pathname === "/stats"
                  ? "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                  : "bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
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
                    ? "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                    : "bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
                }`}
              >
                Admin
              </Link>
              <Link
                to="/admin/series"
                className={`px-3 py-1 rounded ${
                  location.pathname === "/admin/series"
                    ? "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                    : "bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
                }`}
              >
                Series
              </Link>
              <Link
                to="/admin/logs"
                className={`px-3 py-1 rounded ${
                  location.pathname === "/admin/logs"
                    ? "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                    : "bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
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

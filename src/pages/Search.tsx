import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { searchSeries } from "../api/client";
import type { AnimeResult } from "../types";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setLoading(true);
    try {
      const data = await searchSeries(query.trim());
      setResults(data.results);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar anime..."
          className="w-full p-3 border rounded-lg text-lg bg-[var(--tg-theme-bg-color)] text-[var(--tg-theme-text-color)]"
          minLength={2}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      <div className="space-y-3">
        {results.map((r) => (
          <Link
            key={r.slug}
            to={`/series/${r.slug}`}
            className="block p-3 border rounded-lg hover:bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
          >
            <div className="flex gap-3">
              {r.cover && (
                <img
                  src={r.cover}
                  alt=""
                  className="w-12 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">
                  {r.source === "local" ? "En el bot" : "AnimeFlV"}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {!loading && query && results.length === 0 && (
          <p className="text-center text-[var(--tg-theme-hint-color)]">Sin resultados</p>
        )}
      </div>
    </div>
  );
}

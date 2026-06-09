import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeriesDetail } from "../api/client";

export default function SeriesDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [series, setSeries] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getSeriesDetail(slug)
      .then((d: any) => setSeries(d))
      .catch(() => setSeries(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (!series) return <p className="text-center">Serie no encontrada</p>;

  return (
    <div>
      {series.cover && (
        <img
          src={series.cover}
          alt={series.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{series.title}</h2>
      {series.synopsis && (
        <p className="mb-3 opacity-80">{series.synopsis}</p>
      )}
      {series.genres.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {series.genres.map((g: string) => (
            <span key={g} className="px-2 py-0.5 bg-gray-200 rounded text-sm">
              {g}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm">
        {series.type && <span>Tipo: {series.type} · </span>}
        {series.status && <span>Estado: {series.status}</span>}
        {series.score && <span> · ⭐ {series.score}</span>}
      </p>
      {series.episodes.length > 0 && (
        <p className="mt-2 text-sm">
          📺 {series.episodes.length} episodio(s)
          {series.episodes.length > 1 &&
            ` (${series.episodes[0]} - ${series.episodes.at(-1)})`}
        </p>
      )}
    </div>
  );
}

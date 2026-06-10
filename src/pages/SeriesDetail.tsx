import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeriesDetail } from "../api/client";
import { useAuth } from "../auth/TelegramProvider";
import WebApp from "@twa-dev/sdk";
import type { SeriesDetail as SeriesDetailType } from "../types";

function openLink(url: string) {
  WebApp.openLink(url);
}

export default function SeriesDetail() {
  const { tier } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const [series, setSeries] = useState<SeriesDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getSeriesDetail(slug)
      .then((d: SeriesDetailType) => setSeries(d))
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
        <p className="mb-3 text-sm opacity-80" style={{color: 'var(--tg-theme-text-color)'}}>{series.synopsis}</p>
      )}
      {series.genres.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {series.genres.map((g: string) => (
            <span key={g} className="px-2 py-0.5 rounded text-sm" style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-text-color)'}}>
              {g}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm" style={{color: 'var(--tg-theme-text-color)'}}>
        {series.type && <span>Tipo: {series.type} · </span>}
        {series.status && <span>Estado: {series.status}</span>}
        {series.score && <span> · ⭐ {series.score}</span>}
      </p>
      {series.episodes.length > 0 && (
        <p className="mt-2 text-sm" style={{color: 'var(--tg-theme-text-color)'}}>
          📺 {series.episodes.length} episodio(s)
          {series.episodes.length > 1 &&
            ` (${series.episodes[0]} - ${series.episodes.at(-1)})`}
        </p>
      )}
      <div className="mt-4 space-y-1 text-sm" style={{color: 'var(--tg-theme-text-color)'}}>
        {series.animeflv_url && (
          <span onClick={() => openLink(series.animeflv_url!)} className="block" style={{color: 'var(--tg-theme-link-color, #2a76d2)'}}>
            🔗 AnimeFlV
          </span>
        )}
        {series.channel_link && (
          <span onClick={() => openLink(series.channel_link!)} className="block" style={{color: 'var(--tg-theme-link-color, #2a76d2)'}}>
            📺 Canal de Telegram
          </span>
        )}
        {tier !== "normal" && (
          <span className="block text-xs" style={{color: 'var(--tg-theme-hint-color)'}}>
            🆔 Slug: <code>{series.slug}</code>
          </span>
        )}
      </div>
    </div>
  );
}

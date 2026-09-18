// src/pages/TitleDetails.jsx
// Rota dinâmica: /titulo/:mediaType/:id
// useParams lê os parâmetros da URL; useEffect busca os detalhes sempre que mudarem.

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Star } from "lucide-react";
import { getTitleDetails, posterUrl } from "../components/tmdb";
import { useWatchlist } from "../components/WatchlistContext";
import "./TitleDetails.css";

export default function TitleDetails() {
  const { mediaType, id } = useParams();
  const { addItem, removeItem, isSaved } = useWatchlist();

  const [title, setTitle] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    getTitleDetails(mediaType, id)
      .then((data) => {
        if (cancelled) return;
        setTitle(data);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [mediaType, id]);

  if (status === "loading") {
    return <p className="title-details__status">Carregando detalhes...</p>;
  }

  if (status === "error" || !title) {
    return (
      <div className="title-details__status">
        <p>Não foi possível carregar este título.</p>
        <Link to="/descobrir" className="title-details__back">
          <ArrowLeft size={16} /> Voltar para descoberta
        </Link>
      </div>
    );
  }

  const name = title.title || title.name;
  const year = (title.release_date || title.first_air_date || "").slice(0, 4);
  const saved = isSaved(title.id, mediaType);

  // runtime existe em filmes; séries usam episode_run_time (array).
  let runtime = title.runtime;
  if (!runtime && title.episode_run_time && title.episode_run_time.length > 0) {
    runtime = title.episode_run_time[0];
  }

  // Provedores de streaming disponíveis no Brasil, via flatrate (assinatura).
  let providers = [];
  if (
    title["watch/providers"] &&
    title["watch/providers"].results &&
    title["watch/providers"].results.BR &&
    title["watch/providers"].results.BR.flatrate
  ) {
    providers = title["watch/providers"].results.BR.flatrate;
  }

  let saveClass = "title-details__save";
  if (saved) {
    saveClass = "title-details__save title-details__save--active";
  }

  function handleToggleSave() {
    if (saved) {
      removeItem(title.id, mediaType);
    } else {
      addItem({ ...title, mediaType: mediaType });
    }
  }

  return (
    <article className="title-details">
      <Link to="/descobrir" className="title-details__back">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <div className="title-details__grid">
        <div className="title-details__poster">
          {title.poster_path ? (
            <img src={posterUrl(title.poster_path, "w500")} alt={"Pôster de " + name} />
          ) : (
            <div className="title-details__poster--empty">Sem imagem</div>
          )}
        </div>

        <div className="title-details__info">
          <h1>{name}</h1>

          <div className="title-details__meta">
            {year && <span>{year}</span>}
            {runtime && (
              <span>
                <Clock size={14} /> {runtime} min
              </span>
            )}
            {title.vote_average > 0 && (
              <span className="title-details__rating">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                {title.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          <div className="title-details__genres">
            {title.genres && title.genres.map((genre) => (
              <span key={genre.id} className="title-details__genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="title-details__overview">
            {title.overview || "Sinopse não disponível."}
          </p>

          <button
            type="button"
            className={saveClass}
            onClick={handleToggleSave}
          >
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            {saved ? "Salvo na minha lista" : "Salvar na minha lista"}
          </button>

          {providers.length > 0 && (
            <div className="title-details__providers">
              <h2>Onde assistir</h2>
              <div className="title-details__provider-list">
                {providers.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={posterUrl(provider.logo_path, "w92")}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="title-details__provider-logo"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

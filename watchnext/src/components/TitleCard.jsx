// src/components/TitleCard.jsx
// Cartão de título (filme ou série). Componente "burro": só recebe dados via props
// e emite eventos (onToggleSave) — quem decide o que fazer com o clique é o componente pai.

import { Link } from "react-router-dom";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { posterUrl } from "./tmdb";
import "./TitleCard.css";

export default function TitleCard({ title, mediaType, isSaved, onToggleSave }) {
  const year = (title.release_date || title.first_air_date || "").slice(0, 4);
  const name = title.title || title.name;

  return (
    <article className="title-card">
      <Link to={`/titulo/${mediaType}/${title.id}`} className="title-card__poster-link">
        {title.poster_path ? (
          <img
            className="title-card__poster"
            src={posterUrl(title.poster_path)}
            alt={`Pôster de ${name}`}
            loading="lazy"
          />
        ) : (
          <div className="title-card__poster title-card__poster--empty">Sem imagem</div>
        )}
      </Link>

      <button
        type="button"
        className="title-card__save"
        onClick={() => onToggleSave(title, mediaType)}
        aria-label={isSaved ? "Remover da minha lista" : "Salvar na minha lista"}
        title={isSaved ? "Remover da minha lista" : "Salvar na minha lista"}
      >
        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>

      <div className="title-card__info">
        <Link to={`/titulo/${mediaType}/${title.id}`} className="title-card__name">
          {name}
        </Link>
        <div className="title-card__meta">
          {year && <span>{year}</span>}
          {title.vote_average > 0 && (
            <span className="title-card__rating">
              <Star size={13} fill="currentColor" strokeWidth={0} />
              {title.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

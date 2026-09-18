// src/pages/Discover.jsx
// Página central do MVP: a pessoa escolhe humor, tempo disponível, tipo de conteúdo
// e (opcionalmente) gêneros extras. Ao enviar o formulário, disparamos a busca na TMDB.
//
// Estados React usados:
// - mediaType, moodId, timeId, genreIds: valores do formulário (useState)
// - results, status, errorMessage: resultado da busca e seu ciclo de vida (useState)
// useEffect é usado para buscar dados sempre que os "filtros aplicados" mudam.

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { discoverTitles, GENRES, MEDIA_TYPES, MOODS, TIME_RANGES } from "../components/tmdb";
import { useWatchlist } from "../components/WatchlistContext";
import TitleGrid from "../components/TitleGrid";
import "./Discover.css";

export default function Discover() {
  const { addItem, removeItem, isSaved } = useWatchlist();

  // Estado do formulário (o que a pessoa está escolhendo, ainda não aplicado).
  const [mediaType, setMediaType] = useState("movie");
  const [moodId, setMoodId] = useState(MOODS[0].id);
  const [timeId, setTimeId] = useState(TIME_RANGES[2].id);
  const [genreIds, setGenreIds] = useState([]);

  // Estado dos filtros já aplicados (o que de fato foi enviado na última busca).
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Estado da busca em si.
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  function toggleGenre(id) {
    if (genreIds.includes(id)) {
      setGenreIds(genreIds.filter((g) => g !== id));
    } else {
      setGenreIds([...genreIds, id]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const mood = MOODS.find((m) => m.id === moodId);
    const time = TIME_RANGES.find((t) => t.id === timeId);

    // Combina os gêneros do humor com os gêneros extras, sem repetir.
    const combinedGenres = [...mood.genres];
    for (let i = 0; i < genreIds.length; i++) {
      if (!combinedGenres.includes(genreIds[i])) {
        combinedGenres.push(genreIds[i]);
      }
    }

    setAppliedFilters({
      mediaType: mediaType,
      genreIds: combinedGenres,
      maxRuntime: time.maxRuntime,
    });
  }

  // Efeito colateral: sempre que os filtros aplicados mudarem, busca na API do TMDB.
  useEffect(() => {
    if (!appliedFilters) return;

    let cancelled = false;
    setStatus("loading");
    setErrorMessage("");

    discoverTitles(appliedFilters)
      .then((data) => {
        if (cancelled) return;
        setResults(data.results || []);
        setStatus("success");
      })
      .catch((error) => {
        if (cancelled) return;
        setErrorMessage(error.message);
        setStatus("error");
      });

    // Cleanup: evita atualizar o estado se a página for desmontada
    // ou uma nova busca começar antes desta terminar.
    return () => {
      cancelled = true;
    };
  }, [appliedFilters]);

  function handleToggleSave(title, titleMediaType) {
    if (isSaved(title.id, titleMediaType)) {
      removeItem(title.id, titleMediaType);
    } else {
      addItem({ ...title, mediaType: titleMediaType });
    }
  }

  return (
    <div className="discover">
      <header className="discover__header">
        <h1>Descobrir</h1>
        <p>Ajuste os filtros abaixo e encontre algo que caiba no seu momento agora.</p>
      </header>

      <form className="discover__form" onSubmit={handleSubmit}>
        <fieldset className="discover__field">
          <legend>O que você quer assistir?</legend>
          <div className="discover__pill-group">
            {MEDIA_TYPES.map((type) => {
              let pillClass = "discover__pill";
              if (mediaType === type.id) {
                pillClass = "discover__pill discover__pill--active";
              }
              return (
                <button
                  type="button"
                  key={type.id}
                  className={pillClass}
                  onClick={() => setMediaType(type.id)}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="discover__field">
          <legend>Qual o seu humor agora?</legend>
          <div className="discover__pill-group">
            {MOODS.map((mood) => {
              let pillClass = "discover__pill";
              if (moodId === mood.id) {
                pillClass = "discover__pill discover__pill--active";
              }
              return (
                <button
                  type="button"
                  key={mood.id}
                  className={pillClass}
                  onClick={() => setMoodId(mood.id)}
                >
                  {mood.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="discover__field">
          <legend>Quanto tempo você tem?</legend>
          <div className="discover__pill-group">
            {TIME_RANGES.map((time) => {
              let pillClass = "discover__pill";
              if (timeId === time.id) {
                pillClass = "discover__pill discover__pill--active";
              }

              const isDisabled = mediaType === "tv" && time.maxRuntime !== null;
              let titleText = undefined;
              if (isDisabled) {
                titleText = "Filtro de duração disponível apenas para filmes";
              }

              return (
                <button
                  type="button"
                  key={time.id}
                  className={pillClass}
                  onClick={() => setTimeId(time.id)}
                  disabled={isDisabled}
                  title={titleText}
                >
                  {time.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="discover__field">
          <legend>Mais algum gênero específico? (opcional)</legend>
          <div className="discover__pill-group">
            {GENRES.map((genre) => {
              let pillClass = "discover__pill discover__pill--small";
              if (genreIds.includes(genre.id)) {
                pillClass = "discover__pill discover__pill--small discover__pill--active";
              }
              return (
                <button
                  type="button"
                  key={genre.id}
                  className={pillClass}
                  onClick={() => toggleGenre(genre.id)}
                >
                  {genre.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button type="submit" className="discover__submit">
          <SlidersHorizontal size={17} />
          Buscar sugestões
        </button>
      </form>

      <section className="discover__results">
        {status === "loading" && (
          <p className="discover__status">Buscando sugestões...</p>
        )}

        {status === "error" && (
          <p className="discover__status discover__status--error">
            Não deu para buscar agora ({errorMessage}). Tente novamente em instantes.
          </p>
        )}

        {status === "success" && results.length === 0 && (
          <p className="discover__status">
            Nenhum título encontrado com esses filtros. Tente remover algum gênero extra.
          </p>
        )}

        {status === "success" && results.length > 0 && (
          <TitleGrid
            titles={results}
            mediaType={appliedFilters.mediaType}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
          />
        )}
      </section>
    </div>
  );
}

// src/components/tmdb.js
// Camada única de acesso à API do TMDB (The Movie Database).
// Centralizar as chamadas aqui evita repetir a URL base e a chave em vários componentes.

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Mapeamento de "humor" (proposta própria do produto) para parâmetros da TMDB.
// A TMDB não tem filtro de "humor" nativo, então traduzimos cada humor
// para uma combinação de gêneros que representa esse clima.
export const MOODS = [
  { id: "leve", label: "Leve e divertido", genres: [35, 10751] }, // Comédia, Família
  { id: "tenso", label: "Tenso e adrenalina", genres: [53, 28] }, // Thriller, Ação
  { id: "emocionante", label: "Emocionante", genres: [18] }, // Drama
  { id: "misterio", label: "Mistério", genres: [9648, 80] }, // Mistério, Crime
  { id: "fantasia", label: "Fantasia e aventura", genres: [14, 12] }, // Fantasia, Aventura
];

// Faixas de tempo disponível, convertidas em duração máxima (em minutos)
// usada no filtro with_runtime.lte da TMDB (funciona apenas para filmes).
export const TIME_RANGES = [
  { id: "curto", label: "Até 100 min", maxRuntime: 100 },
  { id: "medio", label: "Até 130 min", maxRuntime: 130 },
  { id: "livre", label: "Sem limite", maxRuntime: null },
];

export const MEDIA_TYPES = [
  { id: "movie", label: "Filmes" },
  { id: "tv", label: "Séries" },
];

// Lista de gêneros usada no formulário de filtros (id segue o padrão da TMDB).
export const GENRES = [
  { id: 28, label: "Ação" },
  { id: 12, label: "Aventura" },
  { id: 16, label: "Animação" },
  { id: 35, label: "Comédia" },
  { id: 80, label: "Crime" },
  { id: 18, label: "Drama" },
  { id: 14, label: "Fantasia" },
  { id: 27, label: "Terror" },
  { id: 9648, label: "Mistério" },
  { id: 10749, label: "Romance" },
  { id: 878, label: "Ficção científica" },
  { id: 53, label: "Thriller" },
];

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "pt-BR");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

async function request(path, params) {
  const response = await fetch(buildUrl(path, params));
  if (!response.ok) {
    throw new Error(`Erro na API do TMDB (${response.status})`);
  }
  return response.json();
}

// Busca títulos (filmes ou séries) combinando gêneros e duração.
export function discoverTitles({ mediaType, genreIds, maxRuntime }) {
  const params = {
    sort_by: "popularity.desc",
    with_genres: genreIds?.length ? genreIds.join(",") : undefined,
    "vote_count.gte": 100,
  };
  // O filtro de duração máxima só existe no endpoint de filmes da TMDB.
  if (mediaType === "movie" && maxRuntime) {
    params["with_runtime.lte"] = maxRuntime;
  }
  return request(`/discover/${mediaType}`, params);
}

// Detalhe completo de um título específico.
export function getTitleDetails(mediaType, id) {
  return request(`/${mediaType}/${id}`, {
    append_to_response: "videos,credits,watch/providers",
  });
}

// Monta a URL completa de uma imagem do TMDB a partir do path retornado pela API.
export function posterUrl(path, size = "w342") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

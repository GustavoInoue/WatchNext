// src/components/WatchlistContext.jsx
// Context da "Minha Lista": guarda os títulos que a pessoa salvou para assistir depois.
// Usamos Context + useState (em vez de prop drilling) porque a lista precisa ser lida
// e alterada por componentes em páginas diferentes (cartão de título, página de detalhe
// e a própria página "Minha Lista").

import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);

const STORAGE_KEY = "watchnext:minha-lista";

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Sempre que a lista mudar, persiste no localStorage para sobreviver a um refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(title) {
    setItems((current) => {
      const alreadyExists = current.some(
        (item) => item.id === title.id && item.mediaType === title.mediaType
      );
      if (alreadyExists) return current;
      return [...current, title];
    });
  }

  function removeItem(id, mediaType) {
    setItems((current) =>
      current.filter((item) => !(item.id === id && item.mediaType === mediaType))
    );
  }

  function isSaved(id, mediaType) {
    return items.some((item) => item.id === id && item.mediaType === mediaType);
  }

  const value = { items, addItem, removeItem, isSaved };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist precisa ser usado dentro de um WatchlistProvider");
  }
  return context;
}

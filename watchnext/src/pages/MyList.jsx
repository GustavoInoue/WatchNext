// src/pages/MyList.jsx
// Lista de títulos salvos, lida diretamente do WatchlistContext (sem chamada à API).

import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { useWatchlist } from "../components/WatchlistContext";
import TitleGrid from "../components/TitleGrid";
import "./MyList.css";

export default function MyList() {
  const { items, removeItem, isSaved, addItem } = useWatchlist();

  function handleToggleSave(title, mediaType) {
    if (isSaved(title.id, mediaType)) {
      removeItem(title.id, mediaType);
    } else {
      addItem({ ...title, mediaType });
    }
  }

  return (
    <div className="my-list">
      <header className="my-list__header">
        <h1>Minha lista</h1>
        <p>Títulos que você salvou para assistir quando tiver o momento certo.</p>
      </header>

      {items.length === 0 ? (
        <div className="my-list__empty">
          <p>Sua lista está vazia por enquanto.</p>
          <Link to="/descobrir" className="my-list__cta">
            <Compass size={17} /> Ir para descobrir
          </Link>
        </div>
      ) : (
        <TitleGrid
          titles={items}
          mediaType={items[0]?.mediaType}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
}

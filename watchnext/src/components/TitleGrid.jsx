// src/components/TitleGrid.jsx
// Recebe uma lista de títulos via props e renderiza um TitleCard para cada um.
// Repassa isSaved/onToggleSave para que cada cartão saiba seu próprio estado de salvo.

import TitleCard from "./TitleCard";
import "./TitleGrid.css";

export default function TitleGrid({ titles, mediaType, isSaved, onToggleSave }) {
  if (!titles.length) {
    return null;
  }

  return (
    <div className="title-grid">
      {titles.map((title) => {
        // Cada título pode informar seu próprio mediaType (caso da Minha Lista,
        // que mistura filmes e séries); senão usamos o mediaType fixo da busca atual.
        const itemMediaType = title.mediaType || mediaType;
        return (
          <TitleCard
            key={`${itemMediaType}-${title.id}`}
            title={title}
            mediaType={itemMediaType}
            isSaved={isSaved(title.id, itemMediaType)}
            onToggleSave={onToggleSave}
          />
        );
      })}
    </div>
  );
}

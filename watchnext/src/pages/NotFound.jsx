// src/pages/NotFound.jsx
// Rota curinga (*) para qualquer caminho que não exista.

import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Página não encontrada</h1>
      <p>Esse caminho não existe no WatchNext.</p>
      <Link to="/" className="not-found__link">
        Voltar para o início
      </Link>
    </div>
  );
}

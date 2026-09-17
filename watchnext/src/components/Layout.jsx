// src/components/Layout.jsx
// Layout compartilhado por todas as páginas: cabeçalho com navegação + rodapé.
// O <Outlet /> do React Router renderiza a página da rota atual dentro deste layout.

import { NavLink, Outlet } from "react-router-dom";
import { Compass, Home, Bookmark, Clapperboard } from "lucide-react";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <NavLink to="/" className="layout__brand">
          <Clapperboard size={22} strokeWidth={2.2} />
          <span>WatchNext</span>
        </NavLink>

        <nav className="layout__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `layout__link${isActive ? " layout__link--active" : ""}`
            }
          >
            <Home size={18} />
            <span>Início</span>
          </NavLink>
          <NavLink
            to="/descobrir"
            className={({ isActive }) =>
              `layout__link${isActive ? " layout__link--active" : ""}`
            }
          >
            <Compass size={18} />
            <span>Descobrir</span>
          </NavLink>
          <NavLink
            to="/minha-lista"
            className={({ isActive }) =>
              `layout__link${isActive ? " layout__link--active" : ""}`
            }
          >
            <Bookmark size={18} />
            <span>Minha lista</span>
          </NavLink>
        </nav>
      </header>

      <main className="layout__content">
        <Outlet />
      </main>

      <footer className="layout__footer">
        <p>WatchNext · projeto acadêmico feito com React e a API do TMDB</p>
      </footer>
    </div>
  );
}

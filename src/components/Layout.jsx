// src/components/Layout.jsx
// Layout compartilhado por todas as páginas: cabeçalho com navegação + rodapé.
// O <Outlet /> do React Router renderiza a página da rota atual dentro deste layout.

import { NavLink, Outlet } from "react-router-dom";
import { Compass, Home, Bookmark, Clapperboard } from "lucide-react";
import "./Layout.css";

export default function Layout() {
  function getNavClass(isActive) {
    if (isActive) {
      return "layout__link layout__link--active";
    }
    return "layout__link";
  }

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
            className={({ isActive }) => getNavClass(isActive)}
          >
            <Home size={18} />
            <span>Início</span>
          </NavLink>
          <NavLink
            to="/descobrir"
            className={({ isActive }) => getNavClass(isActive)}
          >
            <Compass size={18} />
            <span>Descobrir</span>
          </NavLink>
          <NavLink
            to="/minha-lista"
            className={({ isActive }) => getNavClass(isActive)}
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
        <p>WatchNext</p>
      </footer>
    </div>
  );
}

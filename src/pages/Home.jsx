// src/pages/Home.jsx
// Página inicial: explica o produto e leva a pessoa para a página de filtros.

import { Link } from "react-router-dom";
import { ArrowRight, SlidersHorizontal, Clock, Smile, Bookmark } from "lucide-react";
import "./Home.css";

const STEPS = [
  {
    icon: Smile,
    title: "Diga seu humor",
    text: "Leve, tenso, emocionante... escolha o clima que combina com seu momento.",
  },
  {
    icon: Clock,
    title: "Diga seu tempo",
    text: "Meia hora de intervalo ou uma noite livre? A busca se ajusta à sua duração.",
  },
  {
    icon: SlidersHorizontal,
    title: "Receba a lista certa",
    text: "Nada de rolar um catálogo infinito: só títulos que cabem no seu momento.",
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">
          Chega de passar mais tempo escolhendo do que assistindo.
        </h1>
        <p className="home__subtitle">
          O WatchNext filtra filmes e séries pelo humor e pelo tempo que você tem
          agora, não pelo catálogo inteiro de um serviço de streaming.
        </p>
        <Link to="/descobrir" className="home__cta">
          Descobrir o que assistir
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="home__steps">
        {STEPS.map((step) => (
          <div className="home__step" key={step.title}>
            <step.icon size={22} strokeWidth={1.8} className="home__step-icon" />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </section>

      <section className="home__secondary">
        <Bookmark size={20} />
        <p>
          Encontrou algo interessante mas não é a hora? Salve na sua{" "}
          <Link to="/minha-lista">lista</Link> e volte quando quiser.
        </p>
      </section>
    </div>
  );
}

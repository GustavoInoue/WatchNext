// src/main.jsx
// Ponto de entrada da aplicação: monta o React na div#root e envolve tudo
// com o BrowserRouter, necessário para o React Router funcionar.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

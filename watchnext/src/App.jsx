// src/App.jsx
// Define todas as rotas da aplicação usando React Router.
// Layout é a rota "pai" (contém o cabeçalho); as demais são filhas e renderizam
// dentro do <Outlet /> do Layout.

import { Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./components/WatchlistContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import TitleDetails from "./pages/TitleDetails";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <WatchlistProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="descobrir" element={<Discover />} />
          <Route path="titulo/:mediaType/:id" element={<TitleDetails />} />
          <Route path="minha-lista" element={<MyList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </WatchlistProvider>
  );
}

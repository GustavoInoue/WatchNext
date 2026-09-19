import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import App from './App'
import PaginaInicio from './pages/PaginaInicio'
import PaginaDescobrir from './pages/PaginaDescobrir'
import PaginaDetalhes from './pages/PaginaDetalhes'
import PaginaMinhaLista from './pages/PaginaMinhaLista'
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PaginaNaoEncontrada />,
    children: [
      { index: true, element: <PaginaInicio /> },
      { path: "descobrir", element: <PaginaDescobrir /> },
      { path: "titulo/:tipo/:id", element: <PaginaDetalhes /> },
      { path: "minha-lista", element: <PaginaMinhaLista /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

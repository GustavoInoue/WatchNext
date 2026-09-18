# Architecture — WatchNext

## 1. Visão Geral

A aplicação é uma SPA em React (via Vite), organizada em páginas
(uma por rota, em `pages/`) que usam componentes reutilizáveis
(em `components/`) para exibir listas e cartões de título. Dentro de
`components/`, o arquivo `tmdb.js` concentra toda a lógica de acesso à
API do TMDB (não é um componente visual, mas um módulo de apoio usado
pelos componentes e páginas), e `WatchlistContext.jsx` implementa um
Context que guarda o estado global da lista pessoal, compartilhado entre
páginas diferentes e persistido no `localStorage`.

## 2. Estrutura de Pastas

```text
src/
├── components/
│   ├── Layout.jsx             # cabeçalho + navegação + <Outlet />
│   ├── TitleCard.jsx          # cartão de um título (poster, nome, nota, botão salvar)
│   ├── TitleGrid.jsx          # grade que renderiza vários TitleCard a partir de uma lista
│   ├── WatchlistContext.jsx   # Context da lista pessoal (useState + localStorage)
│   └── tmdb.js                # única camada de acesso à API (fetch, URLs, mapeamentos)
├── pages/
│   ├── Home.jsx
│   ├── Discover.jsx      # formulário de filtros + busca na API
│   ├── TitleDetails.jsx  # rota dinâmica com detalhe de um título
│   ├── MyList.jsx
│   └── NotFound.jsx
├── App.jsx                # definição das rotas
├── main.jsx
└── index.css
```

`WatchlistContext.jsx` e `tmdb.js` ficam dentro de `components/` (em vez
de pastas próprias como `data/` ou `services/`) para manter a estrutura
de pastas exigida pelo enunciado, restrita a `components/` e `pages/`
dentro de `src/`.

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Home | `/` | Apresentar o produto e levar à página de descoberta |
| Discover | `/descobrir` | Formulário de filtros (humor, tempo, gênero) e resultados da busca — core do MVP |
| TitleDetails | `/titulo/:mediaType/:id` | Detalhe de um filme ou série específico |
| MyList | `/minha-lista` | Lista de títulos salvos pela pessoa |
| NotFound | `*` | Página 404 para qualquer rota não mapeada |

`mediaType` existe como parâmetro (e não só `:id`) porque a TMDB usa
endpoints diferentes para filmes (`/movie/{id}`) e séries (`/tv/{id}`), e
os IDs não são únicos entre os dois.

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| `Layout` | Cabeçalho fixo com navegação entre as páginas; renderiza a página ativa via `<Outlet />` | — (não recebe props; lê a rota ativa via `NavLink`) |
| `TitleCard` | Exibir um único título (pôster, nome, ano, nota) e emitir o evento de salvar/remover | `title`, `mediaType`, `isSaved`, `onToggleSave` |
| `TitleGrid` | Renderizar uma grade de `TitleCard` a partir de uma lista de títulos | `titles`, `mediaType`, `isSaved`, `onToggleSave` |
| `WatchlistProvider` / `useWatchlist` | Não é um componente visual: fornece o Context da lista pessoal (ler, salvar, remover) para qualquer página ou componente que precise dela | — (Context; consumido via hook `useWatchlist()`, sem props) |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `mediaType`, `moodId`, `timeId`, `genreIds` | `Discover` (useState) | Valores do formulário antes de a pessoa aplicar a busca |
| `appliedFilters` | `Discover` (useState) | Guarda os filtros efetivamente enviados; mudar esse valor é o gatilho do `useEffect` de busca |
| `results`, `status`, `errorMessage` | `Discover` (useState) | Resultado da busca e seu ciclo de vida (loading/success/error) |
| `title`, `status` | `TitleDetails` (useState) | Dado carregado da API e ciclo de vida da chamada de detalhe |
| `items` | `WatchlistContext` (useState, global) | Lista de títulos salvos — precisa ser lida e alterada por páginas diferentes (Discover, TitleDetails, MyList), por isso vive em um Context em vez de dentro de uma única página |

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Busca de sugestões | Sempre que `appliedFilters` muda, em `Discover` | Chama `discoverTitles()` na API do TMDB e atualiza `results`/`status`; usa uma flag `cancelled` para ignorar respostas de buscas já substituídas |
| Busca de detalhe | Sempre que `mediaType` ou `id` mudam, em `TitleDetails` | Chama `getTitleDetails()` na API do TMDB e atualiza `title`/`status` |
| Persistência da lista | Sempre que `items` muda, em `WatchlistContext` | Grava a lista atual no `localStorage`, para sobreviver a um refresh da página |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| `react-router-dom` | Rotas com layout aninhado (`Layout` + `Outlet`) e rota dinâmica (`:mediaType/:id`) | Requisito técnico do projeto (React Router com múltiplas páginas e rotas dinâmicas) |
| `lucide-react` | Ícones usados na navegação, botões e cartões (ex.: `Bookmark`, `Star`, `Clock`) | Requisito técnico do projeto (biblioteca de ícones) |
| TMDB API (`fetch` nativo) | Busca de filmes/séries e detalhe de título | API pública do domínio escolhido (filmes/séries), conforme sugerido no enunciado |

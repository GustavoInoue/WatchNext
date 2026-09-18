# WatchNext

MVP de plataforma web para descobrir o que assistir, feito como avaliação
(CP1 — 2º trimestre — WebDev) inspirado no vácuo deixado pelo
encerramento do TV Time.

## Integrantes do grupo

- Luca Baccari Dos Santos — RM 569807
- Rafael Dias Fontes — RM 570504
- Gustavo Pereira Inoue — RM 570549

## Problema

Com o fim do TV Time, ficou um vazio na forma como pessoas descobriam o
que assistir. Além disso, catálogos de streaming são grandes demais para
navegar rapidamente: a pessoa sabe que quer assistir algo, mas não sabe
exatamente o quê, e acaba gastando mais tempo escolhendo do que
assistindo.

## Solução

O WatchNext resolve especificamente o problema de **"descobrir o que
assistir"**. Em vez de mostrar um catálogo genérico, a pessoa escolhe:

- tipo de conteúdo (filme ou série),
- o **humor** do momento (leve, tenso, emocionante, mistério, fantasia),
- o **tempo disponível** (para filmes, filtra por duração máxima),
- opcionalmente, gêneros extras específicos,

e recebe uma lista curta e relevante de sugestões, com a opção de salvar
qualquer título em uma lista pessoal para assistir depois.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (build tool)
- [React Router DOM](https://reactrouter.com/) — rotas com layout
  aninhado e rota dinâmica
- [lucide-react](https://lucide.dev/) — biblioteca de ícones
- CSS puro (sem framework de UI), com design tokens em `src/index.css`
- `localStorage` para persistir a lista pessoal

## API usada

[TMDB — The Movie Database](https://www.themoviedb.org/documentation/api)
(v3), usando os endpoints:

- `GET /discover/movie` e `GET /discover/tv` — busca filtrada por gênero
  e duração
- `GET /movie/{id}` e `GET /tv/{id}` — detalhe de um título, incluindo
  vídeos, créditos e provedores de streaming (`append_to_response`)

## Funcionalidades

- **Descobrir** (`/descobrir`): formulário de filtros (tipo, humor,
  tempo, gêneros) que busca sugestões reais na TMDB.
- **Detalhe do título** (`/titulo/:mediaType/:id`): sinopse, gêneros,
  duração, nota e onde assistir (quando disponível na API).
- **Minha lista** (`/minha-lista`): títulos salvos, persistidos entre
  sessões via `localStorage`.
- Estados de carregamento, erro e lista vazia tratados em toda a
  aplicação.
- Layout responsivo (funciona em celular).

## Uso de IA

Foi usada IA (Claude, da Anthropic) como apoio ao longo do processo,
seguindo a metodologia de Spec Driven Development pedida no enunciado:

- Apoio na estruturação da spec (`docs/requirements.md` e
  `docs/architecture.md`) a partir das decisões de produto definidas pelo
  grupo (problema escolhido, mecânica de filtros, nome do produto).
- Apoio na geração do código-base seguindo os padrões vistos em aula
  (componentização, props, hooks `useState`/`useEffect`, React Router).
- As decisões de produto, negócio e estética (qual problema resolver,
  como o filtro de humor deveria funcionar, paleta de cores, nome do
  produto) foram feitas pelo grupo antes da geração de código.
- O grupo é responsável por revisar, entender e conseguir explicar todo
  o código entregue, adaptando o que for necessário para os padrões
  usados em sala.

## Instruções de execução

### Pré-requisitos

- Node.js 18+ instalado
- Uma chave de API gratuita da TMDB: crie uma conta em
  https://www.themoviedb.org/ e gere a chave em **Configurações → API**

### Passo a passo

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd watchnext

# 2. Instalar dependências
npm install

# 3. Configurar a variável de ambiente
cp .env.example .env.local
# edite .env.local e cole sua chave da TMDB em VITE_TMDB_API_KEY

# 4. Rodar em modo desenvolvimento
npm run dev
# abra http://localhost:5173

# 5. Gerar build de produção (opcional, local)
npm run build
```

### Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Importe o repositório na [Vercel](https://vercel.com/).
3. Em **Environment Variables**, adicione `VITE_TMDB_API_KEY` com sua
   chave da TMDB.
4. Deploy. O framework é detectado automaticamente como Vite.

## Estrutura do projeto

```
watchnext/
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   └── references/
│       └── references.md
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
└── README.md
```

Veja `docs/requirements.md` para objetivo, user stories e critérios de
aceitação, e `docs/architecture.md` para o detalhamento técnico de
páginas, componentes, props, estados e efeitos.

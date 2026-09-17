# References — WatchNext

## 1. Objetivo

As referências abaixo orientam as decisões de experiência e interface do
WatchNext. Nenhuma delas é do universo de filmes/séries (exceto a
primeira, usada como referência de layout de detalhe, não de
funcionalidade), conforme permitido pelo enunciado.

> **Nota para o grupo:** as imagens (`referencia-01.png`,
> `referencia-02.png`, `referencia-03.png`) precisam ser adicionadas em
> `docs/references/imagens/`. Abaixo, cada referência indica a URL exata
> para tirar o print, já que o ambiente usado para gerar este projeto não
> tem acesso de rede a sites genéricos de imagem.

## 2. Referência 01 — Letterboxd

### Fonte
https://letterboxd.com/films/popular/ (grade de pôsteres) e
https://letterboxd.com/film/parasite-2019/ (página de detalhe de filme)

### Imagem

![Referência 01](./imagens/referencia-01.png)

### O que observamos?
O Letterboxd não usa listas com texto para representar filmes — usa uma
grade densa de pôsteres, grande o bastante para reconhecer o filme
visualmente antes mesmo de ler o nome. Na página de detalhe, o pôster
fica fixo ao lado do texto (não acima dele), com gêneros exibidos como
tags e a sinopse em destaque central.

### O que vamos aproveitar?
A ideia de que o pôster é o elemento de navegação principal — tanto na
listagem quanto no detalhe — e que gêneros funcionam melhor como tags
curtas do que como texto corrido.

### Como será adaptado?
No `TitleGrid`/`TitleCard`, os resultados da busca e a Minha Lista usam
uma grade de pôsteres como elemento visual principal, com nome e nota
como informação secundária abaixo da imagem. Na `TitleDetails`, o layout
usa duas colunas (pôster fixo à esquerda, informações à direita), com
gêneros como tags — mesma hierarquia observada na referência.

## 3. Referência 02 — Spotify

### Fonte
Aba "Buscar" do Spotify, seção de gêneros e humores (mood & genre)

### Imagem

![Referência 02](./imagens/referencia-02.png)

### O que observamos?
O Spotify organiza parte da descoberta de música por humor e contexto
("Foco", "Treino", "Relaxar"), não apenas por artista ou gênero —
reconhecendo que a pessoa muitas vezes sabe o clima que quer antes de
saber o título exato.

### O que vamos aproveitar?
A pergunta "qual seu humor agora" como critério de busca de primeira
classe, tão importante quanto gênero, em vez de escondida como filtro
secundário.

### Como será adaptado?
Na página `Discover`, o filtro de humor (`MOODS`, em
`src/components/tmdb.js`) é a primeira pergunta feita à pessoa, antes de
gênero ou duração. Cada humor é internamente traduzido em uma combinação
de gêneros da TMDB (já que a API não tem o conceito de "humor" nativo).

## 4. Referência 03 — Duolingo

### Fonte
Telas de onboarding do Duolingo ("por que você quer aprender", "quanto
tempo por dia")

### Imagem

![Referência 03](./imagens/referencia-03.png)

### O que observamos?
Em vez de `<select>` ou checkboxes tradicionais, o Duolingo usa botões
arredondados ("pills") grandes, com um estado visualmente óbvio de
selecionado/não selecionado — o que torna um formulário potencialmente
chato em algo rápido de preencher no toque.

### O que vamos aproveitar?
O padrão de pill buttons para qualquer escolha única ou múltipla dentro
de um formulário curto, priorizando velocidade de preenchimento no
celular.

### Como será adaptado?
Todo o formulário da página `Discover` (tipo de conteúdo, humor, tempo
disponível, gêneros extras) usa esse padrão (classe `.discover__pill`,
em `src/pages/Discover.css`) em vez de selects ou checkboxes, com estado
ativo destacado pela cor de destaque do produto.

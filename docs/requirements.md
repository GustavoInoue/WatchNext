# Requirements — WatchNext

## 1. Visão do Produto

### Nome
WatchNext

### Problema
Com o encerramento do TV Time, ficou um vazio na forma como as pessoas
descobrem o que assistir. Além disso, catálogos de streaming são grandes
demais para navegar rapidamente: a pessoa sabe que quer assistir algo,
mas não sabe exatamente o quê, e acaba gastando mais tempo escolhendo do
que assistindo.

### Público
Pessoas que já assinam um ou mais serviços de streaming mas gastam mais
tempo rolando o catálogo do que assistindo algo de fato; pessoas com
tempo livre limitado (pausa do trabalho, intervalo entre tarefas) que
querem uma sugestão rápida, do tamanho certo para o tempo que têm.

### Proposta de solução
Em vez de mostrar um catálogo genérico, o WatchNext pede três critérios
centrados na pessoa e no momento dela — **humor**, **tempo disponível** e
**gênero** — e devolve uma lista curta e relevante de filmes/séries vinda
da API do TMDB, com opção de salvar qualquer título numa lista pessoal
para assistir depois.

## 2. Objetivo do MVP

Ao final do projeto, a aplicação precisa permitir que a pessoa:
- escolha tipo de conteúdo (filme ou série), humor, tempo disponível e,
  opcionalmente, gêneros extras, e receba sugestões reais buscadas na
  API do TMDB;
- veja o detalhe de qualquer título sugerido (sinopse, gêneros, duração,
  nota, onde assistir);
- salve e remova títulos de uma lista pessoal, que persiste entre
  sessões;
- navegue por todas essas telas via React Router, com estados de
  carregamento, vazio e erro tratados visualmente.

## 3. Funcionalidades

### F01 — Descoberta por filtros (humor, tempo e gênero)

**Descrição:** formulário na página `/descobrir` onde a pessoa escolhe
tipo de conteúdo (filme/série), humor, tempo disponível e, opcionalmente,
gêneros extras. Ao enviar, a aplicação busca sugestões na API do TMDB
combinando esses critérios.

**Critérios de aceitação:**
- [x] A pessoa consegue escolher tipo de conteúdo, humor e tempo antes de buscar
- [x] O filtro de tempo (duração máxima) se aplica somente a filmes e fica desabilitado para séries, com indicação visual do motivo
- [x] Gêneros extras escolhidos se somam aos gêneros do humor selecionado, sem duplicar
- [x] Os resultados vêm de uma chamada real à API do TMDB (`/discover/movie` ou `/discover/tv`)

**Estados:**
- [x] Inicial (nenhuma busca feita ainda — mostra só o formulário)
- [x] Carregando (mensagem de "Buscando sugestões...")
- [x] Sucesso (grade de resultados)
- [x] Vazio (sucesso sem resultados — mensagem orientando ajustar filtros)
- [x] Erro (mensagem de erro sem quebrar a página)

### F02 — Detalhe do título

**Descrição:** ao clicar em um título sugerido ou salvo, a pessoa navega
para uma rota dinâmica (`/titulo/:tipo/:id`) que busca e exibe
sinopse, gêneros, duração, nota e onde assistir (quando disponível).

**Critérios de aceitação:**
- [x] A rota lê `tipo` e `id` da URL e busca o detalhe correspondente na API
- [x] A página mostra pôster, nome, ano, duração, nota, gêneros e sinopse
- [x] Quando a API retorna provedores de streaming (região BR), eles são exibidos
- [x] A pessoa pode salvar/remover o título da lista pessoal direto nessa página

**Estados:**
- [x] Carregando (mensagem de "Carregando detalhes...")
- [x] Sucesso (conteúdo completo do título)
- [x] Erro (mensagem de erro com link de volta para a busca)

### F03 — Lista pessoal ("Minha lista")

**Descrição:** página `/minha-lista` que mostra todos os títulos salvos
pela pessoa, com persistência entre sessões via `localStorage`.

**Critérios de aceitação:**
- [x] Um título só pode ser salvo uma vez (identificado por `id + tipo`, já que IDs de filme e série podem se repetir na TMDB)
- [x] A pessoa consegue remover um título salvo direto na grade, sem entrar no detalhe
- [x] A lista persiste após recarregar a página (não depende de nova busca)

**Estados:**
- [x] Vazio (mensagem convidando a ir para `/descobrir`)
- [x] Sucesso (grade com os títulos salvos)

### F04 — Navegação e tratamento de rota inexistente

**Descrição:** navegação entre Home, Descobrir, Minha Lista e Detalhe via
React Router, com layout compartilhado (cabeçalho fixo) e página 404
para qualquer rota não mapeada.

**Critérios de aceitação:**
- [x] O cabeçalho de navegação está presente em todas as páginas e destaca a rota ativa
- [x] Uma URL que não corresponde a nenhuma rota mostra a página 404 com link de volta ao início

**Estados:**
- [x] Rota válida (renderiza a página correspondente)
- [x] Rota inexistente (renderiza 404)

## 4. Fora do Escopo

- Login, conta de usuário ou sincronização da lista pessoal entre dispositivos
- Avaliação de episódio a episódio ou acompanhamento de progresso de série assistida
- Recomendação baseada em histórico ou algoritmo de machine learning (o "humor" é uma regra fixa definida pelo produto, não aprendida)
- Comunidade, comentários ou interação entre usuários
- Internacionalização (idiomas além de português)

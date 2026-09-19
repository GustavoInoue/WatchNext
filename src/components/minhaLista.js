const CHAVE = "watchnext:minha-lista"

export const lerMinhaLista = () => {
    const salvo = localStorage.getItem(CHAVE)
    if (!salvo) {
        return []
    }

    try {
        return JSON.parse(salvo)
    } catch {
        return []
    }
}

export const salvarMinhaLista = (itens) => {
    localStorage.setItem(CHAVE, JSON.stringify(itens))
}

export const estaSalvo = (itens, id, tipo) => {
    return itens.some((item) => item.id === id && item.tipo === tipo)
}

const paraItemDaLista = (titulo, tipo) => {
    return {
        id: titulo.id,
        tipo: tipo,
        title: titulo.title,
        name: titulo.name,
        poster_path: titulo.poster_path,
        release_date: titulo.release_date,
        first_air_date: titulo.first_air_date,
        vote_average: titulo.vote_average
    }
}

export const alternarItem = (itens, titulo, tipo) => {
    if (estaSalvo(itens, titulo.id, tipo)) {
        return itens.filter((item) => !(item.id === titulo.id && item.tipo === tipo))
    }
    return [...itens, paraItemDaLista(titulo, tipo)]
}

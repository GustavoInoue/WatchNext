import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Star } from "lucide-react"
import { buscarDetalhes, urlImagem } from "../components/tmdb"
import { lerMinhaLista, salvarMinhaLista, alternarItem, estaSalvo } from "../components/minhaLista"

const PaginaDetalhes = () => {

    const { tipo, id } = useParams()

    const [titulo, setTitulo] = useState(null)
    const [situacao, setSituacao] = useState("carregando")
    const [minhaLista, setMinhaLista] = useState(lerMinhaLista())

    useEffect(() => {
        buscarDetalhes(tipo, id)
            .then((dados) => {
                setTitulo(dados)
                setSituacao("pronto")
            })
            .catch(() => {
                setSituacao("erro")
            })
    }, [tipo, id])

    const aoSalvar = () => {
        const atualizada = alternarItem(minhaLista, titulo, tipo)
        setMinhaLista(atualizada)
        salvarMinhaLista(atualizada)
    }

    if (situacao === "carregando") {
        return <p className="status-message">Carregando detalhes...</p>
    }

    if (situacao === "erro") {
        return (
            <div className="status-message">
                <p>Não foi possível carregar este título.</p>
                <Link to="/descobrir" className="back-link">
                    <ArrowLeft size={16} /> Voltar para descoberta
                </Link>
            </div>
        )
    }

    const nome = titulo.title || titulo.name
    const ano = (titulo.release_date || titulo.first_air_date || "").slice(0, 4)
    const salvo = estaSalvo(minhaLista, titulo.id, tipo)

    let duracao = titulo.runtime
    if (!duracao && titulo.episode_run_time && titulo.episode_run_time.length > 0) {
        duracao = titulo.episode_run_time[0]
    }

    let servicos = []
    const ondeAssistir = titulo["watch/providers"]
    if (ondeAssistir && ondeAssistir.results.BR && ondeAssistir.results.BR.flatrate) {
        servicos = ondeAssistir.results.BR.flatrate
    }

    let classeBotaoSalvar = "btn-save"
    if (salvo) {
        classeBotaoSalvar = "btn-save btn-save-active"
    }

    return (
        <article className="details">
            <Link to="/descobrir" className="back-link">
                <ArrowLeft size={16} /> Voltar
            </Link>

            <div className="details-grid">
                <div className="details-poster">
                    {titulo.poster_path ? (
                        <img src={urlImagem(titulo.poster_path, "w500")} alt={"Pôster de " + nome} />
                    ) : (
                        <div className="details-poster-empty">Sem imagem</div>
                    )}
                </div>

                <div className="details-info">
                    <h1>{nome}</h1>

                    <div className="details-meta">
                        {ano && <span>{ano}</span>}
                        {duracao && (
                            <span>
                                <Clock size={14} /> {duracao} min
                            </span>
                        )}
                        {titulo.vote_average > 0 && (
                            <span className="details-rating">
                                <Star size={14} fill="currentColor" strokeWidth={0} />
                                {titulo.vote_average.toFixed(1)}
                            </span>
                        )}
                    </div>

                    <div className="genre-list">
                        {titulo.genres.map((genero) => (
                            <span key={genero.id} className="genre-tag">{genero.name}</span>
                        ))}
                    </div>

                    <p className="details-overview">
                        {titulo.overview || "Sinopse não disponível."}
                    </p>

                    <button type="button" className={classeBotaoSalvar} onClick={aoSalvar}>
                        {salvo ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        {salvo ? "Salvo na minha lista" : "Salvar na minha lista"}
                    </button>

                    {servicos.length > 0 && (
                        <div className="providers">
                            <h2>Onde assistir</h2>
                            <div className="provider-list">
                                {servicos.map((servico) => (
                                    <img
                                        key={servico.provider_id}
                                        src={urlImagem(servico.logo_path, "w92")}
                                        alt={servico.provider_name}
                                        title={servico.provider_name}
                                        className="provider-logo"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}

export default PaginaDetalhes

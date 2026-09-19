import { Link } from "react-router"
import { Star, Bookmark, BookmarkCheck } from "lucide-react"
import { urlImagem } from "./tmdb"

const CardTitulo = ({ titulo, tipo, salvo, aoSalvar }) => {

    const nome = titulo.title || titulo.name
    const ano = (titulo.release_date || titulo.first_air_date || "").slice(0, 4)
    const link = "/titulo/" + tipo + "/" + titulo.id

    let textoBotao = "Salvar na minha lista"
    let iconeBotao = <Bookmark size={18} />

    if (salvo) {
        textoBotao = "Remover da minha lista"
        iconeBotao = <BookmarkCheck size={18} />
    }

    return (
        <article className="title-card">
            <Link to={link} className="title-poster-link">
                {titulo.poster_path ? (
                    <img
                        className="title-poster"
                        src={urlImagem(titulo.poster_path, "w342")}
                        alt={"Pôster de " + nome}
                        loading="lazy"
                    />
                ) : (
                    <div className="title-poster title-poster-empty">Sem imagem</div>
                )}
            </Link>

            <button
                type="button"
                className="title-save"
                onClick={() => aoSalvar(titulo, tipo)}
                aria-label={textoBotao}
                title={textoBotao}
            >
                {iconeBotao}
            </button>

            <div className="title-info">
                <Link to={link} className="title-name">{nome}</Link>

                <div className="title-meta">
                    {ano && <span>{ano}</span>}
                    {titulo.vote_average > 0 && (
                        <span className="title-rating">
                            <Star size={13} fill="currentColor" strokeWidth={0} />
                            {titulo.vote_average.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}

export default CardTitulo

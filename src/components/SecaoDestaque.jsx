import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

const SecaoDestaque = ({ meta, detalhe, linha1, linha2, texto, textoBotao, linkBotao }) => {
    return (
        <section className="banner">
            <div className="banner-meta">
                <span>{meta}</span>
                <span>{detalhe}</span>
            </div>

            <h1 className="banner-titulo">
                <span>{linha1}</span>
                <span className="titulo-contorno">{linha2}</span>
            </h1>

            <div className="banner-rodape">
                <p className="banner-texto">{texto}</p>

                <Link to={linkBotao} className="botao-seta" aria-label={textoBotao}>
                    <span className="botao-rotulo">
                        <span>{textoBotao}</span>
                        <span aria-hidden="true">{textoBotao}</span>
                    </span>

                    <span className="botao-icone" aria-hidden="true">
                        <ArrowRight size={16} />
                        <ArrowRight size={16} />
                    </span>
                </Link>
            </div>
        </section>
    )
}

export default SecaoDestaque

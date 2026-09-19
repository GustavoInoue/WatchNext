import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Bookmark } from "lucide-react"
import { buscarEmAlta } from "../components/tmdb"
import ParedeDePosteres from "../components/ParedeDePosteres"
import SecaoDestaque from "../components/SecaoDestaque"
import ComoFunciona from "../components/ComoFunciona"

const PaginaInicio = () => {

    const [emAlta, setEmAlta] = useState([])

    useEffect(() => {
        buscarEmAlta()
            .then((dados) => {
                setEmAlta(dados.results)
            })
            .catch(() => {
                setEmAlta([])
            })
    }, [])

    let detalhe = "Carregando da TMDB"
    if (emAlta.length > 0) {
        detalhe = emAlta.length + " títulos da semana · TMDB"
    }

    return (
        <div className="home">
            <ParedeDePosteres titulos={emAlta} />

            <SecaoDestaque
                meta="Em cartaz agora"
                detalhe={detalhe}
                linha1="Menos tempo escolhendo"
                linha2="Mais tempo assistindo"
                texto="O WatchNext filtra filmes e séries pelo humor e pelo tempo que você tem agora, não pelo catálogo inteiro de um serviço de streaming."
                textoBotao="Começar"
                linkBotao="/descobrir"
            />

            <ComoFunciona />

            <section className="home-note revelar">
                <Bookmark size={20} />
                <p>
                    Encontrou algo interessante mas não é a hora? Salve na sua{" "}
                    <Link to="/minha-lista">lista</Link> e volte quando quiser.
                </p>
            </section>
        </div>
    )
}

export default PaginaInicio

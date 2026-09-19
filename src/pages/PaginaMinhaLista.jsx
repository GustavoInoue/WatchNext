import { useState } from "react"
import { Link } from "react-router"
import { Compass } from "lucide-react"
import { lerMinhaLista, salvarMinhaLista, alternarItem } from "../components/minhaLista"
import GradeTitulos from "../components/GradeTitulos"

const PaginaMinhaLista = () => {

    const [minhaLista, setMinhaLista] = useState(lerMinhaLista())

    const aoSalvar = (titulo, tipo) => {
        const atualizada = alternarItem(minhaLista, titulo, tipo)
        setMinhaLista(atualizada)
        salvarMinhaLista(atualizada)
    }

    return (
        <div className="my-list">
            <div className="page-header">
                <h1>Minha lista</h1>
                <p>Títulos que você salvou para assistir quando tiver o momento certo.</p>
            </div>

            {minhaLista.length === 0 ? (
                <div className="empty-state">
                    <p>Sua lista está vazia por enquanto.</p>
                    <Link to="/descobrir" className="btn-secondary">
                        <Compass size={17} /> Ir para descobrir
                    </Link>
                </div>
            ) : (
                <GradeTitulos
                    titulos={minhaLista}
                    tipo="movie"
                    minhaLista={minhaLista}
                    aoSalvar={aoSalvar}
                />
            )}
        </div>
    )
}

export default PaginaMinhaLista

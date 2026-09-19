import { Link } from "react-router"

const PaginaNaoEncontrada = () => {
    return (
        <div className="not-found">
            <h1>Página não encontrada</h1>
            <p>Esse caminho não existe no WatchNext.</p>
            <Link to="/" className="btn-secondary">Voltar para o início</Link>
        </div>
    )
}

export default PaginaNaoEncontrada

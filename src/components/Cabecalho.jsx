import { NavLink } from "react-router"
import { Clapperboard, Home, Compass, Bookmark } from "lucide-react"

const Cabecalho = () => {

    const classeDoLink = ({ isActive }) => {
        if (isActive) {
            return "nav-link nav-link-active"
        }
        return "nav-link"
    }

    return (
        <header className="header">
            <NavLink to="/" className="logo">
                <Clapperboard size={22} strokeWidth={2.2} />
                <span>WatchNext</span>
            </NavLink>

            <ul className="nav">
                <li>
                    <NavLink to="/" end className={classeDoLink}>
                        <Home size={18} />
                        <span>Início</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="descobrir" className={classeDoLink}>
                        <Compass size={18} />
                        <span>Descobrir</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="minha-lista" className={classeDoLink}>
                        <Bookmark size={18} />
                        <span>Minha lista</span>
                    </NavLink>
                </li>
            </ul>
        </header>
    )
}

export default Cabecalho

import { Smile, Clock, SlidersHorizontal } from "lucide-react"

const ComoFunciona = () => {
    return (
        <section className="benefits">
            <div className="info-card revelar">
                <Smile size={20} strokeWidth={1.8} className="info-icon" />
                <h3>Diga seu humor</h3>
                <p>Leve, tenso, emocionante... escolha o clima que combina com seu momento.</p>
            </div>

            <div className="info-card revelar">
                <Clock size={20} strokeWidth={1.8} className="info-icon" />
                <h3>Diga seu tempo</h3>
                <p>Meia hora de intervalo ou uma noite livre? A busca se ajusta à sua duração.</p>
            </div>

            <div className="info-card revelar">
                <SlidersHorizontal size={20} strokeWidth={1.8} className="info-icon" />
                <h3>Receba a lista certa</h3>
                <p>Nada de rolar um catálogo infinito: só títulos que cabem no seu momento.</p>
            </div>
        </section>
    )
}

export default ComoFunciona

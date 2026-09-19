import CardTitulo from "./CardTitulo"
import { estaSalvo } from "./minhaLista"

const GradeTitulos = ({ titulos, tipo, minhaLista, aoSalvar }) => {

    return (
        <div className="title-grid">
            {titulos.map((titulo) => {
                const tipoDoTitulo = titulo.tipo || tipo

                return (
                    <CardTitulo
                        key={tipoDoTitulo + "-" + titulo.id}
                        titulo={titulo}
                        tipo={tipoDoTitulo}
                        salvo={estaSalvo(minhaLista, titulo.id, tipoDoTitulo)}
                        aoSalvar={aoSalvar}
                    />
                )
            })}
        </div>
    )
}

export default GradeTitulos

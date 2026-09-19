import FilaDePosteres from "./FilaDePosteres"

const ParedeDePosteres = ({ titulos }) => {

    const comImagem = titulos.filter((titulo) => titulo.poster_path)
    const metade = Math.ceil(comImagem.length / 2)

    return (
        <div className="parede" aria-hidden="true">
            <FilaDePosteres titulos={comImagem.slice(0, metade)} invertida={false} />
            <FilaDePosteres titulos={comImagem.slice(metade)} invertida={true} />
        </div>
    )
}

export default ParedeDePosteres

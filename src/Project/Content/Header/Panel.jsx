import { Link } from "react-router-dom"
import { handleButtonClick } from "../../Javascript/handel"
export const Panel = ()=>{
    // Extrae el nombre del botón que se ha presionado
    // Esto permite que el componente sepa qué acción se debe realizar

    return(
        <section className="contenedorBotoneraAdmin">
            <Link to='/formProductos'>
                <button name="productos" onClick={handleButtonClick}>PRODUCTOS</button>
            </Link>
            <Link to='/formProductos' >
                <button name="categorias" onClick={handleButtonClick}>CATEGORIAS</button>
            </Link>
            <Link to='/formProductos'>
                <button name="subcategorias" onClick={handleButtonClick}>SUBCATEGORIAS</button>
            </Link>
        </section>
    )
}
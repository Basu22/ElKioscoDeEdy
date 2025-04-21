import { Link } from "react-router-dom"

export const Panel = ()=>{
    return(
        <section className="contenedorBotoneraAdmin">
            <Link to='/formProductos'>
                <button>PRODUCTOS</button>
            </Link>
            <Link to='/formProductos'>
                <button>CATEGORIAS</button>
            </Link>
            <Link to='/formProductos'>
                <button>SUBCATEGORIAS</button>
            </Link>
{/*             <Link to='/cafeteria'>
                <button>VOLVER A LA APP</button>
            </Link> */}
        </section>
    )
}
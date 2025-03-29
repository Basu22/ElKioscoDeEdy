import { Link } from "react-router-dom"

export const Panel = ()=>{
    return(
        <section className="contenedorBotoneraAdmin">
            <Link to='/altaProductos'>
                <button>ALTA PRODUCTOS</button>
            </Link>
            <Link to='/modificacionProductos'>
                <button>MODIFICACION PRODUCTOS</button>
            </Link>
{/*             <Link to='/cafeteria'>
                <button>VOLVER A LA APP</button>
            </Link> */}
        </section>
    )
}
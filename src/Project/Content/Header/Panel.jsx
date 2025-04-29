import { Link } from "react-router-dom"
export const Panel = ()=>{
    // Extrae el nombre del botón que se ha presionado
    // Esto permite que el componente sepa qué acción se debe realizar

    return(
        <>
            <section className="contenedorBotoneraAdmin">
                <Link to='/formProductos' state={{ modelo: "productos" }}>
                    <button name="productos">PRODUCTOS</button>
                </Link>
                <Link to='/formProductos' state={{ modelo:"categorias" }} >
                    <button name="categorias">CATEGORIAS</button>
                </Link>
                <Link to='/formProductos' state={{ modelo:"subcategorias" }} >
                    <button name="subcategorias">SUBCATEGORIAS</button>
                </Link>
                <Link to="/carrito">
                    Carrito
                </Link>
            </section>
        
        </>
    )
}
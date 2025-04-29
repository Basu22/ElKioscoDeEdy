import { Buscador } from "../FormProductos/Components/Buscador"
import { handleDatos } from "../../Javascript/handel" 
import { modeloDB } from "../../Javascript/modeloDB"
import { useEffect, useState } from "react"

export const Carrito=()=>{

    const [estado, setEstado] = useState('productos')
    const [modelo, setModelo] = useState([])

    return(
        <>
            <Buscador
                handle={(e) => handleDatos(e, modelo, setModelo)}
                value={modelo.nombreProducto}
                estado="producto"
                />
            <section id="contenedorCarrito">
                <label id="nombreProducto">Buscar Producto</label>
                <article id="contenedorArticulos">

                </article>                
            </section>
        </>
    )
}
/* import { useEffect, useState } from "react" */
import logoCirculo from "../../img/ElKioscoDeEdy.png"


export const ItemContenido = ({itemsFiltrados})=>{

    return(
        <>
            {
                itemsFiltrados.map(element => {
                    
                    return element.map(item=>(/* para renderizar siempre en paréntesis los maps */
                    <>
                    <article key={item.idProducto} className="contenedorCaja">
                        <section className="contenedorImgCaja">
                            <img className="imgCaja" alt="" src={logoCirculo} />
                        </section>
                        <section className="contenedorTextoCaja">   
                            <section className="contenedorDetalle">
                                <h4 className="detalleTitulo">{item.nombreProducto}</h4>
                                <p className="detalleProducto">{item.detalleProducto}</p>
                            </section>
                            <section className="contenedorPrecio">
                                {(item.precioProducto===0)?<p>Consultar Precio</p> : <p className="detallePrecio">$ {item.precioProducto}</p>}
                            </section>
                        </section>
                    </article>       
                    </>
                    ))
                
                })
            }
            
        </>
   
   )
   
}
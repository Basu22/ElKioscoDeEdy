import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore/lite"; 
import { db } from "../../firebase/connectFirebase";
import { Link } from "react-router-dom";
import logoCirculo from "../../../img/ElKioscoDeEdy.png"

export const ListadoProductosFiltrados = ({idCategoria})=>{

    console.log(idCategoria)

    const [productos, setProductos] = useState([])
     
    useEffect(()=>{
        const colleccion = collection(db, 'productos')
        const q = query(colleccion,  where('idCategoria','==',idCategoria), orderBy('idSubcategoria'), orderBy('idCategoria'), orderBy('nombreProducto'))

        getDocs(q)
        .then((res)=>{
            setProductos(
                res.docs.map((res)=>{
                    return  {
                        idProducto:res.id, 
                        ...res.data()
                    }
                })
                )
            })
            
        },[idCategoria])

        console.log(productos)



    return(
        <section className="contenedorCajasProductos">
                {
                    productos.map(prod=>{
                        return <>
                                <Link key={prod.idProducto} to={prod.idProducto}>
                                <article key={prod.idProducto} className="contenedorCaja">
                                <section className="contenedorImgCaja">
                                    <img className="imgCaja" alt="" src={logoCirculo} />
                                </section>
                                <section className="contenedorTextoCaja">   
                                    <section className="contenedorDetalle">
                                        <h4 className="detalleTitulo">{prod.nombreProducto}</h4>
                                        <p className="detalleProducto">{prod.detalleProducto}</p>
                                    </section>
                                    <section className="contenedorPrecio">
                                        {(prod.precioProducto===0)?<p>Consultar Precio</p> : <p className="detallePrecio">$ {prod.precioProducto}</p>}
                                    </section>
                                </section>
                            </article>    
                                </Link>
                                </>
                    })
                }
        </section>
    )
}
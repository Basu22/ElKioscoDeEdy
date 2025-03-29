import { useEffect, useState } from "react";
import { db } from "../../firebase/connectFirebase";
import { collection, getDocs } from 'firebase/firestore/lite'
import { ListadoProductosFiltrados } from "./ListadoProductosFiltrados";
import { Link } from "react-router-dom";

export const ListadoProductos = ()=>{

    const [ categorias, setCategorias ] = useState([ ])
    const [ id, setId ] = useState('')
    
    useEffect(()=>{

        const data = collection(db,'categorias');
        
        getDocs(data)
        .then((res)=>{
            setCategorias(
                res.docs.map((res)=>{
                    return  {
                        idCat:res.id, 
                        ...res.data()
                    }
                })
                )
            })
        
        },[])


    const handleId = (e)=>{
        setId(e.target.id) 
    }
        
    

    return(
        <>
        <section className="contenedorListadoCategorias">
            <Link to='/panelAdmin'>
                <button>Volver</button>
            </Link>
            <article className="listadoCategorias">
            {
                categorias.map(cat=>{
                    return <p id={cat.idCategoria} key={cat.idCat} onClick={handleId}>{cat.nombreCategoria}</p>
                })
            }
            </article>
        { (id) ? <ListadoProductosFiltrados idCategoria={id} /> : null}
        </section>
        </>
    )
}
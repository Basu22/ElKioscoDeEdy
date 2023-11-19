import { collection, getDocs, query, where, orderBy } from "firebase/firestore/lite"; 
import { db } from '../firebase/connectFirebase'
import { CabeceraContenido } from "./CabeceraContenido"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'


export const Contenido = ()=>{
    
    const [productos, setProductos] = useState([])
    
    const  {idCategoria}  = useParams()

    
    
    
    
    useEffect(()=>{
        const colleccion = collection(db, 'productos')
        const q = query(colleccion, (where('activoProducto',"==", true), where('idCategoria','==',idCategoria)), orderBy('idSubcategoria'), orderBy('idCategoria'), orderBy('nombreProducto'))
        
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

    return(
        <main className = "contenedorContenido">
             <CabeceraContenido listadoProductos={productos} />
        </main>
    )
}


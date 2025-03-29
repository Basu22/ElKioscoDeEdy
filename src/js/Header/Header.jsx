import { useLocation } from "react-router-dom"
import { ContenedorLogo } from "./ContenedorLogo"
import { ContenedorNav } from "./ContenedorNav"
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from "../firebase/connectFirebase"
import { useEffect, useState } from "react"
import { Panel } from "./Panel"


export const Header = ()=>{

    const [categorias, setCategorias] = useState([])

    const location = useLocation()
    useEffect(()=>{
        const catDB = collection( db,'categorias' )
        getDocs(catDB).
            then(res=>{
                setCategorias(res.docs.map((res)=>{
                    return res.data().idCategoria
                }))
            })
    },[location])

    const categoria = categorias.filter((cat)=> cat === location.pathname.slice(1))
    
    
    
    
    return(
        <header>
            <ContenedorLogo check={categoria.length} />
            {(categoria.length)?<ContenedorNav />:<Panel />}
            
        </header>
    )
}
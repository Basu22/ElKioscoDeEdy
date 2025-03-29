import { useState, useEffect } from "react";
import { db } from "../../firebase/connectFirebase";
import { collection, getDocs } from 'firebase/firestore/lite'

export const SelectCategorias = ({handle, defaultCategoria})=>{

    const [ categorias, setCategorias ] = useState([ ])    
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
        
        
        
        /* para controlar lo que devuelve la base de datos */
        /* console.log(categorias) */

        return(
                <select id='inputCategoria' name="idCategoria" onChange={handle}>
                    <>
                    {(!defaultCategoria) ? <option key='blanco' value='blanco' selected> </option> : null}
                    {
                        categorias.map(opt=>{
                            return (defaultCategoria===opt.idCategoria)? <option key={opt.idCat} value={opt.idCategoria} selected >{opt.nombreCategoria}</option> : <option key={opt.idCat} value={opt.idCategoria}>{opt.nombreCategoria}</option>
                        })
                    }
                    </>
                </select>
        )
    }
    

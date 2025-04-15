import { useState, useEffect } from "react";
import { db } from "../../firebase/connectFirebase";
import { collection, getDocs, query, startAt, orderBy } from "firebase/firestore/lite"; 

export const Search = ({handle, data})=>{

    const [ productos, setProductos ] = useState([ ]) 
    
    const limpiar = str =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      
    useEffect(()=>{

        const consultadb = collection(db,'productos');
        
        getDocs(consultadb)
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


        console.log(limpiar(data), "limpiar")
        const resutl = productos.filter(prod=>limpiar(prod.nombreProducto).includes(limpiar(data)))

        console.log(resutl, "resultado")

        },[data])

            
        return(
 /*                    <input id='inputNombre' type='search' placeholder="Nombre Producto" onChange={handle} value={datos.nombreProducto} name='nombreProducto'> */
                    <>
                    {
                        productos.filter(prod=>limpiar(prod.nombreProducto).includes(limpiar(data)))

                        .map(prod=>{
                            console.log(prod.nombreProducto, "nombreProducto")
                            return <input onChange={handle}>
                            </input>
                        })
                    }
                    </>
/*                     </input> */
        )
    }
    

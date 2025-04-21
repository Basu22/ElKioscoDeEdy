import { db } from "../connectFirebase";
import { collection, addDoc } from 'firebase/firestore'

export const AddFirebase = (datos, coleccion)=>{
        
    
    const productos = collection(db,coleccion);
    addDoc(productos, datos)
        .then((doc)=>{
            console.log(doc.id)
        })

    return(
        <>
        {doc.id ? <h3>Producto Agregado</h3> :
        <h3>Agregando Producto...</h3>}
        </>
    )
}


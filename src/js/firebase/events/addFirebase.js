import { db } from "../connectFirebase";
import { collection, addDoc } from 'firebase/firestore'

export const addFirebase = (datos, coleccion)=>{
        
    
    const productos = collection(db,coleccion);
    addDoc(productos, datos)
        .then((doc)=>{
            console.log(doc.id)
        })

    return(
        <div>
            <h3>Producto Agregado</h3>
            <p>El ID del producto es: {doc.id}</p>
        </div>
    )
}


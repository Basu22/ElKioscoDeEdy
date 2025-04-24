import { db } from "./connectFirebase";
import { collection, addDoc } from "firebase/firestore";

export const addFirebase = async (datos, coleccion) => {
    try {
        const productos = collection(db, coleccion);
        const docRef = await addDoc(productos, datos); 
        // Espera a que se cree el documento
        console.log("Documento agregado con ID: ", docRef.id);
        return docRef.id; 
        // Devuelve el ID del documento creado
    } catch (error) {
        console.error("Error al agregar el documento: ", error);
        throw error; 
        // Lanza el error para que pueda ser manejado por quien llame a esta función
    }
};
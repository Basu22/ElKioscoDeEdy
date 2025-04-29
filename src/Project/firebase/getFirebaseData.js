// Importar las funciones necesarias de Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "./connectFirebase";

// Obtener datos de Firebase
export const getFirebaseData = (idProducto, setDatos, estado) => {
    const documento = doc(db, estado, idProducto);
    getDoc(documento)
        .then((res) => {
            setDatos({ ...res.data() });
        })
        .catch((error) => {
            console.error("Error al obtener el documento:", error);
        });
};
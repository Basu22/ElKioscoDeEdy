// Importar las funciones necesarias de Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../connectFirebase"; // Asegúrate de que la ruta sea correcta
import { useEffect } from "react";
import { useParams } from "react-router-dom"; // Asegúrate de que estás usando react-router-dom

// Obtener datos de Firebase
export const getFirebaseData = (idProducto, setDatos) => {
    const documento = doc(db, 'productos', idProducto);
    getDoc(documento)
        .then((res) => {
            setDatos({ ...res.data() });
        })
        .catch((error) => {
            console.error("Error al obtener el documento:", error);
        });
};
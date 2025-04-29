import { db } from "../firebase/connectFirebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { addFirebase } from "../firebase/addFirebase";
import { normalizarConsulta } from "./normalizarConsulta";

export const handleDatos = (e, modelo, setModelo) => {
    if (e.target.name === "nombreProducto") {
        setModelo({
            ...modelo,
            [e.target.name]: e.target.value,
            nombreNormalizado: normalizarConsulta(e.target.value)
        });
    } else {
        setModelo({
            ...modelo,
            [e.target.name]: e.target.value,
        });
    }
};

export const handleNumeros = (e, modelo, setModelo) => {
    setModelo({
        ...modelo,
        [e.target.name]: Number(e.target.value),
    });
};

export const handleBoolean = (e, modelo, setModelo) => {
    setModelo({
        ...modelo,
        [e.target.name]: e.target.checked,
    });
};

export const handelSubmit = async (e, modelo, idProducto, estado) => {
    e.preventDefault();
    const accion = e.nativeEvent.submitter.name;

    switch (accion) {
        case "actualizar":
            const documentoActualizar = doc(db, estado, idProducto);
            try {
                await updateDoc(documentoActualizar, { ...modelo });
                console.log("Producto actualizado con ID:", idProducto);
                return { idProducto, modelo, accion }; // Devuelve los modelo necesarios
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
                throw error;
            }

        case "eliminar":
            const documentoEliminar = doc(db, estado, idProducto);
            try {
                await deleteDoc(documentoEliminar);
                console.log("Producto eliminado con ID:", idProducto);
                return { idProducto, modelo, accion }; // Devuelve los modelo necesarios
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                throw error;
            }

        case "agregar":
            try {
                const documentoAgregar = await addFirebase(modelo, estado);
                console.log("Producto agregado con ID:", documentoAgregar);
                return { idProducto: documentoAgregar, modelo, accion }; // Devuelve los modelo necesarios
            } catch (error) {
                console.error("Error al agregar el producto:", error);
                throw error;
            }

        default:
            console.log("Acción no reconocida");
            break;
    }
};
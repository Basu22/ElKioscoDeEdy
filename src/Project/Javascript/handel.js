import { db } from "../firebase/connectFirebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { addFirebase } from "../firebase/addFirebase";
import { normalizarConsulta } from "./normalizarConsulta";

export const handleButtonClick = (e) => {
    console.log(e.nativeEvent.submitter.name;); 
    // Aquí puedes agregar la lógica para manejar el clic en el botón
};

export const handleDatos = (e, datos, setDatos) => {
    if (e.target.name === "nombreProducto") {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
            nombreNormalizado: normalizarConsulta(e.target.value)
        });
    } else {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    }
};

export const handleNumeros = (e, datos, setDatos) => {
    setDatos({
        ...datos,
        [e.target.name]: Number(e.target.value),
    });
};

export const handleBoolean = (e, datos, setDatos) => {
    setDatos({
        ...datos,
        [e.target.name]: e.target.checked,
    });
};

export const handelSubmit = async (e, datos, idProducto) => {
    e.preventDefault();
    const accion = e.nativeEvent.submitter.name;

    switch (accion) {
        case "actualizar":
            const documentoActualizar = doc(db, "productos", idProducto);
            try {
                await updateDoc(documentoActualizar, { ...datos });
                console.log("Producto actualizado con ID:", idProducto);
                return { idProducto, datos, accion }; // Devuelve los datos necesarios
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
                throw error;
            }

        case "eliminar":
            const documentoEliminar = doc(db, "productos", idProducto);
            try {
                await deleteDoc(documentoEliminar);
                console.log("Producto eliminado con ID:", idProducto);
                return { idProducto, datos, accion }; // Devuelve los datos necesarios
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                throw error;
            }

        case "agregar":
            try {
                const documentoAgregar = await addFirebase(datos, "productos");
                console.log("Producto agregado con ID:", documentoAgregar);
                return { idProducto: documentoAgregar, datos, accion }; // Devuelve los datos necesarios
            } catch (error) {
                console.error("Error al agregar el producto:", error);
                throw error;
            }

        default:
            console.log("Acción no reconocida");
            break;
    }
};
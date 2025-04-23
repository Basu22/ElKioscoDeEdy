import { db } from "../../firebase/connectFirebase"; 
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { addFirebase } from "../../firebase/events/addFirebase";
import { normalizarConsulta } from "../../firebase/events/normalizarConsulta";

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

export const Handel = async (e, datos, idProducto) => {
    e.preventDefault();
    const accion = e.nativeEvent.submitter.name;

    console.log("handleSubmit", e.nativeEvent.submitter);

    switch (accion) {
        case "actualizar":
            console.log("Actualizar producto:", datos);
            const documentoActualizar = doc(db, "productos", idProducto); // Asegúrate de que `datos` contenga `idProducto`
            await updateDoc(documentoActualizar, { ...datos })
            .then(() => {
                console.log("Producto actualizado con ID:", idProducto);
            })
            .catch((error) => {
                console.error("Error al actualizar el producto:", error);
            });
            break;
            
            case "eliminar":
            const documentoEliminar = doc(db, "productos", idProducto); // Asegúrate de que `idProducto` sea el ID correcto
            // Lógica para eliminar
            await deleteDoc(documentoEliminar)
                .then(() => {
                    console.log("Producto eliminado con ID:", idProducto);
                })
                .catch((error) => {
                    console.error("Error al eliminar el producto:", error);
                });
            break;

        case "agregar":
            console.log("Agregar producto:", datos);
            try {
                const documentoAgregar = await addFirebase(datos, "productos"); // Captura el ID del documento creado
                console.log("Producto agregado con ID:", documento);
                return documento; // Retorna el ID del documento creado

            } catch (error) {
                console.error("Error al agregar el producto:", error);
            }
            break;

        default:
            console.log("Acción no reconocida");
            break;
    }
};
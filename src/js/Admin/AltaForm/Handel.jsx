import { doc, updateDoc } from "firebase/firestore";
import { addFirebase } from "../../firebase/events/addFirebase";

export const handleDatos = (e, datos, setDatos) => {
    if (e.target.name === "nombreProducto") {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
            nombreNormalizado: e.target.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-"),
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

export const Handel = async (e, datos) => {
    e.preventDefault();
    const accion = e.nativeEvent.submitter.name;

    console.log("handleSubmit", e.nativeEvent.submitter);

    switch (accion) {
        case "actualizar":
            console.log("Actualizar producto:", datos);
            const documento = doc(db, "productos", datos.idProducto); // Asegúrate de que `datos` contenga `idProducto`
            await updateDoc(documento, { ...datos });
            break;

        case "eliminar":
            console.log("Eliminar producto:", datos);
            // Lógica para eliminar
            break;

        case "agregar":
            console.log("Agregar producto:", datos);
            try {
                const documento = await addFirebase(datos, "productos"); // Captura el ID del documento creado
                console.log("Producto agregado con ID:", documento);
                return documento; // Retorna el ID del documento creado
                // Puedes actualizar el estado o realizar otras acciones con el ID
            } catch (error) {
                console.error("Error al agregar el producto:", error);
            }
            break;

        default:
            console.log("Acción no reconocida");
            break;
    }
};
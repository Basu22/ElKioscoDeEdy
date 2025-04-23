import { useState, useEffect } from "react";
import { getFirebaseData } from "../../firebase/events/getFirebaseData";    
import { Buscador } from "./Buscador";
import { SelectCategorias } from "./SelectCategoria";
import { SelectSubcategorias } from "./SelectSubcategoria";
import { Link, useParams } from "react-router-dom";
import { Handel, handleDatos, handleNumeros, handleBoolean } from "./Handel";


export const FormProductos = () => {
    const { idProducto } = useParams(); 
    const [datos, setDatos] = useState({
        nombreProducto: "",
        nombreNormalizado: "",
        detalleProducto: "",
        precioProducto: "",
        idCategoria: "",
        idSubcategoria: "",
        activoProducto: "",
    });
    
    const [documento, setDocumento] = useState(); 
    // Estado para almacenar el ID del documento creado
    
    useEffect(() => {
        if (idProducto) {
            getFirebaseData(idProducto, setDatos);
        }
    }, [idProducto]);

    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        try{
            const id = await Handel(e, datos, idProducto); // Llama a Handel para manejar la acción
            setDocumento(id); // Almacena el ID del documento creado en el estado
        }
        catch (error) {
            console.error("Error al crear el documento:", error); // Manejo de errores
        }
    };

    return (
        <section className="contenedorForm">
            <h3>Formulario de Productos</h3>
            <form onSubmit={handleSubmit}>
                <label id="nombreProducto">Nombre Producto</label>
                <Buscador
                    handle={(e) => handleDatos(e, datos, setDatos)}
                    value={datos.nombreProducto}
                    idProducto = {idProducto}
                />
                <label id="detalleProducto">Detalle Producto</label>
                <textarea
                    id="inputDetalle"
                    type="text"
                    placeholder="Detalle Producto"
                    onChange={(e) => handleDatos(e, datos, setDatos)}
                    value={datos.detalleProducto}
                    name="detalleProducto"
                    rows="8"
                    cols="25"
                />
                <label id="precioProducto">Precio</label>
                <input
                    id="inputPrecio"
                    type="number"
                    placeholder="Precio Producto"
                    onChange={(e) => handleNumeros(e, datos, setDatos)}
                    value={datos.precioProducto}
                    name="precioProducto"
                />
                <label id="categoriaProducto">Categoria Producto</label>
                <SelectCategorias
                    defaultCategoria={datos.idCategoria}
                    handle={(e) => handleDatos(e, datos, setDatos)}
                />
                <label id="subcatProducto">Subcategoria Producto</label>
                <SelectSubcategorias
                    defaultSubcategoria={datos.idSubcategoria}
                    handle={(e) => handleDatos(e, datos, setDatos)}
                />
                <label id="textoCheckbox">Activo?</label>
                <input
                    id="checkbox"
                    type="checkbox"
                    onChange={(e) => handleBoolean(e, datos, setDatos)}
                    checked={datos.activoProducto}
                    name="activoProducto"
                />
                <article id="contenedorCrear">
                    <button name="eliminar" id="buttonCrear">
                        Eliminar
                    </button>
                    <button name="actualizar" id="buttonCrear">
                        Modificar
                    </button>
                    <button name="agregar" id="buttonCrear">
                        Crear
                    </button>
                </article>
                <Link id="buttonVolver" to="/panelAdmin">
                    <button>Volver</button>
                </Link>
            </form>
            { (documento)? <h3>Producto creado con ID: {documento}</h3> : null}
        </section>
    );
};
import { useState, useEffect } from "react";
import { getFirebaseData } from "../../firebase/getFirebaseData";    
import { Buscador } from "./Components/Buscador";
import { SelectCategorias } from "./Components/SelectCategoria";
import { SelectSubcategorias } from "./Components/SelectSubcategoria";
import { Link, useParams } from "react-router-dom";
import { handelSubmit, handleDatos, handleNumeros, handleBoolean } from "../../Javascript/handel";
import { ModalForm } from "./Components/ModalForm";



export const FormProductos = () => {
    
    // Extrae el idCategoria de los parámetros de la URL
    // Esto permite que el componente sepa si está en modo edición o creación
    const { idCategoria } = useParams(); 
    
    // Estado para almacenar los datos del formulario
    // Se inicializa con valores vacíos para cada campo del formulario
    const [datos, setDatos] = useState({
        nombreCategoria: "",
        nombreNormalizado: "",
        idCategoria: "",
    });


    // Estado para controlar la visibilidad del modal
    // Se inicializa como false, lo que significa que el modal no se muestra al principio
    const [showModal, setShowModal] = useState(false);
    // Estado para almacenar los datos del modal
    // Se inicializa como un array vacío
    const [dataModal, setDataModal] = useState();


    // Efecto que se ejecuta al cargar el componente
    // Si idCategoria está presente, se llama a getFirebaseData para obtener los datos del producto
    // y se actualiza el estado 'datos' con la información obtenida
    useEffect(() => {
        if (idCategoria) {
            getFirebaseData(idCategoria, setDatos);
        }
    }, [idCategoria]);

    
    // Función que se ejecuta al enviar el formulario
    // Evita el comportamiento por defecto del formulario y llama a la función Handel para manejar la acción
    const handleSubmit = async (e) => {

        // Evita el comportamiento por defecto del formulario
        e.preventDefault(); 
        try{
            // Llama a Handel para manejar la acción
            const data = await handelSubmit(e, datos, idCategoria); 
            // Almacena el ID del documento creado en el estado
            setShowModal(true);
            setDataModal(data);
            // Actualiza el estado 'datos' con los datos del modal
        }
        catch (error) {
            console.error("Error al crear el documento:", error); 
            // Manejo de errores
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
                    idCategoria = {idCategoria}
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
            { (showModal)? 
            <ModalForm
                idCategoria={dataModal.idCategoria} 
                datos={dataModal.datos} 
                accion={dataModal.accion} 
                setShowModal={setShowModal}
                setDatos={setDatos}
            /> : <></>}
        
        </section>
    );
};
import { useState, useEffect, use } from "react";
import { getFirebaseData } from "../../firebase/getFirebaseData";    
import { Buscador } from "./Components/Buscador";
import { SelectCategorias } from "./Components/SelectCategoria";
import { SelectSubcategorias } from "./Components/SelectSubcategoria";
import { Link, useParams, useLocation } from "react-router-dom";
import { handelSubmit , handleDatos, handleNumeros, handleBoolean } from "../../Javascript/handel";
import { modeloDB } from "../../Javascript/modeloDB";




export const FormProductos = () => {
    
    // Extrae el idProducto de los parámetros de la URL
    // Esto permite que el componente sepa si está en modo edición o creación
    const { idProducto } = useParams(); 
    const { state } = useLocation();
    const [ estado , setEstado ] = useState(); // Estado para almacenar el estado actual del componente
    // Se inicializa con el estado pasado desde la ubicación actual
    const [modelo, setModelo] = useState({});

    useEffect(() => {
        // Si el estado no está definido, se establece el estado inicial
        if (estado === undefined) {
            console.log("Estado no definido, se establece el estado inicial.");
            setEstado(estado);
        } else {
            // Si el estado ya está definido, se actualiza el estado del componente
            setEstado(state.modelo);
        }

    },[state.modelo]); // Se ejecuta cada vez que cambia el estado del modelo

    console.log("Estado:", estado); // Imprime el estado actual en la consola


    // Estado para almacenar el modelo del formulario
    // Se inicializa con valores vacíos para cada campo del formulario
    
    useEffect(() => {
        // Llama a la función modeloDB para inicializar el estado del modelo según el tipo de modelo seleccionado
        // Esto se hace para asegurarse de que el formulario tenga los campos correctos según el modelo
        modeloDB( estado , setModelo);

    }, [state.modelo]);
    
    // Estado para controlar la visibilidad del modal
    // Se inicializa como false, lo que significa que el modal no se muestra al principio
    const [showModal, setShowModal] = useState(false);
    // Estado para almacenar los modelo del modal
    // Se inicializa como un array vacío
    const [dataModal, setDataModal] = useState();


    // Efecto que se ejecuta al cargar el componente
    // Si idProducto está presente, se llama a getFirebaseData para obtener los modelo del producto
    // y se actualiza el estado 'modelo' con la información obtenida
    useEffect(() => {
        if (idProducto) {
            getFirebaseData(idProducto, setModelo);
        }
    }, [idProducto]);

    
    // Función que se ejecuta al enviar el formulario
    // Evita el comportamiento por defecto del formulario y llama a la función Handel para manejar la acción
    const handleSubmit = async (e) => {

        // Evita el comportamiento por defecto del formulario
        e.preventDefault(); 
        try{
            // Llama a Handel para manejar la acción
            const data = await handelSubmit(e, modelo, idProducto); 
            // Almacena el ID del documento creado en el estado
            setShowModal(true);
            setDataModal(data);
            // Actualiza el estado 'modelo' con los modelo del modal
        }
        catch (error) {
            console.error("Error al crear el documento:", error); 
            // Manejo de errores
        }
    };

    return (
        <section className="contenedorForm">
            <h3>Formulario de {state.modelo}</h3>
        {state.modelo==="productos" && (
                    <form onSubmit={handleSubmit}>
                        <label id="nombreProducto">Nombre Producto</label>
                        <Buscador
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.nombreProducto}
                            idProducto = {idProducto}
                            modelo={state.modelo}
                        />
                        <label id="detalleProducto">Detalle Producto</label>
                        <textarea
                            id="inputDetalle"
                            type="text"
                            placeholder="Detalle Producto"
                            onChange={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.detalleProducto}
                            name="detalleProducto"
                            rows="8"
                            cols="25"
                        />
                        <label id="precioProducto">Precio</label>
                        <input
                            id="inputPrecio"
                            type="number"
                            placeholder="Precio Producto"
                            onChange={(e) => handleNumeros(e, modelo, setModelo)}
                            value={modelo.precioProducto}
                            name="precioProducto"
                        />
                        <label id="categoriaProducto">Categoria Producto</label>
                        <SelectCategorias
                            defaultCategoria={modelo.idCategoria}
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                        />
                        <label id="subcatProducto">Subcategoria Producto</label>
                        <SelectSubcategorias
                            defaultSubcategoria={modelo.idSubcategoria}
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                        />
                        <label id="textoCheckbox">Activo?</label>
                        <input
                            id="checkbox"
                            type="checkbox"
                            onChange={(e) => handleBoolean(e, modelo, setModelo)}
                            checked={modelo.activoProducto}
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
                    </form>)}
        {state.modelo==="categorias" && (
                    <form onSubmit={handleSubmit}>
                        <label id="nombreCategoria">Nombre Categoria</label>
                        <Buscador
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.nombreCategoria}
                            idProducto = {idProducto}
                            modelo={state.modelo}
                        />
                        <label id="textoCheckbox">Activo?</label>
                        <input
                            id="checkbox"
                            type="checkbox"
                            onChange={(e) => handleBoolean(e, modelo, setModelo)}
                            checked={modelo.activoCategoria}
                            name="activoCategoria"
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
                    </form>)}
        {state.modelo==="subcategorias" && (
                    <form onSubmit={handleSubmit}>
                        <label id="nombreSubcategoria">Nombre Subcategoria</label>
                        <Buscador
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.nombreSubcategoria}
                            idProducto = {idProducto}
                            modelo={state.modelo}
                        />
                        <label id="textoCheckbox">Activo?</label>
                        <input
                            id="checkbox"
                            type="checkbox"
                            onChange={(e) => handleBoolean(e, modelo, setModelo)}
                            checked={modelo.activoSubcategoria}
                            name="activoSubcategoria"
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
                    </form>)}                       
            { (showModal)? 
            <ModalForm
                idProducto={dataModal.idProducto} 
                modelo={dataModal.modelo} 
                accion={dataModal.accion} 
                setShowModal={setShowModal}
                setDatos={setModelo}
            /> : <></>}
        </section>
    );
};
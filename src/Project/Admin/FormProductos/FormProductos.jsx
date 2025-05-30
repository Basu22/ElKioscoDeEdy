import { useState, useEffect, use } from "react";
import { getFirebaseData } from "../../firebase/getFirebaseData";    
import { Buscador } from "./Components/Buscador";
import { SelectCategorias } from "./Components/SelectCategoria";
import { SelectSubcategorias } from "./Components/SelectSubcategoria";
import { Link, useParams, useLocation } from "react-router-dom";
import { handelSubmit , handleDatos, handleNumeros, handleBoolean } from "../../Javascript/handel";
import { modeloDB } from "../../Javascript/modeloDB";
import { ModalForm } from "./Components/ModalForm";




export const FormProductos = () => {
    
    // Extrae el idProducto de los parámetros de la URL
    const { idProducto } = useParams(); 
    
    const { state } = useLocation();;
    // Estado para almacenar el estado actual del componente
    const [ estado , setEstado ] = useState(state.modelo); 
    
    // Se inicializa con el estado pasado desde la ubicación actual
    const [modelo, setModelo] = useState({});
    
    // Estado para controlar la visibilidad del modal
    // Se inicializa como false, lo que significa que el modal no se muestra al principio
    const [showModal, setShowModal] = useState(false);
    // Estado para almacenar los modelo del modal
    // Se inicializa como un array vacío
    const [dataModal, setDataModal] = useState();


    useEffect(() => {
        // Llama a la función modeloDB para inicializar el estado del modelo según el tipo de modelo seleccionado
        // Esto se hace para asegurarse de que el formulario tenga los campos correctos según el modelo
        setEstado(state.modelo);
        modeloDB( estado , setModelo);
        
    }, [state.modelo]);

    // Efecto que se ejecuta al cargar el componente
    // Si idProducto está presente, se llama a getFirebaseData para obtener los modelo del producto
    // y se actualiza el estado 'modelo' con la información obtenida
    useEffect(() => {
        if (idProducto) {
            getFirebaseData(idProducto, setModelo, estado);
        }
    }, [idProducto]);

    
    // Función que se ejecuta al enviar el formulario
    // Evita el comportamiento por defecto del formulario y llama a la función Handel para manejar la acción
    const handleSubmit = async (e) => {

        // Evita el comportamiento por defecto del formulario
        e.preventDefault(); 
        try{
            // Llama a Handel para manejar la acción
            const data = await handelSubmit(e, modelo, idProducto, estado); 
            // Almacena el ID del documento creado en el estado
            setShowModal(true);
            setDataModal(data);
            // Actualiza el estado 'modelo' con los modelo del moda
        }
        catch (error) {
            console.error("Error al crear el documento:", error); 
            // Manejo de errores
        }
    };

    return (
        <section className="contenedorForm">
            <h3>Formulario de {state.modelo}</h3>
        {estado==="productos" && (
                    <form onSubmit={handleSubmit} id="formProductos">
                        <label id="nombreProducto">Nombre Producto</label>
                        <Buscador
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.nombreProducto}
                            idProducto = {idProducto}
                            estado={estado}
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
                        <label id="stock">Stock</label>
                        <input id="inputStock"
                            type="number"
                            placeholder="Stock Producto"
                            onChange={(e) => handleNumeros(e, modelo, setModelo)}
                            value={modelo.stock}
                            name="stock"    
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
        {estado==="categorias" && (
                    <form onSubmit={handleSubmit} id="formCategorias">
                        <label id="nombreCategoria">Nombre Categoria</label>
                        <Buscador
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.nombreCategoria}
                            idProducto = {idProducto}
                            estado={estado}
                        />
                        <label id="idCategoria">ID Categoria</label>
                        <input
                            id="inputIdCategoria"
                            placeholder="Id Categoria"
                            onChange={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.idCategoria}
                            name="idCategoria"
                            disabled={true}
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
        {estado==="subcategorias" && (
                    <form onSubmit={handleSubmit} id="formSubcategorias">
                        <label id="nombreSubcategoria">Nombre Subcategoria</label>
                        <Buscador
                            handle={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.nombreSubcategoria}
                            idProducto = {idProducto}
                            estado={estado}
                        />
                        <label id="idSubcategoria">ID Categoria</label>
                        <input
                            id="inputIdSubcategoria"
                            placeholder="Id Subcategoria"
                            onChange={(e) => handleDatos(e, modelo, setModelo)}
                            value={modelo.idSubcategoria}
                            name="idSubcategoria"
                            disabled={true}/>
                        <label id="idCategoria">ID Categoria</label>
                        <SelectCategorias
                            defaultCategoria={modelo.idCategoria}
                            handle={(e) => handleDatos(e, modelo, setModelo)}
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
                    {}                       
            { (showModal)? 
            <ModalForm
                idProducto={idProducto} 
                modelo={dataModal.modelo}
                accion={dataModal.accion} 
                estado={estado}
                setShowModal={setShowModal}
                setModelo={setModelo}
            /> : <></>}
        </section>
    );
};
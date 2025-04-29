import { useEffect } from "react";
import { Link } from "react-router-dom";
import { modeloDB } from "../../../Javascript/modeloDB";

export const ModalForm = ({idProducto, setModelo, accion, setShowModal, estado, modelo}) => {

    //limpiamos el modelo al cerrar el modal
    useEffect(() => {
        modeloDB(estado, setModelo);
    }, [idProducto]);
  
    return(
            <section key={modelo.id} id="modalForm" tabIndex="-1" >
                <section id="modal-content">
                    <article id="modal-header">
                        <h5 id="modal-title">Producto {(accion==="actualizar")?"actualizado 🔄 ":(accion==="eliminar")?"eliminado ❌":(accion==="agregar")?"agregado ✅":<></>}</h5>
                    </article>
                    {(estado === "productos") && (
                            <article id="modal-body">
                                {/* Aquí puedes agregar el contenido del modal */}
                                <p>Nombre: {modelo.nombreProducto}</p>
                                <p>Detalle: {modelo.detalleProducto}</p>
                                <p>Categoria: {modelo.idCategoria}</p>
                                <p>Subcategoria: {modelo.idSubcategoria}</p>
                                <p>Precio: ${modelo.precioProducto}</p>
                            </article>
                        )}
                        {(estado === "categorias") && (
                            <article id="modal-body">
                                {/* Aquí puedes agregar el contenido del modal */}
                                <p>Nombre: {modelo.nombreCategoria}</p>
                                <p>Categoria: {modelo.idCategoria}</p>
                            </article>
                        )}
                        {(estado === "subcategorias") && (
                            <article id="modal-body">
                                {/* Aquí puedes agregar el contenido del modal */}
                                <p>Nombre: {modelo.nombreSubcategoria}</p>
                                <p>Categoria: {modelo.idCategoria}</p>
                                <p>Subcategoria: {modelo.idSubcategoria}</p>
                            </article>
                        )}
                    <Link id="modal-footer" to="/formProductos" state={{modelo:estado}}>
                        <button 
                        onClick={()=>setShowModal(false)}
                        type="button" 
                        id="btn btn-secondary">
                            Cerrar
                        </button>
                    </Link>
                </section>
            </section>
            )
        }

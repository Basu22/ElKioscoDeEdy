import { useEffect } from "react";
import { Link } from "react-router-dom";

export const ModalForm = ({idProducto, datos, accion, setShowModal, setDatos}) => {  
    

    useEffect(() => {
        setDatos({
            nombreProducto: "",
            nombreNormalizado: "",
            detalleProducto: "",
            precioProducto: "",
            idCategoria: "",
            idSubcategoria: "",
            activoProducto: "",
        });
    }, [idProducto]);
  

    return(
                <section key={datos.id} id="modalForm" tabIndex="-1" >
                    <section id="modal-content">
                        <article id="modal-header">
                            <h5 id="modal-title">Producto {(accion==="actualizar")?"actualizado 🔄 ":(accion==="eliminar")?"eliminado ❌":(accion==="agregar")?"agregado ✅":<></>}</h5>
                        </article>
                        <article id="modal-body">
                            {/* Aquí puedes agregar el contenido del modal */}
                            <p>Nombre: {datos.nombreProducto}</p>
                            <p>Detalle: {datos.detalleProducto}</p>
                            <p>Categoria: {datos.idCategoria}</p>
                            <p>Subcategoria: {datos.idSubcategoria}</p>
                            <p>Precio: ${datos.precioProducto}</p>
                        </article>
                        <Link id="modal-footer" to="/formProductos">
                            <button onClick={()=>setShowModal(false)}type="button" id="btn btn-secondary">Cerrar</button>
                        </Link>
                    </section>
                </section>
            )
        }

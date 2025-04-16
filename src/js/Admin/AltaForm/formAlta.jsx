import {  useState } from "react"
import { Buscador } from "./Buscador"
import { SelectSubcategorias } from "./selectSubcategoria"
import { SelectCategorias } from "./selectCategoria "
import { Link } from "react-router-dom"
import { addFirebase } from "../../firebase/events/addFirebase"

export const FormAlta =  ()=>{
    
    const [datos, setDatos] = useState(
        {
            nombreProducto: '',
            nombreNormalizado: '',
            detalleProducto: '',
            precioProducto: '',
            idCategoria: '',
            idSubcategoria: '',
            activoProducto: '',
        }
            )
        
    
    const handleDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        })
        console.log({ [e.target.name]: e.target.value })
    }

    const handleNumeros = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: Number(e.target.value)
        })
        console.log({ [e.target.name]: e.target.value })
    }

    const handleBoolean = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.checked
        })
        console.log({ [e.target.name]: e.target.checked })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        addFirebase(datos, 'productos')
        
    }

    return (
        <section className="contenedorForm">
            <h3>Formulario Alta Producto</h3>
            <form onSubmit={handleSubmit}>
                <label id='nombreProducto'>Nombre Producto</label>
                <Buscador handle={handleDatos} value={datos.nombreProducto}/>
                <label id='detalleProducto'>Detalle Producto</label>
                <textarea id='inputDetalle' type='text' placeholder="Detalle Producto" onChange={handleDatos} value={datos.detalleProducto} name='detalleProducto' rows="8" cols="25"/>
                <label id='precioProducto'>Precio</label>
                <input id='inputPrecio' type='number' placeholder="Precio Producto" onChange={handleNumeros} value={datos.precioProducto} name='precioProducto' />
                <label id='categoriaProducto'>Categoria Producto</label>
                <SelectCategorias handle={handleDatos} />
                <label id='subcatProducto'>Subcategoria Producto</label>
                <SelectSubcategorias handle={handleDatos} />
                <label id='textoCheckbox'>Activo?</label>
                <input id='checkbox' type='checkbox' onChange={handleBoolean} value={datos.activoProducto.checked} name='activoProducto' defaultChecked={false} />
                <article id='contenedorCrear'>
                    <button id='buttonCrear'>Crear</button>
                </article>
                <Link id='buttonVolver' to='/panelAdmin'>
                        <button>Volver</button>
                </Link>
            </form>
        </section>
    )

}
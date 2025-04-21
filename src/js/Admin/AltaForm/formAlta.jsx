import {  useState } from "react"
import { Buscador } from "./Buscador"
import { SelectSubcategorias } from "./selectSubcategoria"
import { SelectCategorias } from "./selectCategoria "
import { Link } from "react-router-dom"
import { AddFirebase } from "../../firebase/events/addFirebase"
import { Handel } from "./Handel"

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
        // Normalizamos el nombre del producto al escribirlo
        if (e.target.name === 'nombreProducto') {
            setDatos({
                ...datos,
                [e.target.name]: e.target.value,
                nombreNormalizado: e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')
            }) }else {
            setDatos({
                ...datos,
                [e.target.name]: e.target.value
            })
        }
        console.log({ [e.target.name]: e.target.value })
        console.log('handleSubmit', e.nativeEvent.submitter)
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
        AddFirebase(datos, 'productos')
    }

    return (
        <section className="contenedorForm">
            <h3>Formulario Alta Producto</h3>
            <form onSubmit={Handel}>
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
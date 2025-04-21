import { doc, getDoc, updateDoc} from "firebase/firestore";
import {  useEffect, useState } from "react"
import { SelectSubcategorias } from "./selectSubcategoria"
import { SelectCategorias } from "./selectCategoria "
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase/connectFirebase";


export const FormMod =  ()=>{
    
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
    
    const {idProducto} = useParams()
    
    useEffect(()=>{
        const documento = doc(db, 'productos', idProducto)
        getDoc(documento)
        .then((res)=>{
                setDatos({...res.data()})
            })      
        },[idProducto])
        
    
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
        const documento = doc(db, 'productos', idProducto)
        
        deleteDoc(documento,{...datos})
        console.log('handle', datos)
    }
    
    return (
        <section className="contenedorModificadorProductos">
            <h3>Modificacion de Productos</h3>
            <form onSubmit={handleSubmit}>
                <label id='nombreProducto'>Nombre Producto</label>
                <input id='inputNombre' type='text' placeholder="Nombre Producto" onChange={handleDatos} value={datos.nombreProducto} name='nombreProducto' />
                <label id='detalleProducto'>Detalle Producto</label>
                <textarea id='inputDetalle' type='text' placeholder="Detalle Producto" onChange={handleDatos} value={datos.detalleProducto} name='detalleProducto' rows="8" cols="25" />
                <label id='precioProducto'>Precio</label>
                <input id='inputPrecio' type='number' placeholder="Precio Producto" onChange={handleNumeros} value={datos.precioProducto} name='precioProducto' />
                <label id='categoriaProducto'>Categoria Producto</label>
                <SelectCategorias handle={handleDatos} defaultCategoria={datos.idCategoria} />
                <label id='subcatProducto'>Subcategoria Producto</label>
                <SelectSubcategorias handle={handleDatos} defaultSubcategoria={datos.idSubcategoria} />
                <label id='textoCheckbox'>Activo?</label>
                {(datos.activoProducto===true) ? <input id='checkbox' type='checkbox' onChange={handleBoolean} value={datos.activoProducto.checked} name='activoProducto' checked/>:<input id='checkbox' type='checkbox' onChange={handleBoolean} value={datos.activoProducto.checked} name='activoProducto'/>}
                <article id='contenedorCrear'>
                    <button id='buttonCrear'>Eliminar</button>
                </article>
                <Link id='buttonVolver' to='/altaProductos'>
                    <button>Volver</button>
                </Link>
            </form>
        </section>
    )

}
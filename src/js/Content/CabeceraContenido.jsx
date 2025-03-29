import { ItemContenido } from "./ItemContenido"

export const CabeceraContenido = ({listadoProductos})=>{


    const subCategorias = listadoProductos.map(i=>i.idSubcategoria)
    const subcatUnicos = [...new Set(subCategorias)]

    const productosFiltrados = subcatUnicos.map(subcat=>{
        return listadoProductos.filter(pf =>pf.idSubcategoria === subcat)
    })  
    


    return(
        <article className = "cabeceraContenido">
            <ItemContenido itemsFiltrados={productosFiltrados}/>
        </article>
    )
}
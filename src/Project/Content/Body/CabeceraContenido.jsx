import { ItemContenido } from "./ItemContenido"

export const CabeceraContenido = ({listadoProductos})=>{


    const subCategorias = listadoProductos.map(i=>i.idSubcategoria)
/*     console.log(subCategorias, "subCategorias") */
    const subcatUnicos = [...new Set(subCategorias)]
/*     console.log(subcatUnicos, "subcatUnicos") */

    const productosFiltrados = subcatUnicos.map(subcat=>{
        return listadoProductos.filter(pf =>pf.idSubcategoria === subcat)
    })  
    
/*     console.log(productosFiltrados, "productosFiltrados") */

    return(
        <article className = "cabeceraContenido">
            <ItemContenido itemsFiltrados={productosFiltrados}/>
        </article>
    )
}
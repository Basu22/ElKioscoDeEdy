import { useState } from "react"
export const modeloDB = () => {

    const [producto, setProducto] = useState({
        nombreProducto: "",
        nombreNormalizado: "",
        detalleProducto: "",
        precioProducto: "",
        idCategoria: "",
        idSubcategoria: "",
        activoProducto: "",
    });

    const [categoria, setCategoria] = useState({
        nombreProducto: "",
        nombreNormalizado: "",
        detalleProducto: "",
        precioProducto: "",
        idCategoria: "",
        idSubcategoria: "",
        activoProducto: "",
    });

    const [subcategoria, setSubcategoria] = useState({
        nombreProducto: "",
        nombreNormalizado: "",
        detalleProducto: "",
        precioProducto: "",
        idCategoria: "",
        idSubcategoria: "",
        activoProducto: "",
    });

}


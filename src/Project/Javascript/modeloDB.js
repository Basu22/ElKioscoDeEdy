
export const modeloDB = (modelo, setModelo) => {

    console.log(modelo)
    // Reinicia el estado del modelo según el tipo de modelo seleccionado
    switch (modelo) {
        case "productos":
            setModelo({
                nombreProducto: "",
                nombreNormalizado: "",
                detalleProducto: "",
                precioProducto: "",
                stock: 0,
                idCategoria: "",
                idSubcategoria: "",
                activoProducto: "",
            });
            break;
        case "categorias":
            setModelo({
                nombreCategoria: "",
                idCategoria: "",
                activoCategoria: "",
            });
            break;
        case "subcategorias":
            setModelo({
                nombreSubcategoria: "",
                idSubcategoria: "",
                idCategoria: "",
                activoSubcategoria: "",
            });
            break;
        default:
            break;
    }


    


}


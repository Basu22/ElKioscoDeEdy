
export const modeloDB = (modelo, setModelo) => {
    
    console.log("modelo", modelo)

    // Reinicia el estado del modelo según el tipo de modelo seleccionado
    switch (modelo) {
        case "productos":
            setModelo({
                nombreProducto: "",
                nombreNormalizado: "",
                detalleProducto: "",
                precioProducto: "",
                idCategoria: "",
                idSubcategoria: "",
                activoProducto: "",
            });
            break;
        case "categorias":
            setModelo({
                nombreCategoria: "",
                nombreNormalizado: "",
                idCategoria: "",
            });
            break;
        case "subcategorias":
            setModelo({
                nombreSubcategoria: "",
                nombreNormalizado: "",
                idSubcategoria: "",
                idCategoria: "",
            });
            break;
        default:
            break;
    }


    


}


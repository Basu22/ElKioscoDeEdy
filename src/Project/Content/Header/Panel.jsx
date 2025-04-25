import { Link } from "react-router-dom"

export const Panel = ()=>{
    // Extrae el nombre del botón que se ha presionado
    // Esto permite que el componente sepa qué acción se debe realizar
    const handleButtonClick = (e) => {
        console.log(e.target.name); 
        // Aquí puedes agregar la lógica para manejar el clic en el botón
    };
    return(
        <section className="contenedorBotoneraAdmin">
            <Link to='./formProductos'>
                <button name="productos" onClick={handleButtonClick}>PRODUCTOS</button>
            </Link>
            <Link to='./formProductos' >
                <button name="categorias" onClick={handleButtonClick}>CATEGORIAS</button>
            </Link>
            <Link to='./formProductos'>
                <button name="subcategorias" onClick={handleButtonClick}>SUBCATEGORIAS</button>
            </Link>
{/*             <Link to='/cafeteria'>
                <button>VOLVER A LA APP</button>
            </Link> */}
        </section>
    )
}
import { Link } from "react-router-dom"
import { Panel } from "../Content/Header/Panel.jsx";
export const PanelAdmin = ()=>{
    return(
        <>
            <section id="contenedorPanelAdmin">
                <h1>Panel de Administracion</h1>
                <p>Bienvenido Administrador</p>
                <h3>Selecciona una de las opciones</h3>
                <Panel/>
            </section>

        </>
        
    )
}
import { Link } from 'react-router-dom';
import { icnCafe, icnDesayuno, icnPasteleria, icnSalados, icnBebidas } from "../../Javascript/bancoImg"

export const ContenedorNav = ()=>{

    return(
        <nav className='navegador'>
            <Link to='/cafeteria' className='contenedorNav'>
                <article id='cafeteria' className='circulo'>
                    <img className='icnNav' alt='' src={icnCafe}/>
                </article>
                <p>Cafetería</p>
            </Link>
            <Link to='/desayunos' className='contenedorNav'>
                <article id='desayunos' className='circulo'>
                    <img className='icnNav' alt='' src={icnDesayuno}/>
                </article>
                <p>Desayunos</p>
            </Link>
            <Link to='/pasteleria' className='contenedorNav'>
                <article id='pasteleria' className='circulo'>
                    <img className='icnNav' alt='' src={icnPasteleria}/>
                </article>
                <p>Pastelería</p>
            </Link>
            <Link to='/salados' className='contenedorNav'>
                <article id='salados' className='circulo'>
                    <img className='icnNav' alt='' src={icnSalados}/>
                </article>
                <p>Salados</p>
            </Link>
            <Link to='/bebidas' className='contenedorNav'>
                <article id='bebidas' className='circulo'>
                    <img className='icnNav' alt='' src={icnBebidas}/>
                </article>
                <p>Bebidas</p>
            </Link>
        </nav>
    )
}
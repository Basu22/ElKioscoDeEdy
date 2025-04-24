import { logo } from "../../Javascript/bancoImg"

export const 

ContenedorLogo=({check})=>{

    const body = document.getElementById('root')

    console.log(check)

    if(check===0){
        body.setAttribute('class','rootPanel')
    } else {
        body.setAttribute('class','rootApp')
    }


    return(
        <section className='contenedorLogo'>
            <img className='logoPrincipal' alt='' src={logo}/>
        </section>
    )
}
import { React } from 'react'

export const Handel = (e) => {
    
    e.preventDefault()

    console.log('handleSubmit', e.nativeEvent.submitter)
    // Si el botón que se presionó es "actualizar", se ejecuta la lógica de actualización
    if (e.nativeEvent.submitter.name === 'actualizar') {
        console.log('actualizar')
        // Aquí puedes agregar la lógica para actualizar el producto
    } else if (e.nativeEvent.submitter.name === 'eliminar') {
        console.log('eliminar')
        // Aquí puedes agregar la lógica para eliminar el producto
    } else {
        console.log('agregar')
        // Aquí puedes agregar la lógica para agregar un nuevo producto
    }
    return(
        <>
        </>
    )

}
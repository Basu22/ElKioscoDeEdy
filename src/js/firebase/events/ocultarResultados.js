export const ocultarResultados = (e) => {
    const item = e.target.closest('li');
    // Verifica si el elemento clicado es un elemento de la lista
    // y si tiene el id 'resultadoBusqueda'
    console.log(item.id);
    if (item) {
        const input = document.getElementById('inputNombre');
        input.value = item.innerText; // Asigna el valor del elemento seleccionado al input
        const listaResultados = document.getElementById('listaResultados');
        listaResultados.style.display = 'none'; // Oculta la lista de resultados
    }
}
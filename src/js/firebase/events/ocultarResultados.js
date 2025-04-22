export const ocultarResultados = (e) => {

    const listaResultados = document.getElementById("listaResultados");
    const resultadoBusqueda = document.getElementById("resultadoBusqueda");

    resultadoBusqueda.addEventListener("click", () => {
        /* listaResultados.style.display = "none"; // Oculta la lista de resultados al hacer clic en un resultado */
        console.log("Resultado ocultado"); // Mensaje de depuración
    })// Oculta el resultado de búsqueda al hacer clic en él
}
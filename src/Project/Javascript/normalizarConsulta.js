export const normalizarConsulta = (consulta) => {
    // Normaliza la consulta eliminando acentos y convirtiendo a minúsculas
    return consulta
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}
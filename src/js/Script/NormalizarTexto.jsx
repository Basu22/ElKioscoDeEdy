export const NormalizarTexto = (texto) =>
    texto.normalize("NFD") // separa tildes
         .replace(/[\u0300-\u036f]/g, "") // elimina tildes
         .toLowerCase(); // pasa a minúsculas
  
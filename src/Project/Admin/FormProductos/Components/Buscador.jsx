import { useState, useEffect } from "react";
import { db } from "../../../firebase/connectFirebase";
import { collection, query, orderBy, startAt, endAt, onSnapshot} from "firebase/firestore";
import { Link } from "react-router-dom";
import { ocultarResultados } from "../../../Javascript/ocultarResultados"; // Asegúrate de importar la función ocultarResultados
import { normalizarConsulta } from "../../../Javascript/normalizarConsulta"; // Asegúrate de importar la función normalizarConsulta


export const Buscador = ({value, handle, idProducto})=>{

    const [results, setResults] = useState([]);     // Estado para los resultados filtrados

    useEffect(() => {
      
      // Función para manejar cambios en el input de búsqueda con un tiempo de espera (debounce)
      const delayDebounce = setTimeout(() => {

        // Si el input está vacío, vaciamos los resultados y no hacemos ninguna consulta
      if (value === "") {
        setResults([]);
        return;
      }
      // Armamos una consulta a Firestore que:
      // 1. Ordena por el campo "nombreNormalizado"
      // 2. Filtra los resultados que empiezan con el texto ingresado
      const q = query(
        collection(db, "productos"),  // Ingresamos el nombre de la coleccion y el db del connectFirebase
        orderBy("nombreNormalizado"), // Este campo debe existir en tus documentos y estar indexado
        startAt(normalizarConsulta(value)),// Empieza a buscar desde el texto ingresado...
        endAt(normalizarConsulta(value) + "\uf8ff")// ...hasta lo que tenga el mismo prefijo (truco para búsquedas con "empieza por")
      );

      // onSnapshot escucha cambios en tiempo real de esa consulta
      const unsubscribe = onSnapshot(q, (snapshot) => {
        // Mapear documentos y agregarlos al estado de resultados
        const resultados = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultados);
        // Mostrar la lista de resultados al usuario
        // luego traemos el elemento de la lista de resultados y lo mostramos
        const listaResultados = document.getElementById('listaResultados');
        // Mostrar la lista de resultados
        listaResultados.style.display = 'block'; 
      });

      // Limpiar la suscripción al cambiar el texto o desmontar el componente
      return () => unsubscribe();
    }, 1500); // Esperamos 500ms luego de que el usuario deje de escribir


    return () => clearTimeout(delayDebounce); // Limpiamos el timeout si el usuario sigue escribiendo

  }, [value]);
  
    return (
      <>
        {/* Input controlado: actualiza el estado con cada cambio */}
        <input
          type="search"
          placeholder="Buscar..."
          onChange={handle}
          name="nombreProducto"
          id='inputNombre'
          value={value} // Valor del input controlado
        />

        {/* Mostrar resultados */}
        <ul id='listaResultados' onClick={ocultarResultados}>
          {console.log(!idProducto)}
          {(!idProducto)?results.map((item) => (
            <Link  
            id="resultadoBusqueda" 
            key={item.id} 
            to={'/formProductos/'+item.id}>
              <li id={item.id}>{item.nombreProducto} - ${item.precioProducto}</li> 
            </Link>
          )):<>    </> }
        </ul>
      </>
    );

    }
    

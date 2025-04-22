import { useState, useEffect } from "react";
import { db } from "../../firebase/connectFirebase";
import { collection, query, orderBy, startAt, endAt, onSnapshot} from "firebase/firestore";
import { Link } from "react-router-dom";
import { ocultarResultados } from "../../firebase/events/ocultarResultados";

export const Buscador = ({value, handle})=>{

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
      // 1. Ordena por el campo "nombre"
      // 2. Filtra los resultados que empiezan con el texto ingresado
      const q = query(
        collection(db, "productos"),  // Cambiá "tus_datos" por el nombre real de tu colección
        orderBy("nombreNormalizado"), // Este campo debe existir en tus documentos y estar indexado
        startAt(value),           // Empieza a buscar desde el texto ingresado...
        endAt(value + "\uf8ff")   // ...hasta lo que tenga el mismo prefijo (truco para búsquedas con "empieza por")
      );
      console.log(q)
      // onSnapshot escucha cambios en tiempo real de esa consulta
      const unsubscribe = onSnapshot(q, (snapshot) => {
        // Mapear documentos y agregarlos al estado de resultados
        const resultados = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultados);
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
        <ul id='listaResultados'>
          {results.map((item) => (
/*             console.log(item.id), */
            <Link onClick={ocultarResultados} key={item.id} to={'/formProductos/'+item.id}>
              <li id="resultadoBusqueda" key={item.id}>{item.nombreProducto} - ${item.precioProducto}</li> 
            </Link>
          ))}
        </ul>
      </>
    );

    }
    

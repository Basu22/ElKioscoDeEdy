import { useLocation } from "react-router-dom";
import { ContenedorLogo } from "./ContenedorLogo";
import { ContenedorNav } from "./ContenedorNav";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/connectFirebase";
import { useEffect, useState } from "react";
import { Panel } from "./Panel";

export const Header = () => {
    const [categorias, setCategorias] = useState(null);
    const location = useLocation();

    useEffect(() => {
        let isMounted = true; // Para evitar actualizaciones si el componente se desmonta

        const fetchCategorias = async () => {
            try {
                const catDB = collection(db, "categorias");
                const res = await getDocs(catDB);

                const categoriasFiltradas = res.docs
                    .map((doc) => doc.data().idCategoria)
                    .filter((cat) => cat === location.pathname.slice(1));

                if (isMounted) {
                    setCategorias(categoriasFiltradas);
                }
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };

        fetchCategorias();

        return () => {
            isMounted = false; // Evitar actualizaciones después del desmontaje
        };
    }, [location]);

    return (
        <header>
            <ContenedorLogo check={categorias?.length || 0} />
            {categorias === null ? (
                <p>Cargando...</p>
            ) : categorias.length ? (
                <ContenedorNav />
            ) : (
                <Panel />
            )}
        </header>
    );
};
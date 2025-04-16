import { useLocation } from "react-router-dom";
import { ContenedorLogo } from "./ContenedorLogo";
import { ContenedorNav } from "./ContenedorNav";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/connectFirebase";
import { useEffect, useState } from "react";
import { Panel } from "./Panel";

export const Header = () => {
    const [categorias, setCategorias] = useState(null); // Cambiado a null para indicar estado inicial de carga
    const location = useLocation();

    useEffect(() => {
        const catDB = collection(db, "categorias");
        getDocs(catDB).then((res) => {
            const categoriasFiltradas = res.docs
                .map((doc) => doc.data().idCategoria)
                .filter((cat) => cat === location.pathname.slice(1));
            setCategorias(categoriasFiltradas);
        });
    }, [location]);



    return (
        <header>
            <ContenedorLogo check={categorias?.length || 0} />
            {categorias === null ? (
                <p>Cargando...</p> // Puedes mostrar un mensaje de carga si lo deseas
            ) : categorias.length ? (
                <ContenedorNav />
            ) : (
                <Panel />
            )}
        </header>
    );
};
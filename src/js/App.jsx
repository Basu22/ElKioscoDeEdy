import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './Header/Header.jsx';
import { Contenido } from './Content/Contenido.jsx';
import { FormAlta } from './Admin/AltaForm/formAlta.jsx';
import { FormMod } from './Admin/ModAlta/FormMod';
import { ListadoProductos } from './Admin/ModAlta/ListadoProductos';
import { PanelAdmin } from './Admin/PanelAdmin.jsx';




export const App = ()=>{
    return(
        <>
        <BrowserRouter>    

        <Header />
            <Routes>
                <Route path='/:idCategoria' element={<Contenido/>} />
                <Route path='/PanelAdmin' element={<PanelAdmin/>} />
                <Route path='/altaProductos' element={<FormAlta/>}/>
                <Route path='/modificacionProductos' element={<ListadoProductos/>}/>
                <Route path='/modificacionProductos/:idProducto' element={<FormMod/>}/>
                <Route path='*' element={<Navigate to='/cafeteria' />} />
            </Routes>

        </ BrowserRouter >
        
        </>
    )
}


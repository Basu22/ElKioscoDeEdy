import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './Content/Header/Header.jsx';
import { Contenido } from './Content/Body/Contenido.jsx';
import { FormProductos } from './Admin/FormProductos/FormProductos.jsx';
import { PanelAdmin } from './Admin/PanelAdmin.jsx';

export const App = ()=>{
    return(
        <>
        <BrowserRouter>    

        <Header />
            <Routes>
                <Route path='/:idCategoria' element={<Contenido/>} />
                <Route path='/PanelAdmin' element={<PanelAdmin/>} />
                <Route path='/formProductos' element={<FormProductos/>}/>
                <Route path='/formProductos/:idProducto' element={<FormProductos/>}/>
                <Route path='*' element={<Navigate to='/cafeteria' />} />
            </Routes>

        </ BrowserRouter >
        
        </>
    )
}


import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './js/App.jsx';
import './sass/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root);
root.render( 
    < React.StrictMode >
        <App /> 
    </React.StrictMode>
)
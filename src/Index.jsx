import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from "react-router-dom";
import { App } from './Project/App';
import './Project/sass/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root);
root.render( 
    < React.StrictMode >
        <App /> 
    </React.StrictMode>
)
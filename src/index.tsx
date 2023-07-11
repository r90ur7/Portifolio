import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from "react-router-dom"

import './Components/App.scss';
import Main from "./Components/routes/main";

const rootElement = document.getElementById('root');

if(rootElement){

  ReactDOM.createRoot(rootElement).render(
      <BrowserRouter>

        <Main />

      </BrowserRouter>
  );
} else {
  // rootElement não foi encontrado. Talvez seja necessário aguardar o carregamento da página.
}

reportWebVitals();

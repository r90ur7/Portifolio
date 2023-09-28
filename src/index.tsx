import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"

import './Components/App.scss';
import Main from "./Components/routes/main";
import Header from './Components/scripts/celulas/Header/Header';
import Footer from './Components/scripts/celulas/Footer/Footer';

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/thema";



const rootElement = document.getElementById('root');

if(rootElement){

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                        <Header />
                        <Main />
                        <Footer />
            </BrowserRouter>
        </ChakraProvider>
        </React.StrictMode>
    );
} else {
    // rootElement não foi encontrado. Talvez seja necessário aguardar o carregamento da página.
}

reportWebVitals();

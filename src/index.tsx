import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Layouts/Header/Header';
import Footer from './Components/Layouts/Footer/Footer';
import { ChakraProvider } from "@chakra-ui/react";
import PortfolioTheme from './styles/thema';
import { Analytics } from "@vercel/analytics/react"

const rootElement = document.getElementById('root');

if(rootElement){
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <ChakraProvider theme={PortfolioTheme}>
                <Analytics />
                <Header />
                <Footer />
            </ChakraProvider>
        </React.StrictMode>
    );
} else {
    // rootElement não foi encontrado. Talvez seja necessário aguardar o carregamento da página.
}

reportWebVitals();
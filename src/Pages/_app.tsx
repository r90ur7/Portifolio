import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import reportWebVitals from '../reportWebVitals'
import React, { useEffect } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import '../Components/App.scss';
import theme from '../styles/theme';
import { AnimationProvider } from '../contexts/AnimationContext';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Suprimir erros de extensões do navegador
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.error = (...args: any[]) => {
            const errorMessage = args.join(' ');
            // Ignorar erros relacionados a extensões do navegador
            if (
                errorMessage.includes('Claude top bar container not found') ||
                errorMessage.includes('claude') ||
                errorMessage.includes('inject.js') ||
                errorMessage.includes('chrome-extension://') ||
                errorMessage.includes('web_accessible_resources') ||
                errorMessage.includes('Denying load')
            ) {
                return; // Não logar esse erro
            }
            originalError.apply(console, args);
        };

        console.warn = (...args: any[]) => {
            const warnMessage = args.join(' ');
            // Ignorar avisos relacionados a extensões do navegador
            if (
                warnMessage.includes('chrome-extension://') ||
                warnMessage.includes('web_accessible_resources') ||
                warnMessage.includes('Denying load') ||
                warnMessage.includes('translation.json') ||
                warnMessage.includes('styles.css')
            ) {
                return; // Não logar esse aviso
            }
            originalWarn.apply(console, args);
        };

        // Handler global para erros não capturados
        const handleError = (event: ErrorEvent) => {
            const errorMessage = event.message || '';
            const source = event.filename || '';
            if (
                errorMessage.includes('Claude') ||
                errorMessage.includes('claude') ||
                errorMessage.includes('inject.js') ||
                errorMessage.includes('top bar container') ||
                errorMessage.includes('chrome-extension://') ||
                errorMessage.includes('web_accessible_resources') ||
                source.includes('chrome-extension://')
            ) {
                event.preventDefault(); // Prevenir que o erro apareça no console
                return false;
            }
        };

        // Handler para rejeições de promises não tratadas
        const handleRejection = (event: PromiseRejectionEvent) => {
            const reason = event.reason?.toString() || '';
            if (
                reason.includes('Claude') ||
                reason.includes('claude') ||
                reason.includes('inject.js') ||
                reason.includes('chrome-extension://') ||
                reason.includes('web_accessible_resources')
            ) {
                event.preventDefault(); // Prevenir que o erro apareça no console
                return false;
            }
        };

        window.addEventListener('error', handleError, true);
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            console.error = originalError;
            console.warn = originalWarn;
            window.removeEventListener('error', handleError, true);
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <AnimationProvider>
                <Analytics />
                <SpeedInsights />
                <Component {...pageProps} />
            </AnimationProvider>
        </ChakraProvider>
    )
}

export default MyApp

reportWebVitals();
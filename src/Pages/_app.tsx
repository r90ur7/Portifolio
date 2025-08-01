import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import reportWebVitals from '../reportWebVitals'
import React from 'react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import '../Components/App.scss';

const theme = extendTheme({
    colors: {
        brand: {
            50: '#E9D8FD',
            100: '#D6BCFA',
            200: '#B794F4',
            300: '#9F7AEA',
            400: '#805AD5',
            500: '#6B46C1',
            600: '#553C9A',
            700: '#44337A',
            800: '#322659',
            900: '#21183C',
        },
    },
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Analytics />
            <SpeedInsights />
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp

reportWebVitals();
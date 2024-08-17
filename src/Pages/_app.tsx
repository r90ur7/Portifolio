import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import PortfolioTheme from "../styles/thema";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={PortfolioTheme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
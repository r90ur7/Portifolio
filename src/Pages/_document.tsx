import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
      <Html lang="pt">
        <Head>
            <title>Portifólio</title>
            <link rel="icon" type="image/png" href="/images/icons/DevIco.png" />
            <link rel="shortcut icon" type="image/png" href="/images/icons/DevIco.png" />
            <link rel="apple-touch-icon" href="/images/icons/DevIco.png" />
            <link
                href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        // Prevenir que extensões do navegador causem erros
                        (function() {
                            const originalError = console.error;
                            const originalWarn = console.warn;
                            
                            console.error = function(...args) {
                                const message = args.join(' ');
                                if (
                                    message.includes('Claude') || 
                                    message.includes('inject.js') ||
                                    message.includes('chrome-extension://') ||
                                    message.includes('web_accessible_resources') ||
                                    message.includes('Denying load')
                                ) {
                                    return; // Silenciar erros de extensões
                                }
                                originalError.apply(console, args);
                            };
                            
                            console.warn = function(...args) {
                                const message = args.join(' ');
                                if (
                                    message.includes('chrome-extension://') ||
                                    message.includes('web_accessible_resources') ||
                                    message.includes('Denying load') ||
                                    message.includes('translation.json') ||
                                    message.includes('styles.css')
                                ) {
                                    return; // Silenciar avisos de extensões
                                }
                                originalWarn.apply(console, args);
                            };
                            
                            // Prevenir erros globais de extensões
                            window.addEventListener('error', function(e) {
                                const errorMsg = e.message || '';
                                const source = e.filename || '';
                                if (
                                    errorMsg.includes('Claude') || 
                                    errorMsg.includes('inject.js') ||
                                    errorMsg.includes('chrome-extension://') ||
                                    errorMsg.includes('web_accessible_resources') ||
                                    source.includes('chrome-extension://')
                                ) {
                                    e.preventDefault();
                                    return false;
                                }
                            }, true);
                        })();
                    `,
                }}
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
  );
}
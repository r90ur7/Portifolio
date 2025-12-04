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
                        // BLOQUEAR COMPLETAMENTE EXTENSÕES DO NAVEGADOR (Claude, etc)
                        (function() {
                            // Bloquear ANTES de qualquer coisa ser executada
                            const blockPatterns = ['claude', 'inject.js', 'chrome-extension://', 'web_accessible_resources'];
                            
                            // Interceptar console ANTES de qualquer extensão
                            const originalError = console.error;
                            const originalWarn = console.warn;
                            const originalLog = console.log;
                            
                            const shouldBlock = (message) => {
                                const msg = String(message).toLowerCase();
                                return blockPatterns.some(pattern => msg.includes(pattern));
                            };
                            
                            console.error = function(...args) {
                                if (shouldBlock(args.join(' '))) return;
                                originalError.apply(console, args);
                            };
                            
                            console.warn = function(...args) {
                                if (shouldBlock(args.join(' '))) return;
                                originalWarn.apply(console, args);
                            };
                            
                            console.log = function(...args) {
                                if (shouldBlock(args.join(' '))) return;
                                originalLog.apply(console, args);
                            };
                            
                            // Bloquear erros ANTES que sejam lançados
                            const errorHandler = function(e) {
                                const msg = (e.message || '').toLowerCase();
                                const src = (e.filename || e.source || '').toLowerCase();
                                if (shouldBlock(msg) || shouldBlock(src)) {
                                    e.stopImmediatePropagation();
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }
                            };
                            
                            window.addEventListener('error', errorHandler, true);
                            window.addEventListener('unhandledrejection', function(e) {
                                const reason = String(e.reason || '').toLowerCase();
                                if (shouldBlock(reason)) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }
                            }, true);
                            
                            // Bloquear tentativas de injeção de scripts
                            const observer = new MutationObserver(function(mutations) {
                                mutations.forEach(function(mutation) {
                                    mutation.addedNodes.forEach(function(node) {
                                        if (node.nodeType === 1) {
                                            const id = (node.id || '').toLowerCase();
                                            const className = (node.className || '').toLowerCase();
                                            if (shouldBlock(id) || shouldBlock(className)) {
                                                node.remove();
                                            }
                                        }
                                    });
                                });
                            });
                            
                            observer.observe(document.documentElement, {
                                childList: true,
                                subtree: true
                            });
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
"use strict";(()=>{var e={};e.id=660,e.ids=[660],e.modules={1070:(e,o,s)=>{s.r(o),s.d(o,{default:()=>t});var r=s(997),n=s(6859);function t(){return(0,r.jsxs)(n.Html,{lang:"pt",children:[(0,r.jsxs)(n.Head,{children:[r.jsx("title",{children:"Portif\xf3lio"}),r.jsx("link",{rel:"icon",type:"image/png",href:"/images/icons/DevIco.png"}),r.jsx("link",{rel:"shortcut icon",type:"image/png",href:"/images/icons/DevIco.png"}),r.jsx("link",{rel:"apple-touch-icon",href:"/images/icons/DevIco.png"}),r.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap",rel:"stylesheet"}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`
                        // BLOQUEAR COMPLETAMENTE EXTENS\xd5ES DO NAVEGADOR (Claude, etc)
                        (function() {
                            // Bloquear ANTES de qualquer coisa ser executada
                            const blockPatterns = ['claude', 'inject.js', 'chrome-extension://', 'web_accessible_resources'];
                            
                            // Interceptar console ANTES de qualquer extens\xe3o
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
                            
                            // Bloquear erros ANTES que sejam lan\xe7ados
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
                            
                            // Bloquear tentativas de inje\xe7\xe3o de scripts
                            const observer = new MutationObserver(function(mutations) {
                                mutations.forEach(function(mutation) {
                                    mutation.addedNodes.forEach(function(node) {
                                        if (node.nodeType === 1) {
                                            const id = (node.id || '').toLowerCase();
                                            // Tratar corretamente className para elementos SVG
                                            let className = '';
                                            if (typeof node.className === 'string') {
                                                className = node.className.toLowerCase();
                                            } else if (node.className && typeof node.className.baseVal === 'string') {
                                                // SVGAnimatedString (elementos SVG)
                                                className = node.className.baseVal.toLowerCase();
                                            }
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
                    `}})]}),(0,r.jsxs)("body",{children:[r.jsx(n.Main,{}),r.jsx(n.NextScript,{})]})]})}s(6689)},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var o=require("../webpack-runtime.js");o.C(e);var s=e=>o(o.s=e),r=o.X(0,[859],()=>s(1070));module.exports=r})();
"use strict";(()=>{var e={};e.id=660,e.ids=[660],e.modules={1070:(e,s,r)=>{r.r(s),r.d(s,{default:()=>o});var n=r(997),i=r(6859);function o(){return(0,n.jsxs)(i.Html,{lang:"pt",children:[(0,n.jsxs)(i.Head,{children:[n.jsx("title",{children:"Portif\xf3lio"}),n.jsx("link",{rel:"icon",type:"image/png",href:"/images/icons/DevIco.png"}),n.jsx("link",{rel:"shortcut icon",type:"image/png",href:"/images/icons/DevIco.png"}),n.jsx("link",{rel:"apple-touch-icon",href:"/images/icons/DevIco.png"}),n.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap",rel:"stylesheet"}),n.jsx("script",{dangerouslySetInnerHTML:{__html:`
                        // Prevenir que extens\xf5es do navegador causem erros
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
                                    return; // Silenciar erros de extens\xf5es
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
                                    return; // Silenciar avisos de extens\xf5es
                                }
                                originalWarn.apply(console, args);
                            };
                            
                            // Prevenir erros globais de extens\xf5es
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
                    `}})]}),(0,n.jsxs)("body",{children:[n.jsx(i.Main,{}),n.jsx(i.NextScript,{})]})]})}r(6689)},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var s=require("../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),n=s.X(0,[859],()=>r(1070));module.exports=n})();
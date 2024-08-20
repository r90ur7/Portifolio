"use strict";(()=>{var e={};e.id=820,e.ids=[820,888,660],e.modules={1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},6968:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>g,default:()=>c,getServerSideProps:()=>h,getStaticPaths:()=>f,getStaticProps:()=>p,reportWebVitals:()=>y,routeModule:()=>v,unstable_getServerProps:()=>P,unstable_getServerSideProps:()=>_,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>x,unstable_getStaticProps:()=>m});var o=r(7093),a=r(5244),i=r(1323),l=r(1070),s=r(3893),d=r(6971),u=e([s]);s=(u.then?(await u)():u)[0];let c=(0,i.l)(d,"default"),p=(0,i.l)(d,"getStaticProps"),f=(0,i.l)(d,"getStaticPaths"),h=(0,i.l)(d,"getServerSideProps"),g=(0,i.l)(d,"config"),y=(0,i.l)(d,"reportWebVitals"),m=(0,i.l)(d,"unstable_getStaticProps"),x=(0,i.l)(d,"unstable_getStaticPaths"),b=(0,i.l)(d,"unstable_getStaticParams"),P=(0,i.l)(d,"unstable_getServerProps"),_=(0,i.l)(d,"unstable_getServerSideProps"),v=new o.PagesRouteModule({definition:{kind:a.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:s.default,Document:l.default},userland:d});n()}catch(e){n(e)}})},6971:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let n=r(167),o=r(997),a=n._(r(6689)),i=n._(r(7828)),l={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function s(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let d={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class u extends a.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||l[e]||"An unexpected error has occurred";return(0,o.jsxs)("div",{style:d.error,children:[(0,o.jsx)(i.default,{children:(0,o.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,o.jsxs)("div",{style:d.desc,children:[(0,o.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,o.jsx)("h1",{className:"next-error-h1",style:d.h1,children:e}):null,(0,o.jsx)("div",{style:d.wrap,children:(0,o.jsxs)("h2",{style:d.h2,children:[this.props.title||e?r:(0,o.jsx)(o.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}u.displayName="ErrorPage",u.getInitialProps=s,u.origGetInitialProps=s,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5495:(e,t)=>{function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},7828:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return g},defaultHead:function(){return c}});let n=r(167),o=r(8760),a=r(997),i=o._(r(6689)),l=n._(r(7215)),s=r(8039),d=r(1988),u=r(5495);function c(e){void 0===e&&(e=!1);let t=[(0,a.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,a.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(1997);let f=["name","httpEquiv","charSet","itemProp"];function h(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return o=>{let a=!0,i=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){i=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?a=!1:r.add(t);else{let e=o.props[t],r=n[t]||new Set;("name"!==t||!i)&&r.has(e)?a=!1:(r.add(e),n[t]=r)}}}}return a}}()).reverse().map((e,t)=>{let n=e.key||t;if(!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,i.default.cloneElement(e,t)}return i.default.cloneElement(e,{key:n})})}let g=function(e){let{children:t}=e,r=(0,i.useContext)(s.AmpStateContext),n=(0,i.useContext)(d.HeadManagerContext);return(0,a.jsx)(l.default,{reduceComponentsToState:h,headManager:n,inAmpMode:(0,u.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7215:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}});let n=r(6689),o=()=>{},a=()=>{};function i(e){var t;let{headManager:r,reduceComponentsToState:i}=e;function l(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(i(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),l(),o(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),o(()=>(r&&(r._pendingUpdate=l),()=>{r&&(r._pendingUpdate=l)})),a(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},1997:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},3893:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>c});var o=r(997),a=r(2210),i=r(5553);r(6689);var l=r(9752),s=r(7451),d=e([a,l,s]);[a,l,s]=d.then?(await d)():d;let u=(0,a.extendTheme)({colors:{brand:{50:"#E9D8FD",100:"#D6BCFA",200:"#B794F4",300:"#9F7AEA",400:"#805AD5",500:"#6B46C1",600:"#553C9A",700:"#44337A",800:"#322659",900:"#21183C"}}}),c=function({Component:e,pageProps:t}){return(0,o.jsxs)(a.ChakraProvider,{theme:u,children:[o.jsx(l.Analytics,{}),o.jsx(s.SpeedInsights,{}),o.jsx(e,{...t})]})};(0,i.Z)(),n()}catch(e){n(e)}})},1070:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(997),o=r(6859);function a(){return(0,n.jsxs)(o.Html,{lang:"pt",children:[n.jsx(o.Head,{children:n.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap",rel:"stylesheet"})}),(0,n.jsxs)("body",{children:[n.jsx(o.Main,{}),n.jsx(o.NextScript,{})]})]})}r(6689)},5553:(e,t,r)=>{r.d(t,{Z:()=>n});let n=e=>{e&&e instanceof Function&&Promise.resolve().then(r.t.bind(r,4032,23)).then(({getCLS:t,getFID:r,getFCP:n,getLCP:o,getTTFB:a})=>{t(e),r(e),n(e),o(e),a(e)})}},5244:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},8039:(e,t,r)=>{e.exports=r(7093).vendored.contexts.AmpContext},1988:(e,t,r)=>{e.exports=r(7093).vendored.contexts.HeadManagerContext},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},4032:e=>{e.exports=require("web-vitals")},2210:e=>{e.exports=import("@chakra-ui/react")},9752:e=>{e.exports=import("@vercel/analytics/react")},7451:e=>{e.exports=import("@vercel/speed-insights/next")},1017:e=>{e.exports=require("path")},8760:(e,t)=>{function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=t._interop_require_wildcard=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var o={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var l=a?Object.getOwnPropertyDescriptor(e,i):null;l&&(l.get||l.set)?Object.defineProperty(o,i,l):o[i]=e[i]}return o.default=e,n&&n.set(e,o),o}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[859],()=>r(6968));module.exports=n})();
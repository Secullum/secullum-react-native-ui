(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"./docs/components/Link.mdx":function(e,n,t){"use strict";t.r(n);var o=t("./node_modules/react/index.js"),r=t.n(o),s=t("./node_modules/@mdx-js/tag/dist/index.js"),a=t("./node_modules/docz/dist/index.m.js"),p=t("./src/components/Link.tsx");function c(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)t=s[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)t=s[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}n.default=function(e){var n=e.components,t=c(e,["components"]);return r.a.createElement(s.MDXTag,{name:"wrapper",components:n},r.a.createElement(s.MDXTag,{name:"h1",components:n,props:{id:"link"}},"Link"),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"properties"}},"Properties"),r.a.createElement(a.PropsTable,{of:p.a}),r.a.createElement(s.MDXTag,{name:"h2",components:n,props:{id:"example"}},"Example"),r.a.createElement(a.Playground,{__position:1,__code:"<Link text=\"Go to...\" onPress={() => alert('press')} />",__scope:{props:t,Link:p.a}},r.a.createElement(p.a,{text:"Go to...",onPress:function(){return alert("press")}})))}}}]);
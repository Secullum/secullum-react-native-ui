(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./docs/components/AppShell.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),l=n("./node_modules/@mdx-js/tag/dist/index.js"),p=n("./node_modules/docz/dist/index.m.js"),s=n("./src/components/AppShell.tsx"),a=n("./docs/img/logo.png"),i=n.n(a);function m(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components,n=m(e,["components"]);return r.a.createElement(l.MDXTag,{name:"wrapper",components:t},r.a.createElement(l.MDXTag,{name:"h1",components:t,props:{id:"appshell"}},"AppShell"),r.a.createElement(l.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),r.a.createElement(p.PropsTable,{of:s.a}),r.a.createElement(l.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(p.Playground,{__position:1,__code:"<AppShell\n  logoHeader={logo}\n  logoMenu={logo}\n  title=\"App Title\"\n  greeting=\"Hello, user.\"\n  screenTitle=\"Screen Title\"\n  menu={[\n    { text: 'Home', path: 'Home' },\n    {\n      text: 'Registers',\n      textStyle: { color: 'red' },\n      submenu: [\n        {\n          text: 'Companies',\n          path: 'Companies',\n          textStyle: { color: 'green' },\n        },\n        { text: 'Employees', path: 'Employees' },\n      ],\n    },\n    {\n      text: 'Settings',\n      path: 'Settings',\n      subText: 'soon',\n      textStyle: { color: 'blue' },\n    },\n    { text: 'About', path: 'About' },\n  ]}\n  onMenuPress={path => alert(path)}\n  isCurrentMenuPath={path => path === 'Home'}\n/>",__scope:{props:n,AppShell:s.a,logo:i.a}},r.a.createElement(s.a,{logoHeader:i.a,logoMenu:i.a,title:"App Title",greeting:"Hello, user.",screenTitle:"Screen Title",menu:[{text:"Home",path:"Home"},{text:"Registers",textStyle:{color:"red"},submenu:[{text:"Companies",path:"Companies",textStyle:{color:"green"}},{text:"Employees",path:"Employees"}]},{text:"Settings",path:"Settings",subText:"soon",textStyle:{color:"blue"}},{text:"About",path:"About"}],onMenuPress:function(e){return alert(e)},isCurrentMenuPath:function(e){return"Home"===e}})))}}}]);
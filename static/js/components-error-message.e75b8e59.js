(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"./docs/components/ErrorMessage.mdx":function(e,t,r){"use strict";r.r(t);var n=r("./node_modules/react/index.js"),o=r.n(n),s=r("./node_modules/@mdx-js/tag/dist/index.js"),a=r("./node_modules/docz/dist/index.m.js"),i=r("./node_modules/react-native-web/dist/exports/StyleSheet/index.js"),c=r("./node_modules/react-native-web/dist/exports/Text/index.js"),l=r("./src/modules/theme.ts");function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){var e,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(r=f(this,(e=m(t)).call.apply(e,[this].concat(o)))).getStyles=function(){var e=Object(l.a)();return i.a.create({errorMessage:{fontFamily:e.fontFamily3,color:e.errorColor}})},r}var r,o,s;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,n["Component"]),r=t,(o=[{key:"render",value:function(){var e=this.props,t=e.message,r=e.style,o=e.nativeID,s=this.getStyles();return t?n.createElement(c.a,{nativeID:o,accessibilityLabel:o,style:[s.errorMessage,r]},t):null}}])&&p(r.prototype,o),s&&p(r,s),t}();try{y.displayName="ErrorMessage",y.__docgenInfo={description:"",displayName:"ErrorMessage",props:{message:{defaultValue:null,description:"",name:"message",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"StyleProp<TextStyle>"}},nativeID:{defaultValue:null,description:"",name:"nativeID",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ErrorMessage.tsx#ErrorMessage"]={docgenInfo:y.__docgenInfo,name:"ErrorMessage",path:"src/components/ErrorMessage.tsx#ErrorMessage"})}catch(e){}function g(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}t.default=function(e){var t=e.components,r=g(e,["components"]);return o.a.createElement(s.MDXTag,{name:"wrapper",components:t},o.a.createElement(s.MDXTag,{name:"h1",components:t,props:{id:"errormessage"}},"ErrorMessage"),o.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),o.a.createElement(a.PropsTable,{of:y}),o.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),o.a.createElement(a.Playground,{__position:1,__code:'<ErrorMessage message="The field is required." />',__scope:{props:r,ErrorMessage:y}},o.a.createElement(y,{message:"The field is required."})))}}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./docs/components/FilePicker.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),i=n("./node_modules/@mdx-js/tag/dist/index.js"),a=n("./node_modules/docz/dist/index.m.js"),c=n("./node_modules/react-native-web/dist/exports/StyleSheet/index.js"),l=n("./node_modules/react-native-web/dist/exports/TouchableOpacity/index.js"),s=n("./node_modules/react-native-web/dist/exports/Text/index.js"),u=n("./node_modules/react-native-vector-icons/FontAwesome.js"),p=n("./src/modules/theme.ts"),d=n("./src/modules/layout.ts");function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function y(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=y(this,(e=b(t)).call.apply(e,[this].concat(r)))).getStyles=function(){var e=Object(p.a)();return c.a.create({container:{borderRadius:3,backgroundColor:e.backgroundColor2,height:100,alignItems:"center",justifyContent:"center"},text:{fontFamily:e.fontFamily1,fontSize:Object(d.a)()?15:12,color:e.textColor3,width:200,textAlign:"center"}})},n}var n,r,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,o["Component"]),n=t,(r=[{key:"render",value:function(){var e=this.props,t=e.label,n=e.onPress,r=e.icon,i=e.nativeID,a=Object(p.a)(),c=this.getStyles();return o.createElement(l.a,{activeOpacity:.5,style:c.container,onPress:n},o.createElement(u.a,{name:r,color:a.textColor3,size:30}),o.createElement(s.a,{nativeID:i,style:c.text},t))}}])&&m(n.prototype,r),i&&m(n,i),t}();v.defaultProps={icon:"cloud-upload"};try{v.displayName="FilePicker",v.__docgenInfo={description:"",displayName:"FilePicker",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},onPress:{defaultValue:null,description:"",name:"onPress",required:!0,type:{name:"() => void"}},icon:{defaultValue:{value:"cloud-upload"},description:"",name:"icon",required:!1,type:{name:"string"}},nativeID:{defaultValue:null,description:"",name:"nativeID",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/FilePicker.tsx#FilePicker"]={docgenInfo:v.__docgenInfo,name:"FilePicker",path:"src/components/FilePicker.tsx#FilePicker"})}catch(e){}function O(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components,n=O(e,["components"]);return r.a.createElement(i.MDXTag,{name:"wrapper",components:t},r.a.createElement(i.MDXTag,{name:"h1",components:t,props:{id:"filepicker"}},"FilePicker"),r.a.createElement(i.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),r.a.createElement(a.PropsTable,{of:v}),r.a.createElement(i.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(a.Playground,{__position:1,__code:"<FilePicker label=\"label\" onPress={() => alert('select file')} />",__scope:{props:n,FilePicker:v}},r.a.createElement(v,{label:"label",onPress:function(){return alert("select file")}})))}}}]);
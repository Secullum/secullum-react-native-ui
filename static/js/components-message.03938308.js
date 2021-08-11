(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"./docs/components/Message.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/@mdx-js/tag/dist/index.js"),s=n("./node_modules/docz/dist/index.m.js"),i=n("./node_modules/react-native-web/dist/exports/StyleSheet/index.js"),l=n("./node_modules/react-native-web/dist/exports/View/index.js"),c=n("./node_modules/react-native-web/dist/exports/Text/index.js"),u=n("./node_modules/react-native-vector-icons/FontAwesome.js"),p=n("./src/components/Modal.tsx"),f=n("./src/modules/theme.ts"),m=n("./src/modules/layout.ts");function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function b(e,t){return!t||"object"!==y(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=b(this,(e=g(t)).call.apply(e,[this].concat(r)))).getStyles=function(){var e=Object(f.a)();return i.a.create({overlay:{alignItems:"center"},container:{backgroundColor:e.backgroundColor1,borderRadius:6,padding:Object(m.a)()?25:16,width:Object(m.a)()?350:250,marginTop:Object(m.a)()?250:140,alignItems:"center"},text:{color:e.messageTextColor,fontFamily:e.fontFamily1,fontSize:Object(m.a)()?25:16,textAlign:"center",marginTop:Object(m.a)()?15:5,width:"100%"}})},n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,o["Component"]),n=t,(r=[{key:"render",value:function(){var e=this.props,t=e.message,n=e.visible,r=e.type,a=e.onRequestClose,s=e.nativeID,i=e.textStyle,y=this.getStyles(),d=Object(f.a)();return o.createElement(p.a,{visible:n,onRequestClose:a,overlayStyle:y.overlay},o.createElement(l.a,{nativeID:s,style:y.container},o.createElement(u.a,{name:"warning"===r?"warning":"check-circle",color:"warning"===r?d.warningColor:d.successColor,size:Object(m.a)()?52:42}),o.createElement(c.a,{style:[y.text,i]},t)))}}])&&d(n.prototype,r),a&&d(n,a),t}();h.defaultProps={type:"info"};try{h.displayName="Message",h.__docgenInfo={description:"",displayName:"Message",props:{message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}},visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},type:{defaultValue:{value:"info"},description:"",name:"type",required:!1,type:{name:'"info" | "warning"'}},onRequestClose:{defaultValue:null,description:"",name:"onRequestClose",required:!1,type:{name:"() => void"}},nativeID:{defaultValue:null,description:"",name:"nativeID",required:!1,type:{name:"string"}},textStyle:{defaultValue:null,description:"",name:"textStyle",required:!1,type:{name:"StyleProp<TextStyle>"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Message.tsx#Message"]={docgenInfo:h.__docgenInfo,name:"Message",path:"src/components/Message.tsx#Message"})}catch(e){}function w(e){return(w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function S(e,t){return!t||"object"!==w(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components,n=x(e,["components"]);return r.a.createElement(a.MDXTag,{name:"wrapper",components:t},r.a.createElement(a.MDXTag,{name:"h1",components:t,props:{id:"message"}},"Message"),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),r.a.createElement(s.PropsTable,{of:h}),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(s.Playground,{__position:1,__code:'{() => {\n  class MessageExample extends React.Component {\n    constructor() {\n      this.state = {\n        messageVisible: true,\n      }\n    }\n    render() {\n      return (\n        <Message\n          message="This is a message"\n          type="warning"\n          visible={this.state.messageVisible}\n          onRequestClose={() => this.setState({ messageVisible: false })}\n        />\n      )\n    }\n  }\n\n  return <MessageExample />\n}}',__scope:{props:n,Message:h}},function(){var e=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(void 0).state={messageVisible:!0},S(void 0)}var n,o,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){var e=this;return r.a.createElement(h,{message:"This is a message",type:"warning",visible:this.state.messageVisible,onRequestClose:function(){return e.setState({messageVisible:!1})}})}}])&&O(n.prototype,o),a&&O(n,a),t}();return r.a.createElement(e,null)}))}}}]);
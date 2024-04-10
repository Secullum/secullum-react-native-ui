(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"./docs/components/Question.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/@mdx-js/tag/dist/index.js"),i=n("./node_modules/docz/dist/index.m.js"),s=n("./node_modules/react-native-vector-icons/FontAwesome.js"),l=n("./src/modules/theme.ts"),c=n("./src/modules/layout.ts"),u=n("./src/components/Button.tsx"),p=n("./src/components/Space.tsx"),f=n("./node_modules/react-native-web/dist/exports/StyleSheet/index.js"),m=n("./node_modules/react-native-web/dist/exports/Modal/index.js"),y=n("./node_modules/react-native-web/dist/exports/View/index.js"),d=n("./node_modules/react-native-web/dist/exports/Text/index.js");function b(e){return(b="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t){return!t||"object"!==b(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=g(this,(e=v(t)).call.apply(e,[this].concat(r)))).getStyles=function(){var e=Object(l.a)();return f.a.create({botoesAcao:{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",width:"100%"},overlay:{flex:1,backgroundColor:"rgba(33, 33, 33, 0.7)",alignItems:"center"},text:{color:e.questionTextColor,fontFamily:e.fontFamily1,fontSize:Object(c.a)()?25:16,textAlign:"center",marginTop:Object(c.a)()?15:5,width:"100%"},container:{backgroundColor:e.backgroundColor1,borderRadius:6,padding:Object(c.a)()?25:16,width:Object(c.a)()?350:250,marginTop:Object(c.a)()?250:140,alignItems:"center"},icon:{color:e.textColor3,fontSize:Object(c.a)()?52:42}})},n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,o["Component"]),n=t,(r=[{key:"render",value:function(){var e=this.props,t=e.message,n=e.textStyle,r=e.visible,a=e.nativeID,i=e.okButton,l=e.cancelButton,f=this.getStyles();return o.createElement(m.a,{animationType:"fade",transparent:!0,visible:r},o.createElement(y.a,{style:[f.overlay],nativeID:a},o.createElement(y.a,{style:f.container},o.createElement(s.a,{name:"question-circle",style:f.icon}),o.createElement(d.a,{style:[f.text,n]},t),o.createElement(p.a,null),o.createElement(y.a,{style:f.botoesAcao},o.createElement(u.a,{text:l.text,onPress:l.onPress,style:[{flex:1,marginRight:Object(c.a)()?13:8},l.style],textStyle:l.textStyle,primary:!1,nativeID:l.nativeID}),o.createElement(u.a,{text:i.text,onPress:i.onPress,style:[{flex:1,marginLeft:Object(c.a)()?13:8},i.style],textStyle:i.textStyle,primary:!0,nativeID:i.nativeID})))))}}])&&x(n.prototype,r),a&&x(n,a),t}();try{h.displayName="Question",h.__docgenInfo={description:"",displayName:"Question",props:{message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}},visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},nativeID:{defaultValue:null,description:"",name:"nativeID",required:!1,type:{name:"string"}},textStyle:{defaultValue:null,description:"",name:"textStyle",required:!1,type:{name:"StyleProp<TextStyle>"}},okButton:{defaultValue:null,description:"",name:"okButton",required:!0,type:{name:"{ text: string; onPress: () => void; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>; nativeID?: string; }"}},cancelButton:{defaultValue:null,description:"",name:"cancelButton",required:!0,type:{name:"{ text: string; onPress: () => void; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>; nativeID?: string; }"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Question.tsx#Question"]={docgenInfo:h.__docgenInfo,name:"Question",path:"src/components/Question.tsx#Question"})}catch(e){}function O(e){return(O="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function j(e,t){return!t||"object"!==O(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components,n=E(e,["components"]);return r.a.createElement(a.MDXTag,{name:"wrapper",components:t},r.a.createElement(a.MDXTag,{name:"h1",components:t,props:{id:"question"}},"Question"),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),r.a.createElement(i.PropsTable,{of:h}),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(i.Playground,{__position:1,__code:"{() => {\n  class QuestionExample extends React.Component {\n    constructor() {\n      this.state = {\n        messageVisible: true,\n      }\n    }\n    render() {\n      return (\n        <Question\n          message=\"This is a message\"\n          type=\"question\"\n          visible={this.state.messageVisible}\n          okButton={{\n            text: 'OK',\n            onPress: () => {\n              alert('OK Button Pressed')\n            },\n          }}\n          cancelButton={{\n            text: 'Cancel',\n            onPress: () => {\n              this.setState({ messageVisible: false })\n            },\n          }}\n        />\n      )\n    }\n  }\n\n  return <QuestionExample />\n}}",__scope:{props:n,Question:h}},function(){var e=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(void 0).state={messageVisible:!0},j(void 0)}var n,o,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){var e=this;return r.a.createElement(h,{message:"This is a message",type:"question",visible:this.state.messageVisible,okButton:{text:"OK",onPress:function(){alert("OK Button Pressed")}},cancelButton:{text:"Cancel",onPress:function(){e.setState({messageVisible:!1})}}})}}])&&w(n.prototype,o),a&&w(n,a),t}();return r.a.createElement(e,null)}))}}}]);
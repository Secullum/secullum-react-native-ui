(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"./docs/components/DatePicker.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/@mdx-js/tag/dist/index.js"),i=n("./node_modules/docz/dist/index.m.js"),l=n("./node_modules/react-native-web/dist/exports/View/index.js"),c=n("./src/modules/theme.ts"),s=n("./src/modules/layout.ts"),u=n("./src/modules/format.ts"),d=n("./src/components/ImageButton.tsx"),p=n("./src/components/Modal.tsx"),f=n("./node_modules/react-date-range/dist/index.js"),m=n("./node_modules/react-native-web/dist/exports/StyleSheet/index.js"),y=n("./node_modules/react-native-web/dist/exports/TouchableWithoutFeedback/index.js"),b=n("./node_modules/react-native-web/dist/exports/Text/index.js");n("./node_modules/react-date-range/dist/styles.css"),n("./styles/RangeDatePicker.css");function h(e){return(h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t){return!t||"object"!==h(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var x=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=g(this,(e=w(t)).call.apply(e,[this].concat(a)))).state={showModal:!1},n.calendarRef=o.createRef(),n.handleClick=function(e){n.calendarRef.current&&!n.calendarRef.current.contains(e.target)&&n.setState({showModal:!1})},n.handlePress=function(){n.setState({showModal:!0})},n.handleClear=function(){n.props.onChange(void 0)},n.handleConfirm=function(e){n.props.onChange(e),n.setState({showModal:!1})},n.getStyles=function(){var e=Object(c.a)();return m.a.create({container:{paddingLeft:16,paddingRight:4,paddingVertical:8,borderWidth:1,borderColor:e.borderColor1,borderRadius:3,flexDirection:"row",alignItems:"center"},modalOverlay:{justifyContent:"center",alignItems:"center"},label:{color:e.textColor2,fontFamily:"Lato-Regular",fontSize:Object(s.a)()?15:12,lineHeight:16},value:{color:e.textColor1,fontFamily:"Lato-Bold",fontSize:16,lineHeight:22,minHeight:22},clearIcon:{borderWidth:0,marginLeft:"auto"}})},n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,o["Component"]),n=t,(r=[{key:"componentWillMount",value:function(){document.addEventListener("mousedown",this.handleClick,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClick,!1)}},{key:"render",value:function(){var e=this.props,t=e.label,n=e.value,r=e.clearable,a=e.style,i=e.dateFormat,s=e.nativeID,m=this.getStyles(),h=Object(c.a)();return o.createElement(y.a,{onPress:this.handlePress},o.createElement(l.a,{nativeID:s,style:[m.container,a]},o.createElement(l.a,{ref:function(e){return e&&e.setNativeProps({id:"date-picker"})}},o.createElement(b.a,{style:m.label},t),o.createElement(b.a,{style:m.value},void 0!=n?Object(u.a)(n,i):"")),o.createElement(d.a,{icon:n&&r?"times":"calendar",style:m.clearIcon,iconColor:n&&r?h.textColor1:h.textColor2,onPress:n&&r?this.handleClear:this.handlePress,hitBoxSize:30}),o.createElement(p.a,{visible:this.state.showModal,overlayStyle:m.modalOverlay},o.createElement("div",{ref:this.calendarRef,style:{borderRadius:"5px",position:"absolute",top:"50%",marginTop:"-150px"}},o.createElement(f.Calendar,{locale:Object(u.b)(),date:n,onChange:this.handleConfirm})))))}}])&&v(n.prototype,r),a&&v(n,a),t}();x.defaultProps={clearable:!0,dateFormat:"dddd, DD/MM/YYYY"};try{x.displayName="DatePicker",x.__docgenInfo={description:"",displayName:"DatePicker",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"Date"}},clearable:{defaultValue:{value:"true"},description:"",name:"clearable",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value?: Date) => void"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"StyleProp<ViewStyle>"}},dateFormat:{defaultValue:{value:"dddd, DD/MM/YYYY"},description:"",name:"dateFormat",required:!0,type:{name:"string"}},nativeID:{defaultValue:null,description:"",name:"nativeID",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/DatePicker.web.tsx#DatePicker"]={docgenInfo:x.__docgenInfo,name:"DatePicker",path:"src/components/DatePicker.web.tsx#DatePicker"})}catch(e){}function O(e){return(O="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function E(e,t){return!t||"object"!==O(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components,n=D(e,["components"]);return r.a.createElement(a.MDXTag,{name:"wrapper",components:t},r.a.createElement(a.MDXTag,{name:"h1",components:t,props:{id:"datepicker"}},"DatePicker"),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),r.a.createElement(i.PropsTable,{of:x}),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(i.Playground,{__position:1,__code:'{() => {\n  class DatePickerExample extends React.Component {\n    constructor() {\n      this.state = {\n        date: new Date(1990, 9, 1),\n      }\n    }\n    render() {\n      return (\n        <View style={{ height: 350 }}>\n          <DatePicker\n            label="Date"\n            value={this.state.date}\n            onChange={date => this.setState({ date })}\n          />\n        </View>\n      )\n    }\n  }\n\n  return <DatePickerExample />\n}}',__scope:{props:n,View:l.a,DatePicker:x}},function(){var e=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(void 0).state={date:new Date(1990,9,1)},E(void 0)}var n,o,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){var e=this;return r.a.createElement(l.a,{style:{height:350}},r.a.createElement(x,{label:"Date",value:this.state.date,onChange:function(t){return e.setState({date:t})}}))}}])&&_(n.prototype,o),a&&_(n,a),t}();return r.a.createElement(e,null)}))}}}]);
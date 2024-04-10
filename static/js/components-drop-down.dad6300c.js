(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./docs/components/DropDown.mdx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),a=n.n(o),r=n("./node_modules/@mdx-js/tag/dist/index.js"),l=n("./node_modules/docz/dist/index.m.js"),i=n("./node_modules/react-native-vector-icons/FontAwesome.js"),c=n("./src/components/Modal.tsx"),s=n("./src/modules/layout.ts"),u=n("./src/modules/theme.ts"),d=n("./node_modules/react-native-web/dist/exports/StyleSheet/index.js"),m=n("./node_modules/react-native-web/dist/exports/View/index.js"),p=n("./node_modules/react-native-web/dist/exports/Text/index.js"),y=n("./node_modules/react-native-web/dist/exports/TouchableHighlight/index.js"),f=n("./node_modules/react-native-web/dist/exports/Platform/index.js"),b=n("./node_modules/react-native-web/dist/exports/TouchableWithoutFeedback/index.js"),g=n("./node_modules/react-native-web/dist/exports/FlatList/index.js");function w(e){return(w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function S(e,t,n){return t&&D(e.prototype,t),n&&D(e,n),e}function x(e,t){return!t||"object"!==w(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var j=function(e){function t(){var e,n;h(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=x(this,(e=O(t)).call.apply(e,[this].concat(r)))).getStyles=function(){var e=Object(u.a)();return d.a.create({modalItem:{paddingHorizontal:16,paddingVertical:16,fontFamily:e.fontFamily1,fontSize:16,color:e.dropDownTextColor},icon:{fontSize:26},rowView:{flexDirection:"row"},iconView:{width:100,alignItems:"center",justifyContent:"center"},iconOnlyView:{width:200,alignItems:"center",justifyContent:"center"},iconOnly:{paddingHorizontal:16,paddingVertical:16,fontSize:60}})},n.renderOpenDropDownItem=function(){var e=n.props,t=e.label,a=e.icon,r=e.iconComponent,l=e.nativeID,c=Object(u.a)(),s=n.getStyles();return t&&a?o.createElement(m.a,{nativeID:l,style:s.rowView},o.createElement(m.a,{style:s.iconView},r?o.createElement(r,{name:a,style:s.icon,color:c.textColor1}):o.createElement(i.a,{name:a,color:c.textColor1,style:s.icon})),o.createElement(m.a,null,o.createElement(p.a,{style:s.modalItem},t))):t&&!a?o.createElement(m.a,{nativeID:l,style:s.rowView},o.createElement(p.a,{style:s.modalItem},t)):!t&&a?o.createElement(m.a,{nativeID:l,style:s.iconOnlyView},r?o.createElement(r,{name:a,style:s.iconOnly,color:c.textColor1}):o.createElement(i.a,{name:a,color:c.textColor1,style:s.iconOnly})):null},n}return E(t,o["PureComponent"]),S(t,[{key:"render",value:function(){var e=this.props,t=e.first,n=e.last,a=e.value,r=e.onPress,l=e.nativeID,i=Object(u.a)();return o.createElement(y.a,{onPress:function(){return r(a)},accessibilityLabel:l,underlayColor:i.backgroundColor2,style:{borderTopLeftRadius:t?5:0,borderTopRightRadius:t?5:0,borderBottomLeftRadius:n?5:0,borderBottomRightRadius:n?5:0}},this.renderOpenDropDownItem())}}]),t}(),I=function(e){function t(){var e,n;h(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=x(this,(e=O(t)).call.apply(e,[this].concat(r)))).state={modalOpen:!1},n.handleItemPress=function(e){var t=n.props.onChange;n.setState({modalOpen:!1}),t(e)},n.renderClosedDropDown=function(e,t){var a=n.props.iconComponent,r=Object(u.a)(),l=n.getStyles();return e?e.label&&e.icon?o.createElement(o.Fragment,null,o.createElement(m.a,{style:l.rowView},o.createElement(m.a,{style:l.iconView},a?o.createElement(a,{name:e.icon,style:l.icon,color:r.textColor1}):o.createElement(i.a,{name:e.icon,color:r.textColor1,style:l.icon})),o.createElement(p.a,{style:[l.textIcon,t]},e.label)),o.createElement(i.a,{name:"caret-down",style:l.seta})):e.label&&!e.icon?o.createElement(o.Fragment,null,o.createElement(p.a,{style:[l.text,t]},e.label),o.createElement(i.a,{name:"caret-down",style:l.seta})):!e.label&&e.icon?o.createElement(o.Fragment,null,a?o.createElement(a,{name:e.icon,style:l.iconOnly,color:r.textColor1}):o.createElement(i.a,{name:e.icon,color:r.textColor1,style:l.iconOnly}),o.createElement(i.a,{name:"caret-down",style:l.setaIcone})):null:o.createElement(o.Fragment,null,o.createElement(p.a,{style:[l.text,t]},"-"),o.createElement(i.a,{name:"caret-down",style:l.seta}))},n.getStyles=function(){var e=Object(u.a)(),t=n.props.icon;return d.a.create({container:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){v(e,t,n[t])})}return e}({paddingHorizontal:16,paddingVertical:8,borderWidth:1,borderColor:e.borderColor1,borderRadius:3},t?{flexDirection:"row",minHeight:"web"===f.a.OS||"ios"===f.a.OS?40:46}:{}),label:{color:e.textColor2,fontFamily:e.fontFamily3,fontSize:Object(s.a)()?15:12,lineHeight:16},text:{lineHeight:Object(s.a)()?28:22,minHeight:Object(s.a)()?28:22,textAlignVertical:"center",color:e.textColor1,fontFamily:e.fontFamily1,fontSize:16},textIcon:{height:27,alignSelf:"center",color:e.textColor1,fontFamily:e.fontFamily1,fontSize:16},seta:{color:e.textColor1,fontSize:16,position:"absolute",bottom:10,right:16},setaIcone:{color:e.textColor1,fontSize:16,position:"absolute",bottom:25,right:16},modalOverlay:{justifyContent:"center"},modalContainer:{borderRadius:5,backgroundColor:e.backgroundColor1,margin:16},modalItem:{paddingHorizontal:16,paddingVertical:16,fontFamily:e.fontFamily1,fontSize:16},emptyMessageContainer:{flexDirection:"row",alignItems:"center",paddingHorizontal:16},readonly:{backgroundColor:e.disabledColor},icon:{fontSize:26},rowView:{flexDirection:"row"},iconView:{width:50,alignItems:"center"},iconOnlyView:{width:200,alignItems:"center",justifyContent:"center"},iconOnly:{paddingHorizontal:16,paddingVertical:8,fontSize:26},iconOnLine:{color:e.textColor2,fontSize:Object(s.a)()?21:19,marginRight:10,minWidth:25,textAlignVertical:"center",flex:0}})},n}return E(t,o["Component"]),S(t,[{key:"render",value:function(){var e=this,t=this.state.modalOpen,n=this.props,a=n.label,r=n.items,l=n.value,s=n.emptyMessage,d=n.style,y=n.disabled,w=n.labelStyle,v=n.inputStyle,h=n.iconComponent,D=n.nativeID,S=n.icon,x=r.find(function(e){return e.value===l}),O=this.getStyles(),E=Object(u.a)();return o.createElement(b.a,{onPress:function(){return e.setState({modalOpen:!0})},disabled:y},o.createElement(m.a,{nativeID:D,accessibilityLabel:D,style:[O.container,d,y?O.readonly:null]},S?o.createElement(i.a,{name:S,style:O.iconOnLine}):o.createElement(p.a,{style:[O.label,w]},a),this.renderClosedDropDown(x,v),o.createElement(c.a,{visible:t,onRequestClose:function(){return e.setState({modalOpen:!1})},overlayStyle:O.modalOverlay},o.createElement(b.a,null,o.createElement(m.a,{style:[O.modalContainer,"web"===f.a.OS&&{marginVertical:"10px",marginHorizontal:"auto",width:"90%",maxWidth:450,maxHeight:300,justifyContent:"center"}]},r.length>0?o.createElement(g.a,{data:r,initialNumToRender:r.length,keyExtractor:function(e){return e.value.toString()},renderItem:function(t){var n=t.item,a=t.index;return o.createElement(j,{nativeID:n.nativeID,first:0===a,last:a===r.length-1,label:n.label,value:n.value,onPress:e.handleItemPress,icon:n.icon,iconComponent:h})}}):o.createElement(m.a,{style:O.emptyMessageContainer},o.createElement(i.a,{name:"warning",color:E.warningColor,size:24}),o.createElement(p.a,{style:O.modalItem},s)))))))}}]),t}();I.defaultProps={emptyMessage:"N\xe3o h\xe1 registros cadastrados"};try{I.displayName="DropDown",I.__docgenInfo={description:"",displayName:"DropDown",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"{ label: string; value: any; icon?: string; nativeID?: string; }[]"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: any) => void"}},emptyMessage:{defaultValue:{value:"N\xe3o h\xe1 registros cadastrados"},description:"",name:"emptyMessage",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"StyleProp<ViewStyle>"}},labelStyle:{defaultValue:null,description:"",name:"labelStyle",required:!1,type:{name:"StyleProp<TextStyle>"}},inputStyle:{defaultValue:null,description:"",name:"inputStyle",required:!1,type:{name:"StyleProp<TextStyle>"}},iconComponent:{defaultValue:null,description:"",name:"iconComponent",required:!1,type:{name:"ComponentClass<IconProps, any>"}},nativeID:{defaultValue:null,description:"",name:"nativeID",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/DropDown.tsx#DropDown"]={docgenInfo:I.__docgenInfo,name:"DropDown",path:"src/components/DropDown.tsx#DropDown"})}catch(e){}var V=n("./src/components/Space.tsx");function _(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}t.default=function(e){var t=e.components,n=_(e,["components"]);return a.a.createElement(r.MDXTag,{name:"wrapper",components:t},a.a.createElement(r.MDXTag,{name:"h1",components:t,props:{id:"dropdown"}},"DropDown"),a.a.createElement(r.MDXTag,{name:"h2",components:t,props:{id:"properties"}},"Properties"),a.a.createElement(l.PropsTable,{of:I}),a.a.createElement(r.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),a.a.createElement(l.Playground,{__position:1,__code:"<DropDown\n  label=\"DropDown\"\n  items={[{ value: 1, label: 'Fernando' }, { value: 2, label: 'Alex' }]}\n  value={2}\n  onChange={value => alert('Selected ' + value)}\n/>\n<Space />\n<DropDown\n  label=\"DropDown\"\n  items={[\n    { value: 1, label: 'Android', icon: 'android' },\n    { value: 2, label: 'Apple', icon: 'apple' },\n  ]}\n  value={2}\n  onChange={value => alert('Selected ' + value)}\n/>\n<Space />\n<DropDown\n  label=\"DropDown\"\n  items={[\n    { value: 1, label: '', icon: 'android' },\n    { value: 2, label: '', icon: 'apple' },\n  ]}\n  value={2}\n  onChange={value => alert('Selected ' + value)}\n/>",__scope:{props:n,DropDown:I,Space:V.a}},a.a.createElement(I,{label:"DropDown",items:[{value:1,label:"Fernando"},{value:2,label:"Alex"}],value:2,onChange:function(e){return alert("Selected "+e)}}),a.a.createElement(V.a,null),a.a.createElement(I,{label:"DropDown",items:[{value:1,label:"Android",icon:"android"},{value:2,label:"Apple",icon:"apple"}],value:2,onChange:function(e){return alert("Selected "+e)}}),a.a.createElement(V.a,null),a.a.createElement(I,{label:"DropDown",items:[{value:1,label:"",icon:"android"},{value:2,label:"",icon:"apple"}],value:2,onChange:function(e){return alert("Selected "+e)}})))}}}]);
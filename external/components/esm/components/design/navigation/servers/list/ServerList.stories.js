function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){var c=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=c){var d,e,f=[],g=!0,h=!1;try{for(c=c.call(a);!(g=(d=c.next()).done)&&(f.push(d.value),!(b&&f.length===b));g=!0);}catch(a){h=!0,e=a}finally{try{g||null==c["return"]||c["return"]()}finally{if(h)throw e}}return f}}function _arrayWithHoles(a){if(Array.isArray(a))return a}import React,{useCallback,useState}from"react";import{ServerList}from"./ServerList";import{ContextDecorator,InjectMockClient,MaskDecorator}from"../../../../../lib/internal";import{reorder}from"../../../../common";export default{title:"Navigation/Servers/List",component:ServerList,argTypes:{client:{name:"Klay Client",type:"symbol"},servers:{name:"Ordered Servers",type:"symbol"},reorder:{name:"Reordering Function",type:"symbol"},active:{name:"Active Server Id"},linkComponent:{name:"Link Component",type:"symbol"},permit:{name:"Notification Checker",type:"symbol",defaultValue:{isMuted:function isMuted(){return!1}}},home:{name:"Home URL Generator",type:"symbol",defaultValue:function defaultValue(){return"/"}}},decorators:[MaskDecorator,ContextDecorator]};var Template=function(a){return React.createElement(InjectMockClient,null,function(b){var c=b.client,d=useState(_toConsumableArray(c.servers.values())),e=_slicedToArray(d,2),f=e[0],g=e[1],h=useCallback(function(a,b){g(function(c){return reorder(c,a,b)})},[g]);return React.createElement("div",{style:{height:"560px",display:"flex",flexDirection:"row"}},React.createElement(ServerList,_extends({},a,{client:c,servers:f,reorder:h})))})};export var Default=Template.bind({});
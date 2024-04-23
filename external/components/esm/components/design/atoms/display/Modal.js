var _excluded=["children","actions","disabled","onClose","title","description","nonDismissable","registerOnClose","registerOnConfirm","signal"];function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){var c=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=c){var d,e,f=[],g=!0,h=!1;try{for(c=c.call(a);!(g=(d=c.next()).done)&&(f.push(d.value),!(b&&f.length===b));g=!0);}catch(a){h=!0,e=a}finally{try{g||null==c["return"]||c["return"]()}finally{if(h)throw e}}return f}}function _arrayWithHoles(a){if(Array.isArray(a))return a}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}import React,{useCallback,useEffect,useState}from"react";import{createPortal}from"react-dom";import styled,{css}from"styled-components";import{animationFadeIn,animationFadeOut,animationZoomIn,animationZoomOut}from"../../../common/animations";import{H2}from"../heading/H2";import{H4}from"../heading/H4";import{Button}from"../inputs/Button";var Base=styled.div.withConfig({displayName:"Base",componentId:"sc-1d91xkm-0"})(["top:0;left:0;width:100%;height:100%;z-index:9999;position:fixed;max-height:100%;user-select:none;animation-duration:0.2s;animation-fill-mode:forwards;display:grid;overflow-y:auto;place-items:center;color:var(--foreground);background:rgba(0,0,0,0.8);",""],function(a){return a.closing?css(["animation-name:",";> div{animation-name:",";}"],animationFadeOut,animationZoomOut):css(["animation-name:",";"],animationFadeIn)}),Container=styled.div.withConfig({displayName:"Container",componentId:"sc-1d91xkm-1"})(["min-height:200px;max-width:min(calc(100vw - 20px),",");max-height:min( calc(100vh - 20px),"," );margin:20px;display:flex;flex-direction:column;animation-name:",";animation-duration:0.25s;animation-timing-function:cubic-bezier(0.3,0.3,0.18,1.1);"," ",""],function(a){var b;return null!==(b=a.maxWidth)&&void 0!==b?b:"450px"},function(a){var b;return null!==(b=a.maxHeight)&&void 0!==b?b:"650px"},animationZoomIn,function(a){return!a.maxWidth&&css(["width:100%;"])},function(a){return!a.transparent&&css(["overflow:hidden;background:var(--secondary-header);border-radius:var(--border-radius);"])}),Title=styled.div.withConfig({displayName:"Title",componentId:"sc-1d91xkm-2"})(["padding:1rem;flex-shrink:0;word-break:break-word;gap:8px;display:flex;flex-direction:column;"]),Content=styled.div.withConfig({displayName:"Content",componentId:"sc-1d91xkm-3"})(["flex-grow:1;padding-top:0;padding:",";overflow-y:auto;font-size:0.9375rem;display:flex;flex-direction:column;",""],function(a){var b;return null!==(b=a.padding)&&void 0!==b?b:"0 1rem 1rem"},function(a){return!a.transparent&&css(["background:var(--secondary-header);"])}),Actions=styled.div.withConfig({displayName:"Actions",componentId:"sc-1d91xkm-4"})(["flex-shrink:0;gap:8px;display:flex;padding:1rem;flex-direction:row-reverse;background:var(--secondary-background);border-radius:0 0 var(--border-radius) var(--border-radius);"]);export var Modal=function(a){var b=a.children,c=a.actions,d=a.disabled,e=a.onClose,f=a.title,g=a.description,h=a.nonDismissable,i=a.registerOnClose,j=a.registerOnConfirm,k=a.signal,l=_objectWithoutProperties(a,_excluded),m=useState(!1),n=_slicedToArray(m,2),o=n[0],p=n[1],q=useCallback(function(){p(!0),o||setTimeout(function(){return null===e||void 0===e?void 0:e(!0)},200)},[o,l]),r=useCallback(_asyncToGenerator(function*(){var a,b;(yield null===c||void 0===c||null===(a=c.find(function(a){return a.confirmation}))||void 0===a||null===(b=a.onClick)||void 0===b?void 0:b.call(a))&&q()}),[c]);return useEffect(function(){return null===i||void 0===i?void 0:i(q)},[q]),useEffect(function(){return null===j||void 0===j?void 0:j(r)},[r]),useEffect(function(){if("confirm"===k)r();else if(k){if("close"===k&&h)return;q()}},[k]),createPortal(React.createElement(Base,{closing:o,onClick:function onClick(){return!h&&q()}},React.createElement(Container,_extends({},l,{actions:!!c&&0<c.length,onClick:function onClick(a){return a.stopPropagation()}}),(f||g)&&React.createElement(Title,null,f&&React.createElement(H2,null,f),g&&React.createElement(H4,null,g)),React.createElement(Content,l,b),c&&0<c.length&&React.createElement(Actions,null,c.map(function(a,b){return React.createElement(Button,_extends({disabled:d,key:b},a,{onClick:_asyncToGenerator(function*(){(yield a.onClick())&&q()})}))})))),document.body)};
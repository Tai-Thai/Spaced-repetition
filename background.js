!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,n||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}function n(e,n,r){return(n=t(n))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c,l,u,s,f="SEND_VOCAB_LIST_TO_EXTENSION",d="GET_VOCAB_DATA_EXTENSION",b="UPDATE_VOCAB_DATA_EXTENSION",p="ADD_NEW_VOCAB_IN_DATA",y=[];null===(c=chrome.runtime)||void 0===c||null===(l=c.onMessage)||void 0===l||l.addListener((function(e,t,n){switch(e.action){case f:y=e.data.length>y.length?e.data:y,console.log("Received data from website - current data length: ",y.length),n({isSuccess:y===e.data});break;case d:console.log("sr-app: get vocab data from extension"),console.log("current data length: ",y.length),n({data:y});break;case b:console.log("sr-app: update vocab");var r=e.payload,a=y.findIndex((function(e){return e.id===r.id})),c=e.moveToEndOfList||!(e.indexInData&&e.indexInData>=0)?a:e.indexInData;if(console.log({index:a,_index:c,indexRequest:e.indexInData}),a!==c&&console.log("%c++++++++++++++++ Wrong Index was found ++++++++++++++++","color: orange"),e.moveToEndOfList&&a>-1){var l=[].concat(i(y),[o(o({},y[a]),r)]);l.splice(a,1),y=l}else a>-1&&(y[a]=o(o({},y[a]),r));break;case p:console.log("sr-app: add new vocab"),y.unshift(e.payload),console.log("current data length: ",y.length)}})),null===(u=chrome.tabs)||void 0===u||null===(s=u.onActivated)||void 0===s||s.addListener((function(e){var t=e.tabId;console.log("active new tab","sending data..."),chrome.tabs.sendMessage(t,{action:"tab_activated",data:y})}))}();
//# sourceMappingURL=background.js.map
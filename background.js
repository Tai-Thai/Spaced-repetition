!function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e){var n=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,n||"default");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"===t(n)?n:String(n)}function n(t,n,r){return(n=e(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"===typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c,l,u,s,f="SEND_VOCAB_LIST_TO_EXTENSION",d="GET_VOCAB_DATA_EXTENSION",b="UPDATE_VOCAB_DATA_EXTENSION",p="ADD_NEW_VOCAB_IN_DATA",y=[];null===(c=chrome.runtime)||void 0===c||null===(l=c.onMessage)||void 0===l||l.addListener((function(t,e,n){switch(t.action){case f:y=t.data.length>y.length?t.data:y,console.log("Received data from website - current data length: ",y.length),n({isSuccess:y===t.data});break;case d:console.log("sr-app: get vocab data from extension"),console.log("current data length: ",y.length),n({data:y});break;case b:console.log("sr-app: update vocab");var r=t.payload,a=t.moveToEndOfList||!(t.indexInData&&t.indexInData>=0)?y.findIndex((function(t){return t.id===r.id})):t.indexInData;if(console.log({index:a,indexRequest:t.indexInData}),t.moveToEndOfList&&a>-1){var c=[].concat(i(y),[o(o({},y[a]),r)]);c.splice(a,1),y=c}else a>-1&&(y[a]=o(o({},y[a]),r));break;case p:console.log("sr-app: add new vocab"),y.unshift(t.payload),console.log("current data length: ",y.length)}})),null===(u=chrome.tabs)||void 0===u||null===(s=u.onActivated)||void 0===s||s.addListener((function(t){var e=t.tabId;console.log("active new tab","sending data..."),chrome.tabs.sendMessage(e,{action:"tab_activated",data:y})}))}();
//# sourceMappingURL=background.js.map
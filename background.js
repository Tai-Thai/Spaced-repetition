!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,n||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}function n(e,n,r){return(n=t(n))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var a,i,c,l,u="SEND_VOCAB_LIST_TO_EXTENSION",s="GET_VOCAB_DATA_EXTENSION",d="UPDATE_VOCAB_DATA_EXTENSION",b="ADD_NEW_VOCAB_IN_DATA",f=[];null===(a=chrome.runtime)||void 0===a||null===(i=a.onMessage)||void 0===i||i.addListener((function(e,t,n){switch(e.action){case u:f=e.data.length>f.length?e.data:f,console.log("Received data - current data length: ",f.length),n({isSuccess:f===e.data});break;case s:console.log("sr-app: get vocab data from extension"),console.log("current data length: ",f.length),n({data:f});break;case d:console.log("sr-app: update vocab");var r=e.payload,a=e.indexInData&&e.indexInData>=0?e.indexInData:f.findIndex((function(e){return e.id===r.id}));a>-1&&(f[a]=o(o({},f[a]),r));break;case b:console.log("sr-app: add new vocab"),f.unshift(e.payload),console.log("current data length: ",f.length)}})),null===(c=chrome.tabs)||void 0===c||null===(l=c.onActivated)||void 0===l||l.addListener((function(e){var t=e.tabId;console.log("active new tab","sending data..."),chrome.tabs.sendMessage(t,{action:"tab_activated",data:f})}))}();
//# sourceMappingURL=background.js.map
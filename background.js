!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,n||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}function n(e,n,r){return(n=t(n))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var a="SEND_VOCAB_LIST_TO_EXTENSION",c="GET_VOCAB_DATA_EXTENSION",i="UPDATE_VOCAB_DATA_EXTENSION",s="ADD_NEW_VOCAB_IN_DATA",u=[];chrome.runtime.onMessage.addListener((function(e,t,n){switch(e.action){case a:u=e.data,console.log("Received data - current data length: ",u.length),n({isSuccess:!0});break;case c:console.log("sr-app: get vocab data from extension"),console.log("current data length: ",u.length),n({data:u});break;case i:console.log("sr-app: update vocab");var r=e.payload,l=e.indexInData&&e.indexInData>=0?e.indexInData:u.findIndex((function(e){return e.id===r.id}));l>-1&&(u[l]=o(o({},u[l]),r));break;case s:console.log("sr-app: add new vocab"),u.unshift(e.payload),console.log("current data length: ",u.length)}})),chrome.tabs.onActivated.addListener((function(e){var t=e.tabId;console.log("active new tab","sending data..."),chrome.tabs.sendMessage(t,{action:"tab_activated",data:u})}))}();
//# sourceMappingURL=background.js.map
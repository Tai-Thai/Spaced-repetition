!function(){"use strict";var a="SEND_VOCAB_LIST_TO_EXTENSION",e="GET_VOCAB_DATA_EXTENSION",t="UPDATE_VOCAB_DATA_EXTENSION",n="ADD_NEW_VOCAB_IN_DATA",o=[];chrome.runtime.onMessage.addListener((function(c,s,d){switch(c.action){case a:o=c.data,console.log("current data length: ",o.length),d({isSuccess:!0});break;case e:console.log("sr-app: get vocab data from extension"),console.log("current data length: ",o.length),d({data:o});break;case t:console.log("sr-app: update vocab");var r=c.payload,l=c.indexInData||o.findIndex((function(a){return a.id===r.id}));l>-1&&(o[l]=r),console.log("current data length: ",o.length);break;case n:console.log("sr-app: add new vocab"),o.unshift(c.payload),console.log("current data length: ",o.length)}})),chrome.tabs.onActivated.addListener((function(a){var e=a.tabId;console.log("active new tab","sending data..."),chrome.tabs.sendMessage(e,{action:"tab_activated",data:o})}))}();
//# sourceMappingURL=background.js.map
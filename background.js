!function(){"use strict";var e="GET_VOCAB_DATA_EXTENSION",s="UPDATE_VOCAB_DATA_EXTENSION",a="ADD_NEW_VOCAB_IN_DATA",i=[{id:"05wvboUfT1AgfaMR2kxU",level:3,translate:"Y t\xe1, y\xeau th\u01b0\u01a1ng, th\xedch, y\xeau, th\xedch",similar:[],typeWords:["n"],voca:"exclude",time:[1682222509361,1682227309361,1682265709361,1683893155e3,1684748095524],opposite:[],meaning:"A wet nurse.",note:"",spelling:"n\u025c\u02d0s",repetitiveTime:1684748095524,examples:""},{id:"0B0HPoHMG1wMjkUizLMP",spelling:"s\u026ak",translate:"\u1ed1m y\xeau, \u1ed1m, th\xedch, y\xeau, \xf4m",similar:[],note:"",repetitiveTime:1686905737149,opposite:[],voca:"exclusion",time:[1681449732242,1681454532242,1681492932242,1684239216130,1686905737149],meaning:"Sick people in general as a group.",typeWords:["n","a"],examples:'<span class="sr-word-family sr-cl-primary">ill</span> (n) /\u026al/ \u1ed1m <div> <span class="sr-word-family sr-cl-primary">illness</span> (n) /\u02c8\u026al.n\u0259s/ s\u1ef1 \u1ed1m \u0111au </div>',level:4},{id:"0Lev4MjYVOvxiZc4XkxQ",translate:"kh\xe2m ph\u1ee5c, th\xe1n ph\u1ee5c, y t\xe1, th\xedch",examples:'<span class="sr-examples-word sr-word-family sr-cl-primary">admiration</span> <span class="sr-examples-typeWord">(n)</span> <span class="sr-examples-spelling sr-cl-yellow">/\u02cc\xe6d.m\u025a\u02c8e\u026a\u0283.\u0259n/</span> s\u1ef1 kh\xe2m ph\u1ee5c, s\u1ef1 th\xe1n ph\u1ee5c',voca:"demo",time:[1682649321567,1683640155891,1684182002947,1684466866861],similar:[],typeWords:["v"],note:"",level:2,meaning:"To be amazed at; to view with surprise; to marvel at.",spelling:"\u0259d\u02c8ma\u026a\u0259",opposite:[],repetitiveTime:1684466866861},{id:"0MP2zN1wJNYevfKKIbwA",translate:"Ngh\u1ec9 ng\u01a1i",voca:"tidy",time:[1681878904692,1681883704692,1681922104692,1682269321774,1684238991153,1686905544997],repetitiveTime:1686905544997,similar:[],typeWords:["n","v"],opposite:[],meaning:"(of a person or animal) Relief from work or activity by sleeping; sleep.",examples:"Rest of : ph\u1ea7n c\xf2n l\u1ea1i \u2026",spelling:"\u0279\u025bst",note:"",level:4}];chrome.runtime.onMessage.addListener((function(t,n,o){switch(t.action){case e:console.log("sr-app: get vocab data from extension"),console.log({websiteRequestMessage:t}),o({data:i});break;case s:console.log("sr-app: update vocab");var l=t.payload,r=i.indexOf((function(e){return e.id===l.id}));console.log({index:r,_update:l}),r>-1&&(i[r]=l),console.log({websiteRequestMessage:t});break;case a:console.log("sr-app: add new vocab in data of extension"),console.log({websiteRequestMessage:t}),i.unshift(t.payload)}})),chrome.tabs.onActivated.addListener((function(e){var s=e.tabId;console.log("active new tab"),chrome.tabs.sendMessage(s,{action:"tab_activated",data:i})}))}();
//# sourceMappingURL=background.js.map
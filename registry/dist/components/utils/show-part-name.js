!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["utils/show-part-name"]=t():e["utils/show-part-name"]=t()}(self,(function(){return function(){var e={658:function(e,t,n){var i=n(645)((function(e){return e[1]}));i.push([e.id,"#bilibiliShowPN-be {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-left: 16px;\n}",""]),e.exports=i},645:function(e){"use strict";
// eslint-disable-next-line func-names
e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},
// eslint-disable-next-line func-names
t.i=function(e,n,i){"string"==typeof e&&(
// eslint-disable-next-line no-param-reassign
e=[[null,e,""]]);var r={};if(i)for(var o=0;o<this.length;o++){
// eslint-disable-next-line prefer-destructuring
var a=this[o][0];null!=a&&(r[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);i&&r[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},828:function(e,t,n){var i=n(658);e.exports="string"==typeof i?i:i.toString()}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={id:i,exports:{}};return e[i](o,o.exports,n),o.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};var i={};return function(){"use strict";n.d(i,{component:function(){return f}});var e=coreApis.style,t=coreApis.utils.urls,r=coreApis.observer,o=n(828),a=n.n(o),s=coreApis.spinQuery,c=coreApis.pluginApis.data;const u={showInNewLine:!1},l=async()=>{if(document.querySelector("#bilibiliShowInfos"))return;let e;const[t]=(0,c.registerAndGetData)("showPartName",u),n="bilibiliShowPN-be";if(location.pathname.startsWith("/medialist")){let{aid:t}=window;if(!t){t=(await(0,s.select)(".player-auxiliary-playlist-item-active")).getAttribute("data-aid")}e=(await(e=>fetch(`https://api.bilibili.com/x/web-interface/view?aid=${e}`).then((e=>e.json())))(t)).data}else e=(await(i=unsafeWindow.bvid,fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${i}`).then((e=>e.json())))).data;var i,r;e.p=(r="p",new URL(location.href).searchParams.get(r)||((e,t)=>{if(!e||!t||!t.pages)return 1;if(1===t.pages.length)return 1;for(const n of t.pages)if(n&&n.cid===e)return n.page;return 1})(unsafeWindow.cid,e));const o=await(0,s.select)(".video-data");if(!o)return;let a,l;if(t.showInNewLine)a=((e,t)=>{let n=document.querySelector(`#${e}`);return n||(n=document.createElement("span"),n.id=e,t.appendChild(n)),n})(n,o.parentElement);else{let e=document.querySelector(`#${n}`);e||(e=document.createElement("span"),e.id=n,o.appendChild(e)),a=e}try{l=e.pages[e.p-1]}catch(t){l=e.pages[0]}const p=l.part.length?`${l.part}`:"";let d,f;1!==e.videos?(d=`P ${e.p}/${e.videos}`,f=["\n"," "]):(d="",f=["",""]),a.title=d+f[0]+p,a.innerText=d+f[1]+p},p="showPartName",d=()=>{(0,e.addStyle)(a(),p),(0,r.videoChange)((async()=>{l()}))},f={name:p,entry:d,reload:d,unload:()=>{(0,e.removeStyle)(p)},displayName:"显示视频分P名",tags:[componentsTags.video,componentsTags.utils],description:{"zh-CN":"在视频信息栏显示分P名"},urlInclude:t.videoUrls}}(),i=i.component}()}));
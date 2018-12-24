function addHandler(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n}function getEvent(e){return e||window.event}function getTarget(e){return e.target||e.srcElement}function preventDefault(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function stopPropagation(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function getWheelDelta(){return event.wheelDelta?event.wheelDelta:40*-event.detail}function getPageCoordinates(e){var t=e.pageX,n=e.pageY;return void 0===t&&(t=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)),void 0===n&&(n=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)),{pageX:t,pageY:n}}function removeHandler(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null}function catIn(e,t){const n=[];let r=e;for(;r&&r!==document.body;)n.push(r),r=r.parentNode;return-1!==n.indexOf(t)}function popupCenterWindow(e,t,n=.8,r){const o=window.screen.width*n,i=window.screen.height*n,a=window.screen.width*(1-n)/2,s=window.screen.height*(1-n)/2,c=window.open(e,t,`\n    toolbar=no,\n    location=no,\n    directories=no,\n    status=no,\n    menubar=no,\n    scrollbars=no,\n    resizable=no,\n    copyhistory=no,\n    width=${o},\n    height=${i}, top=${s}, left=${a}`);if(r){const e=setInterval(()=>{c.closed&&(clearInterval(e),r())},100)}return c}var dom={addHandler:addHandler,getEvent:getEvent,getTarget:getTarget,preventDefault:preventDefault,stopPropagation:stopPropagation,getWheelDelta:getWheelDelta,getPageCoordinates:getPageCoordinates,removeHandler:removeHandler,catIn:catIn,popupCenterWindow:popupCenterWindow};const debounce=function(e,t,n){let r,o,i,a,s;const c=function(){const u=+new Date-a;u<t&&u>0?r=setTimeout(c,t-u):(r=null,n||(s=e.apply(i,o),r||(i=o=null)))};return function(...o){i=this,a=+new Date;const u=n&&!r;return r||(r=setTimeout(c,t)),u&&(s=e.apply(i,o),i=o=null),s}};var energy={debounce:debounce};const inBrowser="undefined"!=typeof window,UA=inBrowser&&window.navigator.userAgent.toLowerCase(),isIE=UA&&/msie|trident/.test(UA),isIE9=UA&&UA.indexOf("msie 9.0")>0,isEdge=UA&&UA.indexOf("edge/")>0,isAndroid=UA&&UA.indexOf("android")>0,isIOS=UA&&/iphone|ipad|ipod|ios/.test(UA),isChrome=UA&&/chrome\/\d+/.test(UA)&&!isEdge;var env={inBrowser:inBrowser,UA:UA,isIE:isIE,isIE9:isIE9,isEdge:isEdge,isAndroid:isAndroid,isIOS:isIOS,isChrome:isChrome};const hasOwn=function(e,t){return isObject(e)&&Object.prototype.hasOwnProperty.call(e,t)},isNumber=function(e){return!isNaN(parseFloat(e))},isString=function(e){return"string"==typeof e||e instanceof String},isNativeStringType=function(e){return"string"===e||"url"===e||"hex"===e||"email"===e||"pattern"===e},isEmptyArray=function(e){return Array.isArray(e)&&!e.length},isEmpty=function(e,t){return null==e||(!!isEmptyArray(e)||(!(!isNativeStringType(t)||"string"!=typeof e||e)||!!isEmptyObject(e)))},isObject=function(e){return e&&"object"==typeof e&&e.constructor===Object},isEmptyObject=function(e){return 0===Object.keys(e).length},_typeof=function(e){const t={};return"Boolean String Number Array Function Object Null Date RegExp Error".split(" ").forEach((e,n)=>{t[`[object ${e}]`]=e.toLowerCase()}),"object"==typeof e||"function"==typeof e?t[t.toString.call(e)]:typeof e},each=function(e,t){let n,r;if(Array.isArray(e))for(n=0,r=e.length;n<r&&!1!==t(e[n],n,e);n++);else if(isObject(e)){const n=Object.keys(e);for(const r of n)if(!1===t(e[r],r,e))break}return e};var type={hasOwn:hasOwn,isNumber:isNumber,isString:isString,isNativeStringType:isNativeStringType,_typeof:_typeof,isEmptyArray:isEmptyArray,isEmptyObject:isEmptyObject,isEmpty:isEmpty,each:each};function formatToNumebr(e){if(!e)return null;if("number"==typeof e)return e;const t=e.toString().split("."),n=t[0].replace(/,/g,"").concat(".",t[1]);return parseFloat(n)}function prettyNumberToMoney({prefix:e="¥",number:t=null,decimals:n=2,decimal:r=".",separator:o=",",suffix:i=""}={}){let a=formatToNumebr(t);a=a.toFixed(n);const s=(a+="").split(".");let c=s[0];const u=s.length>1?r+s[1]:"",l=/(\d+)(\d{3})/;if(o&&!isNumber(o))for(;l.test(c);)c=c.replace(l,"$1"+o+"$2");return e+c+u+i}function formartFileSize(e){const t=["B","K","M","G"];if(isNaN(e))throw new Error("size must be a number","formartFileSize");let n=Number(e),r=0,o="";if(!n)return"0B";for(;r<4;){if(Math.pow(1024,r)<=n&&n<Math.pow(1024,r+1)){n=parseFloat(n/Math.pow(1024,r)).toFixed(1),o=t[r];break}r+=1}return`${n}${o}`}var format={prettyNumberToMoney:prettyNumberToMoney,formatToNumebr:formatToNumebr,formartFileSize:formartFileSize};function flattenDeep(e){return e.reduce((e,t)=>Array.isArray(t)?e.concat(flattenDeep(t)):e.concat(t),[])}function sum(){return flattenDeep(Array.from(arguments)).reduce((e,t)=>+(+e+ +t).toFixed(2))}function multiply(){return flattenDeep(Array.from(arguments)).reduce((e,t)=>+(+e*+t).toFixed(2))}var operator={sum:sum,multiply:multiply};function fallbackCopyTextToClipboard(e){const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.focus(),t.select();try{const e=document.execCommand("copy")?"successful":"unsuccessful";console.warn("Fallback: Copying text command was "+e)}catch(e){console.error("Fallback: Oops, unable to copy",e)}document.body.removeChild(t)}function copyTextToClipboard(e){navigator.clipboard?navigator.clipboard.writeText(e).then(function(){console.warn("Async: Copying to clipboard was successful!")},function(e){console.error("Async: Could not copy text: ",e)}):fallbackCopyTextToClipboard(e)}var other={copyTextToClipboard:copyTextToClipboard};function resetObjectToEmpty(e){if(void 0===e)return;const t={string:"",number:null,array:[],object:{},null:null};Object.keys(e).forEach(n=>{"object"!==_typeof(e[n])||isEmptyObject(e[n])?e[n]=t[_typeof(e[n])]:resetObjectToEmpty(e[n])})}const getPropByPath=function(e,t,n){let r=e;const o=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split(".");let i=0;for(let e=o.length;i<e-1&&(r||n);++i){const e=o[i];if(!(e in r)){if(n)throw new Error("please transfer a valid prop path to form item!");break}r=r[e]}return{o:r,k:o[i],v:r?r[o[i]]:null}},extractValue=function(e,t,n){return getPropByPath(e,t,n).v},deepCloneObj=function e(t){if(!t)return[];if(!t&&"object"!=typeof t)throw new Error("error arguments","shallowClone");const n=t.constructor===Array?[]:{};for(const r in t)t.hasOwnProperty(r)&&(t[r]&&"object"==typeof t[r]?(n[r]=t[r].constructor===Array?[]:{},n[r]=e(t[r])):n[r]=t[r]);return n},unique=function(e,t){const n=[],r=new Set;return e.forEach(e=>{r.has(e[t])||(r.add(e[t]),n.push(e))}),n};var shortcut={resetObjectToEmpty:resetObjectToEmpty,getPropByPath:getPropByPath,extractValue:extractValue,deepCloneObj:deepCloneObj,unique:unique},index={...dom,...energy,...env,...format,...operator,...other,...shortcut,...type};export default index;export{addHandler,getEvent,getTarget,preventDefault,stopPropagation,getWheelDelta,getPageCoordinates,removeHandler,catIn,debounce,inBrowser,UA,isIE,isIE9,isEdge,isAndroid,isIOS,isChrome,prettyNumberToMoney,formatToNumebr,formartFileSize,sum,multiply,copyTextToClipboard,resetObjectToEmpty,extractValue,getPropByPath,deepCloneObj,unique,hasOwn,isNumber,isString,isNativeStringType,_typeof,isEmptyArray,isEmptyObject,isEmpty,each};

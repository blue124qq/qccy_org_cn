!function(){function h(b){var e=[];if(p.some(function(a){if(a.Tag===b)return e=a.CategoryId,!0;var c,d,f,q=(c=a.Tag,d=-1!==c.indexOf("http:")?c.replace("http:",""):c.replace("https:",""),-1!==(f=d.indexOf("?"))?d.replace(d.substring(f),""):d);return!b||-1===b.indexOf(q)&&-1===a.Tag.indexOf(b)?void 0:(e=a.CategoryId,!0)}),!e.length&&r){var a=function(a){var c=document.createElement("a");c.href=a;a=c.hostname.split(".");return-1!==a.indexOf("www")||2<a.length?a.slice(1).join("."):c.hostname}(b);t.some(function(b){return b===
a})&&(e=["C0004"])}return e}function g(b){return b&&window.OptanonActiveGroups&&b.every(function(b){return-1!==window.OptanonActiveGroups.indexOf(b)})}function k(b){return-1!==(b.getAttribute("class")||"").indexOf("optanon-category")}function l(b){return u&&b.hasAttribute("data-ot-ignore")}var p=JSON.parse('[{"Host":"cookielaw.org","Tag":"https://cdn.cookielaw.org/consent/5b482669-c0bf-447e-8e93-f42e43f36bcb/OtAutoBlock.js","CategoryId":["C0005"]},{"Host":"enterprise-ireland.com","Tag":"https://script.hotjar.com/modules.36846fef680271831d9c.js","CategoryId":["C0004"]},{"Host":"secure.enterprise-ireland.com","Tag":"https://www.google-analytics.com/analytics.js","CategoryId":["C0002"]}]'),
r=JSON.parse("true"),u=JSON.parse("false"),t="addthis.com addtoany.com adsrvr.org amazon-adsystem.com bing.com bounceexchange.com bouncex.net criteo.com criteo.net dailymotion.com doubleclick.net everesttech.net facebook.com facebook.net googleadservices.com googlesyndication.com krxd.net liadm.com linkedin.com outbrain.com rubiconproject.com sharethis.com taboola.com twitter.com vimeo.com yahoo.com youtube.com".split(" "),m=["embed","iframe","img","script"];(new MutationObserver(function(b){Array.prototype.forEach.call(b,
function(b){Array.prototype.forEach.call(b.addedNodes,function(a){var b,c;if(1===a.nodeType&&-1!==m.indexOf(a.tagName.toLowerCase())&&!k(a)&&!l(a))if("script"===a.tagName.toLowerCase()){if((c=h(b=a.src||"")).length){var d=c.join("-"),e=a.getAttribute("class")?a.getAttribute("class"):"";a.setAttribute("class","optanon-category-"+d+" "+e);g(c)||(a.type="text/plain");var f=function(b){"text/plain"===a.getAttribute("type")&&b.preventDefault();a.removeEventListener("beforescriptexecute",f)};a.addEventListener("beforescriptexecute",
f)}}else(c=h(b=a.src||"")).length&&(d=c.join("-"),e=a.getAttribute("class")?a.getAttribute("class"):"",a.setAttribute("class","optanon-category-"+d+" "+e),g(c)||(a.removeAttribute("src"),a.setAttribute("data-src",b)))});var a=b.target;if(b.attributeName&&(!k(a)||!l(a)))if("script"===a.nodeName.toLowerCase()){if((e=h(d=a.src||"")).length){b=e.join("-");var f=a.getAttribute("class")?a.getAttribute("class"):"";a.setAttribute("class","optanon-category-"+b+" "+f+" ");g(e)||(a.type="text/plain");var c=
function(b){"text/plain"===a.getAttribute("type")&&b.preventDefault();a.removeEventListener("beforescriptexecute",c)};a.addEventListener("beforescriptexecute",c)}}else if(-1!==m.indexOf(b.target.nodeName.toLowerCase())){var d,e;(e=h(d=a.src||"")).length&&(b=e.join("-"),f=a.getAttribute("class")?a.getAttribute("class"):"",a.setAttribute("class","optanon-category-"+b+" "+f),g(e)||(a.removeAttribute("src"),a.setAttribute("data-src",d)))}})})).observe(document.documentElement,{childList:!0,subtree:!0,
attributes:!0,attributeFilter:["src"]});var n=document.createElement;document.createElement=function(){for(var b=[],e=0;e<arguments.length;e++)b[e]=arguments[e];if("script"!==b[0].toLowerCase()&&-1===m.indexOf(b[0].toLowerCase()))return n.bind(document).apply(void 0,b);var a=n.bind(document).apply(void 0,b),f=a.setAttribute.bind(a);return Object.defineProperties(a,{src:{get:function(){return a.getAttribute("src")||""},set:function(c){var d="";"string"==typeof c?d=c:c instanceof Object&&(d=c.toString());
d=h(d);return!d.length||"script"!==b[0].toLowerCase()||k(a)||g(d)||l(a)?!d.length||-1===m.indexOf(b[0].toLowerCase())||k(a)||g(d)||l(a)?f("src",c):(a.removeAttribute("src"),f("data-src",c)):(f("type","text/plain"),f("src",c)),!0}},type:{set:function(b){var c=h(a.src||"");b=!c.length||k(a)||g(c)||l(a)?b:"text/plain";return f("type",b),!0}}}),a.setAttribute=function(b,d,e){"type"!==b&&"src"!==b||e?f(b,d):a[b]=d},a}}();
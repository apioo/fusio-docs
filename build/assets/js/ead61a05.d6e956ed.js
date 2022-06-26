"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6192],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=u(n),f=a,m=d["".concat(c,".").concat(f)]||d[f]||p[f]||i;return n?r.createElement(m,o(o({ref:t},l),{},{components:n})):r.createElement(m,o({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},759:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return u},assets:function(){return l},toc:function(){return p},default:function(){return f}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],s={},c="Redis Hash Set",u={unversionedId:"backend/api/action/redis-hash-set",id:"backend/api/action/redis-hash-set",title:"Redis Hash Set",description:"Puts a value to the provided field. You should bind this action to a route i.e. PUT /values/:field where the field",source:"@site/docs/backend/api/action/redis-hash-set.md",sourceDirName:"backend/api/action",slug:"/backend/api/action/redis-hash-set",permalink:"/docs/backend/api/action/redis-hash-set",editUrl:"https://github.com/apioo/fusio-docs/edit/main/docs/backend/api/action/redis-hash-set.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Redis Hash GetAll",permalink:"/docs/backend/api/action/redis-hash-getall"},next:{title:"SMTP Send",permalink:"/docs/backend/api/action/smtp-send"}},l={},p=[{value:"Request",id:"request",level:2},{value:"Response",id:"response",level:2}],d={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"redis-hash-set"},"Redis Hash Set"),(0,i.kt)("p",null,"Puts a value to the provided field. You should bind this action to a route i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"PUT /values/:field")," where the ",(0,i.kt)("inlineCode",{parentName:"p"},"field"),"\nuri fragment is available."),(0,i.kt)("h2",{id:"request"},"Request"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "value": "foobar"\n}\n')),(0,i.kt)("h2",{id:"response"},"Response"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "success": true,\n  "message": "Field successfully set",\n  "return": 1\n}\n')))}f.isMDXComponent=!0}}]);
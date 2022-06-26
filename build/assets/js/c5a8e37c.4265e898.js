"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9035],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),l=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(u.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(t),m=o,f=d["".concat(u,".").concat(m)]||d[m]||s[m]||i;return t?r.createElement(f,a(a({ref:n},p),{},{components:t})):r.createElement(f,a({ref:n},p))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=d;var c={};for(var u in n)hasOwnProperty.call(n,u)&&(c[u]=n[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4516:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return l},assets:function(){return p},toc:function(){return s},default:function(){return m}});var r=t(7462),o=t(3366),i=(t(7294),t(3905)),a=["components"],c={},u="Mongo Delete One",l={unversionedId:"backend/api/action/mongo-delete-one",id:"backend/api/action/mongo-delete-one",title:"Mongo Delete One",description:"Deletes a document by id. You should bind this action to a route i.e. DELETE /document/:id where the id uri fragment",source:"@site/docs/backend/api/action/mongo-delete-one.md",sourceDirName:"backend/api/action",slug:"/backend/api/action/mongo-delete-one",permalink:"/docs/backend/api/action/mongo-delete-one",editUrl:"https://github.com/apioo/fusio-docs/edit/main/docs/backend/api/action/mongo-delete-one.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"HTTP Processor",permalink:"/docs/backend/api/action/http-processor"},next:{title:"Mongo Find All",permalink:"/docs/backend/api/action/mongo-find-all"}},p={},s=[{value:"Response",id:"response",level:2}],d={toc:s};function m(e){var n=e.components,t=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"mongo-delete-one"},"Mongo Delete One"),(0,i.kt)("p",null,"Deletes a document by id. You should bind this action to a route i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"DELETE /document/:id")," where the ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," uri fragment\nis available. The action deletes the document with the provided id."),(0,i.kt)("h2",{id:"response"},"Response"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "success": true,\n  "message": "Document successfully deleted"\n}\n')))}m.isMDXComponent=!0}}]);
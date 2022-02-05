"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4434],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(n),f=o,m=d["".concat(l,".").concat(f)]||d[f]||p[f]||i;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5917:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return s},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],c={sidebar_position:1},l="Docker",u={unversionedId:"installation/docker",id:"installation/docker",title:"Docker",description:"It is also possible to setup a Fusio system through docker. This has the advantage that you automatically get a complete",source:"@site/docs/installation/docker.md",sourceDirName:"installation",slug:"/installation/docker",permalink:"/docs/installation/docker",editUrl:"https://github.com/apioo/fusio-docs/edit/main/docs/installation/docker.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/docs/installation/"},next:{title:"Apache",permalink:"/docs/installation/apache"}},s=[],p={toc:s};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"docker"},"Docker"),(0,i.kt)("p",null,"It is also possible to setup a Fusio system through docker. This has the advantage that you automatically get a complete\nrunning Fusio system without configuration."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"GitHub: ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apioo/fusio-docker"},"https://github.com/apioo/fusio-docker")),(0,i.kt)("li",{parentName:"ul"},"DockerHub: ",(0,i.kt)("a",{parentName:"li",href:"https://hub.docker.com/r/fusio/fusio"},"https://hub.docker.com/r/fusio/fusio"))),(0,i.kt)("p",null,"To setup the container you have to check out the repository and run the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"docker-compose up -d\n")),(0,i.kt)("p",null,"This builds the Fusio system with a predefined backend account. The credentials are taken from the env variables\n",(0,i.kt)("inlineCode",{parentName:"p"},"FUSIO_BACKEND_USER"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"FUSIO_BACKEND_EMAIL")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"FUSIO_BACKEND_PW")," in the ",(0,i.kt)("inlineCode",{parentName:"p"},"docker-compose.yml"),". If you are planing to\nrun the container on the internet you MUST change these credentials."))}d.isMDXComponent=!0}}]);
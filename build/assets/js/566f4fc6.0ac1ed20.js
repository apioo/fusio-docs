"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3529],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return d}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,c=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),f=s(t),d=o,m=f["".concat(p,".").concat(d)]||f[d]||u[d]||c;return t?r.createElement(m,a(a({ref:n},l),{},{components:t})):r.createElement(m,a({ref:n},l))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var c=t.length,a=new Array(c);a[0]=f;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var s=2;s<c;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},3417:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return l},default:function(){return f}});var r=t(7462),o=t(3366),c=(t(7294),t(3905)),a=["components"],i={},p="PHP Processor",s={unversionedId:"backend/api/action/php-processor",id:"backend/api/action/php-processor",title:"PHP Processor",description:"The PHP action processes a PHP file or inline code. There is also a complete API",source:"@site/docs/backend/api/action/php-processor.md",sourceDirName:"backend/api/action",slug:"/backend/api/action/php-processor",permalink:"/docs/backend/api/action/php-processor",editUrl:"https://github.com/apioo/fusio-docs/edit/main/docs/backend/api/action/php-processor.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Mongo Update One",permalink:"/docs/backend/api/action/mongo-update-one"},next:{title:"PHP Sandbox",permalink:"/docs/backend/api/action/php-sandbox"}},l=[{value:"Example",id:"example",children:[],level:2}],u={toc:l};function f(e){var n=e.components,t=(0,o.Z)(e,a);return(0,c.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"php-processor"},"PHP Processor"),(0,c.kt)("p",null,"The PHP action processes a PHP file or inline code. There is also a complete API\n",(0,c.kt)("a",{parentName:"p",href:"http://www.fusio-project.org/documentation/php"},"documentation")," describing all\navailable objects. In the following a simple example implementation:"),(0,c.kt)("h2",{id:"example"},"Example"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-php"},"<?php\n/**\n * @var \\Fusio\\Engine\\ConnectorInterface $connector\n * @var \\Fusio\\Engine\\ContextInterface $context\n * @var \\Fusio\\Engine\\RequestInterface $request\n * @var \\Fusio\\Engine\\Response\\FactoryInterface $response\n * @var \\Fusio\\Engine\\ProcessorInterface $processor\n * @var \\Fusio\\Engine\\ProcessorInterface $dispatcher\n * @var \\Psr\\Log\\LoggerInterface $logger\n * @var \\Psr\\SimpleCache\\CacheInterface $cache\n */\n\n/** @var \\Doctrine\\DBAL\\Connection $connection */\n$connection = $connector->getConnection('My-DB');\n\n$count  = $connection->fetchColumn('SELECT COUNT(*) FROM my_table');\n$result = $connection->fetchAll('SELECT * FROM my_table ORDER BY sort DESC');\n\nreturn $response->build(200, [], [\n    'totalCount' => $count,\n    'entries'    => $result,\n]);\n")))}f.isMDXComponent=!0}}]);
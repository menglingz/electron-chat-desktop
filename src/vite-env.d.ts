/// <reference types="vite/client" />
// declare module '*.vue' {
//     import { Component } from 'vue'; const component: Component; export default component;
// }
declare module '*.vue' {
  import { ComponentOptions } from 'vue';

  const componentOptions: ComponentOptions;

  export default componentOptions;
}
declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module 'spark-md5';

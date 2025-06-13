/// <reference types="vite/client" />

// 定义.vue文件的类型，使ts可以识别.vue文件的类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

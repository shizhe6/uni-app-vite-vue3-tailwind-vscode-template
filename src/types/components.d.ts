import SzLoading from '@/components/SzLoading.vue'
import SzBookRecommend from '@/components/SzBookRecommend.vue'

declare module 'vue' {
  export interface GlobalComponents {
    SzLoading: typeof SzLoading
    SzBookRecommend: typeof SzBookRecommend
  }
}

// 组件实例类型
export type SzLoadingInstance = InstanceType<typeof SzLoading>
export type SzBookRecommendInstance = InstanceType<typeof SzBookRecommend>

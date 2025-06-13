import CommonBookRecommend from '@/components/ZfCommonBookRecommend.vue'
import CommonLoading from '@/components/ZfCommonLoading.vue'
declare module 'vue' {
  export interface GlobalComponents {
    CommonLoading: typeof CommonLoading
     CommonBookRecommend: typeof CommonBookRecommend
  }
}

// 组件实例类型
export type CommonLoadingInstance = InstanceType<typeof CommonLoading>
export type CommonBookRecommendInstance = InstanceType<typeof CommonBookRecommend>

import type { CommonBookRecommendInstance, CommonLoadingInstance } from '@/types/components'
import { ref } from 'vue'

/**
 * 1、猜你喜欢组合式函数
 */
export function bookRecommendList() {
  // 获取猜你喜欢组件实例
  const bookRecommendRef = ref<CommonBookRecommendInstance>()

  // 滚动触底事件
  const onScrollToLower = () => {
    bookRecommendRef.value?.handleScrollToLower()
  }

  // 返回 ref 和事件处理函数
  return {
    bookRecommendRef,
    onScrollToLower,
  }
}



/**
 * 2、加载中组件
 */
export const useLoading = () => {
  // 获取加载中组件实例
  const loadingRef = ref<CommonLoadingInstance>()

  // 返回 ref 和事件处理函数
  return {
    loadingRef
  }
}

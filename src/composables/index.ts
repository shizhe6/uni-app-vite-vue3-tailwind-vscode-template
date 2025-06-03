import { SzBookRecommendInstance, SzLoadingInstance } from '@/types/components'
import { ref } from 'vue'

/**
 * 猜你喜欢组合式函数
 */
export const bookRecommendList = () => {
  // 获取猜你喜欢组件实例
  const bookRecommendRef = ref<SzBookRecommendInstance>()

  // 滚动触底事件
  const onScrollToLower = () => {
    bookRecommendRef.value?.handleScrollToLower()
  }

  // 返回 ref 和事件处理函数
  return {
    bookRecommendRef,
    onScrollToLower
  }
}

/**
 * 加载中组件
 */
export const useLoading = () => {
  // 获取加载中组件实例
  const szLoadingRef = ref<SzLoadingInstance>()

  // 返回 ref 和事件处理函数
  return {
    szLoadingRef
  }
}

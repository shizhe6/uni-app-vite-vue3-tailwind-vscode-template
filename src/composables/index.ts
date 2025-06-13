import type { BookRecommendInstance } from '@/types/components'
import { ref } from 'vue'

/**
 * 猜你喜欢组合式函数
 */
export function bookRecommendList() {
  // 获取猜你喜欢组件实例
  const bookRecommendRef = ref<BookRecommendInstance>()

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

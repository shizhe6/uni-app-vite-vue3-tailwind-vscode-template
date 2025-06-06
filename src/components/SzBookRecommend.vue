<template>
  <view class="m-2 h-[100vh]">
    <view class="p-4">
      <text class="font-bold">猜你喜欢</text>
    </view>
    <view class="grid grid-cols-2 gap-2">
      <navigator
        v-for="(recommendBook, idx) in recommendBookData"
        :key="idx"
        class="h-[320px] rounded-lg bg-white shadow-md"
        url="/pages/book/detail">
        <image
          class="w-full h-[200px] rounded-t-lg"
          :src="recommendBook.image"
          mode="aspectFill" />
        <view class="whitespace-normal mt-2 pl-1">
          {{ recommendBook.name }}
        </view>
        <view class="text-sm text-gray-500 mt-2 pl-2">
          {{ recommendBook.description }}
        </view>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { pageQueryRecommendListAPI } from '@/services/SzBookRecommend'
import { BookItem } from '@/types/book'
import { PageParams } from '@/types/global'

// 推荐列表
const recommendBookData = ref<BookItem[]>([])
/**
 * 页面加载完成后加载数据
 */
onMounted(() => {
  pageQueryRecommendListData()
})
// 是否加载完成
const finish = ref(false)
// 是否正在加载
const isLoading = ref(true)
// 分页参数
const pageParams: Required<PageParams> = {
  current: 1,
  size: 8
}
/**
 * 加载数据
 * 包括榜单和推荐书籍
 * 可以根据需要添加更多数据加载逻辑
 */
const pageQueryRecommendListData = async () => {
  if (finish.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }

  isLoading.value = true
  // 模拟加载推荐书籍数据
  const response = pageQueryRecommendListAPI(query.sourceType, pageParams)
  console.log('response', response.records)
  // 数据追加到推荐列表中
  recommendBookData.value.push(...response.records)
  //  处理描述字段
  recommendBookData.value.forEach((item) => {
    if (item.description && item.description.length > 20) {
      item.description = item.description.slice(0, 20) + '...'
    }
  })

  isLoading.value = false
  if (pageParams.current < response.pages) {
    pageParams.current++
  } else {
    finish.value = true
  }
}

/**
 * 触底加载更多数据
 */
const handleScrollToLower = () => {
  console.log('handleScrollToLower')
  pageQueryRecommendListData()
}
/**
 * 将handleScrollToLower暴露给父组件
 */
defineExpose({
  handleScrollToLower
})

/**
 * 接收父组件传递的参数，来源字段sourceType
 */
const query = defineProps<{
  sourceType: string
}>()

console.log('query', query)
</script>

<style lang="scss"></style>

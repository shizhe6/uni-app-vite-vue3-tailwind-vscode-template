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
import { commonPageQueryData } from '@/services/global'
import { pageQueryRecommendListAPI } from '@/services/SzBookRecommend'
import { BookItem } from '@/types/book'
import { PageParams, PageResult } from '@/types/global'

// 推荐列表
const recommendBookData = ref<BookItem[]>([])
/**
 * 页面加载完成后加载数据
 */
onMounted(() => {
  // 请求参数
  queryParams.value.sourceType = query.sourceType
  // 加载推荐列表数据
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
// 查询参数
const queryParams = ref({
  sourceType: ''
})
/**
 * 分页加载数据
 * @returns  void
 */
const pageQueryRecommendListData = async () => {
  console.log(
    'pageQueryRecommendListData' + query.sourceType + pageParams.current
  )
  await commonPageQueryData(
    pageQueryRecommendListAPI,
    recommendBookData,
    finish,
    isLoading,
    pageParams,
    queryParams
  )

  recommendBookData.value.forEach((item, index) => {
    item.description = item.description.slice(0, 20) + '...'
  })
}

/**
 * 触底加载更多数据
 */
const handleScrollToLower = () => {
  console.log('handleScrollToLower' + query.sourceType)
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
</script>

<style lang="scss"></style>

const pageQueryRecommendListData = async () => {
commonPageQueryData(pageQueryRecommendListAPI, recommendBookData, finish,
isLoading, pageParams, query.sourceType) }

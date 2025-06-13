<template>
  <!-- 加载中 -->
  <ZfCommonLoading v-if="isLoading"></ZfCommonLoading>
  <!-- 列表模块 -->
  <scroll-view v-else scroll-y @scrolltolower="onScrollToLower">
    <!-- 1.榜单模块 -->
    <view class="mx-3 whitespace-nowrap bg-white rounded-lg">
      <!--  1.1榜单标题 -->
      <view class="flex justify-between items-center">
        <scroll-view scroll-x="true" enable-flex="true" class="w-[80%]">
          <view
            :class="
              activeRankIndex === index
                ? 'text-black text-lg'
                : 'text-gray-600 text-sm'
            "
            class="inline-block py-2 mx-2 whitespace-nowrap"
            v-for="(ranktTitle, index) in ranktTitleData"
            :key="index"
            @click="switchRank(index)">
            {{ ranktTitle }}
          </view>
        </scroll-view>
        <!-- 完整榜单 -->
        <navigator
          class="py-2 mx-1 text-sm text-gray-600 w-[20%] shadow-md rounded-lg"
          url="/pages/rank/rank">
          完整榜单 >
        </navigator>
      </view>

      <!-- 1.2当前榜单内容 -->
      <scroll-view scroll-x class="w-full whitespace-nowrap">
        <!-- 列 -->
        <view class="inline-flex">
          <!-- 列内部的4条数据 -->
          <view
            v-for="(page, pIndex) in currentPagedBooks"
            :key="pIndex"
            class="w-[500rpx]">
            <!--  书籍项   -->
            <navigator
              url="/pages/book/detail"
              v-for="(book, bIndex) in page"
              :key="bIndex"
              class="flex items-center p-2 h-24">
              <!-- 封面 -->
              <image
                class="w-[100rpx] h-[150rpx] rounded-lg"
                :src="book.image"
                mode="aspectFill" />

              <!-- 排名  -->
              <view
                class="px-1 h-20 text-lg w-[50rpx]"
                :class="{
                  'text-amber-600':
                    book.rank !== undefined && [1, 2, 3].includes(book.rank)
                }">
                <text>{{ book.rank }}</text>
              </view>

              <!-- 书籍信息 -->
              <view class="flex-1 h-full w-[200rpx] flex flex-col">
                <view
                  class="text-[30rpx] w-full mt-3 font-medium mb-[10rpx] whitespace-pre-line break-words">
                  {{ book.name }}
                </view>
                <view class="mt-1 text-sm text-gray-400">
                  <text>{{ book.popularity }}人气</text>
                </view>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 2.推荐书籍模块 -->
    <!-- 根据错误提示，需要补充 sourceType 属性，这里假设 sourceType 的值为 'recommend'，可根据实际情况修改 -->
    <ZfCommonBookRecommend ref="bookRecommendRef" sourceType="推荐" />
  </scroll-view>
</template>

<script setup lang="ts">
import { bookRecommendList } from '@/composables'
import { queryRecommendRankListAPI } from '@/services/rank'
import { BookItem } from '@/types/book'

import { computed, onMounted, ref } from 'vue'

// 猜你喜欢
const { bookRecommendRef, onScrollToLower } = bookRecommendList()
// 当前 榜单索引
const activeRankIndex = ref(0)
// 榜单列表
const rankData = ref<BookItem[]>([])
// 页面加载状态
const isLoading = ref(false)
// 榜单定义
const ranktTitleData = ref<string[]>([
  '推荐棒',
  '完本棒',
  '巅峰榜',
  '热播榜',
  '短剧棒',
  '热播榜3'
])

/**
 * 页面挂载时加载数据
 *为什么使用onMounted，而不是onShow？
 */
onMounted(() => {
  //1.开启数据加载状态
  isLoading.value = true

  // 2.初始化榜单数据
  queryRecommendRankData()

  // 3.关闭数据加载状态
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
/**
 * 初始化榜单数据
 */
const queryRecommendRankData = async () => {
  // console.log('queryRecommendRankData')
  rankData.value = queryRecommendRankListAPI(
    ranktTitleData.value[activeRankIndex.value]
  )
}

/**
 * 切换榜单
 * @param index 切换榜单的索引
 *
 */
const switchRank = (index: number) => {
  // console.log('switchRank', index)
  activeRankIndex.value = index

  // 切换榜单数据
  queryRecommendRankData()
}

/**
 *
 * @returns 分页后的书籍列表
 * 为什么使用computed？
 * 1. 计算属性会根据其依赖的响应式数据自动更新，当依赖的数据发生变化时，计算属性会重新计算并返回新的值。
 * 2. 计算属性可以缓存其计算结果，当依赖的数据没有变化时，计算属性会直接返回缓存的结果，避免重复计算。
 */
const currentPagedBooks = computed<BookItem[][]>(() => {
  // 每页显示4本书
  const pageSize = 4
  // 当前榜单书籍
  const currentItems = rankData.value
  // 定义一个空数组，用于存储分页后的数据
  const resultArray: BookItem[][] = []
  //遍历当前书籍列表，将其分成每页4本书的数组
  for (let index = 0; index < currentItems.length; index++) {
    const item = currentItems[index]
    const chunkIndex = Math.floor(index / pageSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)
  }

  return resultArray
})
</script>

<style lang="scss" scoped>/* stylelint-disable */


</style>

<template>
  <SzLoading v-if="isLoading"></SzLoading>
  <scroll-view v-else scroll-y @scrolltolower="onScrollToLower">
    <!-- 1.榜单模块 -->
    <view class="rounded-lg bg-white mx-2">
      <!--  榜单标题 -->
      <view
        class="inline-block py-2 mx-3 text-sm"
        v-for="(ranktTitle, index) in ranktTitleData"
        :key="index"
        :class="{ 'text-amber-600': activeRankIndex === index }"
        @click="switchRank(index)">
        {{ ranktTitle }}
      </view>
      <!-- 完整榜单 -->
      <navigator
        class="inline-block py-2 mx-3 text-gray-600 text-sm"
        url="/pages/rank/rank">
        完整榜单 >
      </navigator>

      <!-- 当前榜单内容 -->
      <swiper class="h-[65vh]" circular :autoplay="false">
        <swiper-item v-for="(page, pIndex) in currentPagedBooks" :key="pIndex">
          <!--  书籍项   -->
          <navigator
            url="/pages/book/detail"
            v-for="(book, bIndex) in page"
            :key="bIndex"
            class="h-24 flex items-center p-2">
            <!-- 封面 -->
            <view class="h-24 w-20 rounded-lg">
              <image
                class="h-full w-full rounded-lg"
                :src="book.image"
                mode="aspectFill" />
            </view>

            <!-- 排名  -->
            <view
              class="h-20 text-lg mx-3"
              :class="{
                'text-amber-600':
                  book.rank !== undefined && [1, 2, 3].includes(book.rank)
              }">
              <text>{{ book.rank }}</text>
            </view>

            <!-- 书籍信息 -->
            <view class="flex-1">
              <view class="flex justify-start">
                <text>{{ book.name }}</text>
              </view>
              <view class="flex">
                <text class="text-amber-300" v-for="tag in book.tagList">
                  {{ tag }}
                </text>
                <text>🔥 {{ book.popularity }}万</text>
              </view>
            </view>
          </navigator>
        </swiper-item>
      </swiper>
    </view>

    <!-- 2.推荐书籍模块 -->
    <!-- 根据错误提示，需要补充 sourceType 属性，这里假设 sourceType 的值为 'recommend'，可根据实际情况修改 -->
    <SzBookRecommend ref="bookRecommendRef" sourceType="推荐" />
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
const ranktTitleData = ref<string[]>(['畅销榜', '新书榜', '人气榜'])

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
  console.log('queryRecommendRankData')
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
  console.log('switchRank', index)
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

<style lang="scss" scoped></style>

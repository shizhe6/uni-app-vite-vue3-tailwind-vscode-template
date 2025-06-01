<template>
  <loading v-if="isLoading"></loading>
  <scroll-view v-else scroll-y @scrolltolower="handleScrollToLower">
    <!-- 1.榜单模块 -->
    <view class="rounded-lg bg-white mx-2">
      <!--  榜单标题 -->
      <view
        class="inline-block py-2 mx-3 text-sm"
        v-for="(rank, index) in rankList"
        :key="index"
        :class="{ 'text-amber-600': activeRank === index }"
        @click="switchRank(index)">
        {{ rank.title }}
      </view>
      <!-- 完整榜单 -->
      <navigator
        class="inline-block py-2 mx-3  text-gray-600 text-sm"
        url="/pages/rank/rank">
        完整榜单 >
      </navigator>

      <!-- 当前榜单内容 -->
      <swiper class="h-[65vh]" circular :autoplay="false">
        <swiper-item v-for="(page, pIndex) in pagedBooks" :key="pIndex">
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
                  :src="book.cover"
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
                  <text class="text-amber-300">{{ book.genre }}</text>
                  <text>🔥 {{ book.popularity }}万</text>
                </view>
              </view>
            </navigator>
        </swiper-item>
      </swiper>
    </view>

    <!-- 2.推荐书籍模块 -->
    <BookRecommend ref="recommendRef" />
  </scroll-view>
</template>

<script setup lang="ts">
import { initRankListAPI } from '@/services/book'
import { BookItem, RankListItem } from '@/types/book'
import { computed, onMounted, ref } from 'vue'
import BookRecommend from './BookRecommend.vue'
import Loading from './Loading.vue'
// 当前 榜单索引
const activeRank = ref(0)
// 榜单列表
const rankList = ref<RankListItem[]>([])
// 页面加载状态
const isLoading = ref(false)



/**
 * 页面挂载时加载数据
 * 
 */ 
onMounted(() => {
  //开启数据加载状态
  isLoading.value = true

  // 加载数据
  loadData()

  // 关闭数据加载状态
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
/**
 * 加载数据
 * 包括榜单和推荐书籍
 * 可以根据需要添加更多数据加载逻辑
 */
const loadData = async () => {
  console.log('推荐页面加载数据')

  // 模拟加载推荐书籍数据
  rankList.value = initRankListAPI()
}

/**
 *
 * @param index 切换榜单
 * 切换榜单时重置页码
 */
const switchRank = (index: number) => {
  activeRank.value = index
  console.log('切换榜单', index)
}

/**
 * 获取当前榜单书籍，监听器
 * 当前榜单书籍 = 榜单列表[当前榜单索引].books
 */
const currentBooks = computed(() => {
  return rankList.value[activeRank.value]?.books || []
})
/**
 * 定义一个计算属性 pagedBooks，返回类型是 BookItem 数组的数组
 * 每页显示4本书
 */
const pagedBooks = computed<BookItem[][]>(() => {
  // 每页显示4本书
  const pageSize = 4
  // 当前榜单书籍
  const currentItems = currentBooks.value
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

/**
 * 滚动到底部加载更多,触发子组件BookRecommend的handleScrollToLower方法
 */
const recommendRef = ref<InstanceType<typeof BookRecommend>>()
const handleScrollToLower = () => {
  recommendRef.value?.handleScrollToLower()
}
</script>

<style lang="scss" scoped></style>

<template>
  <scroll-view class="container" scroll-y @scrolltolower="handleScrollToLower">
    <!-- 榜单导航 -->
    <view class="rank-nav">
      <view
        class="nav-item"
        v-for="(rank, index) in rankList"
        :key="index"
        :class="{ active: activeRank === index }"
        @click="switchRank(index)">
        {{ rank.title }}
      </view>
      <navigator class="nav-item" url="/pages/rank/rank">完整榜单 ></navigator>

      <!-- 当前榜单内容 -->
      <swiper class="h-[65vh]" circular :autoplay="false">
        <swiper-item v-for="(page, pIndex) in pagedBooks" :key="pIndex">
          <view class="book-grid">
            <navigator
              url="/pages/book/detail"
              v-for="(book, bIndex) in page"
              :key="bIndex"
              class="h-24 flex items-center p-[10px]">
              <view class="h-24 w-20 rounded-lg">
                <image
                  class="h-full w-full rounded-lg"
                  :src="book.cover"
                  mode="aspectFill" />
              </view>

              <view
                class="h-20 text-lg mr-3 ml-3"
                :class="{
                  'text-amber-600':
                    book.rank !== undefined && [1, 2, 3].includes(book.rank)
                }">
                <text>{{ book.rank }}</text>
              </view>

              <view class="flex-1">
                <view class="flex justify-start">
                  <text>{{ book.name }}</text>
                </view>
                <view class="flex">
                  <text>{{ book.genre }}</text>
                  <text>🔥 {{ book.popularity }}万</text>
                </view>
              </view>
            </navigator>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 推荐书籍模块保持不变 -->
    <BookRecommend ref="recommendRef" />
  </scroll-view>
</template>

<script setup lang="ts">
import { initRankListAPI } from '@/services/book'
import { BookItem, RankListItem } from '@/types/book'
import { computed, onMounted, ref } from 'vue'
import BookRecommend from './BookRecommend.vue'
// 引入 onShow 钩子函数
const activeRank = ref(0)
// 定义rankList
const rankList = ref<RankListItem[]>([])

// 触发加载：页面显示或组件挂载时
onMounted(() => {
  loadData()
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
  // 重置页码
}

/**
 * 获取当前榜单书籍
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

<style lang="scss" scoped>
.container {
  .rank-nav {
    border-radius: 10px;
    // border: 1px solid black;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 10px;
    .nav-item {
      display: inline-block;
      padding: 16rpx 0rpx;
      margin-right: 30rpx;
      margin-left: 30rpx;
      border-radius: 40rpx;
      color: #666;
      font-size: 28rpx;

      &.active {
        color: rgb(239, 151, 75);
      }
    }

    .rank-swiper {
      height: 70vh;

      .book-grid {
        display: flex;
        flex-direction: column;
        padding: 20rpx;

        .book-item {
          height: 150rpx;
          display: flex;
          align-items: center;
          padding: 20rpx;

          .book-cover {
            border-radius: 8rpx;
          }

          .book-number {
            margin: 0 20px;
            height: 80px;
            font-weight: 500;
          }

          .book-info {
            flex: 1;

            .book-name {
              display: flex;
              justify-content: flex-start;
            }

            .book-info-details {
              display: flex;
              .book-genre {
                color: #fbd78f;
              }
            }
          }
        }
      }
    }
  }
}

.book-cover {
  border-radius: 8rpx;
}
</style>

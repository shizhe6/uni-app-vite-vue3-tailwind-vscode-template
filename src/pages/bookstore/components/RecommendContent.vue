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
      <view
        class="nav-item"
        @click="handleViewFullList"
        style="margin-right: 0">
        完整榜单>
      </view>

      <!-- 当前榜单内容 -->
      <swiper class="rank-swiper" circular :autoplay="false">
        <swiper-item v-for="(page, pIndex) in pagedBooks" :key="pIndex">
          <view class="book-grid">
            <navigator
              url="/pages/book/detail"
              v-for="(book, bIndex) in page"
              :key="bIndex"
              class="book-item">
              <image class="book-cover" :src="book.cover" mode="aspectFill" />
              <view class="book-number">
                <text>{{ book.rank }}</text>
              </view>

              <view class="book-info">
                <view class="book-name">
                  <text>{{ book.name }}</text>
                </view>
                <view class="book-info-details">
                  <text class="book-genre">{{ book.genre }}</text>
                  <text class="book-popularity">
                    🔥 {{ book.popularity }}万
                  </text>
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
import { initRankListAPI, initRecommendListAPI } from '@/services/book'
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
 * 查看完整榜单
 */
const handleViewFullList = () => {
  uni.navigateTo({
    url: '/pages/bookstore/rank'
  })
}
/**
 * 获取当前榜单书籍

 */
const currentBooks = computed(() => {
  return rankList.value[activeRank.value]?.books || []
})
/**
 * 获取分页后的书籍数据
 * 每页显示4本书
 */
const pagedBooks = computed<BookItem[][]>(() => {
  const pageSize = 4

  return currentBooks.value.reduce<BookItem[][]>(
    (resultArray, item: BookItem, index) => {
      const chunkIndex = Math.floor(index / pageSize)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].push(item)
      return resultArray
    },
    []
  )
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
  padding: 20rpx;
  background-color: #f6f6f6;

  .rank-nav {
    white-space: nowrap;
    padding: 20rpx;
    background: #fff;
    border-radius: 10px;

    .nav-item {
      display: inline-block;
      padding: 16rpx 0rpx;
      margin-right: 30rpx;
      border-radius: 40rpx;
      color: #666;
      font-size: 28rpx;

      &.active {
        color: rgb(25, 25, 25);
      }
    }

    .rank-swiper {
      height: 55vh;

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
            height: 150rpx;
            width: 20%;
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
</style>

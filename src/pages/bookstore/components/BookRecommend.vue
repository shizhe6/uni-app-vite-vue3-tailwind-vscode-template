<template>
  <view
    class="recommend-section"
    >
    <view class="section-header">
      <text class="title">猜你喜欢</text>
    </view>
    <view class="recommend-grid">
      <navigator
        v-for="(item, idx) in recommendList"
        :key="idx"
        class="recommend-item"
        url="/pages/book/detail">
        <image class="recommend-cover" :src="item.cover" mode="aspectFill" />
        <text class="recommend-book-name">
          {{ item.name }}
        </text>
        <text class="recommend-book-description">
          {{ item.description ? item.description.slice(0, 20) + '...' : '' }}
        </text>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { initRecommendListAPI } from '@/services/book'
import { BookItem } from '@/types/book'

// recommendList 添加数据
const recommendList = ref<BookItem[]>([])
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
  recommendList.value = initRecommendListAPI()
}

/**
 * 触底加载更多数据
 */
const handleScrollToLower = () => {
  recommendList.value = [...recommendList.value, ...initRecommendListAPI()]
  console.log('触底加载更多数据')
}
/**
 * 将handleScrollToLower暴露给父组件
 */
defineExpose({
  handleScrollToLower
})
</script>

<style lang="scss">
.recommend-section {
  height: 400px;
  background-color: antiquewhite;
  .section-header {
    padding: 30rpx 20rpx;

    .title {
      font-size: 34rpx;
      font-weight: bold;
    }
  }

  .recommend-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;

    .recommend-item {
      height: 300px;
      background: #fff;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

      .recommend-cover {
        width: 100%;
        height: 200px;
        border-radius: 10px 10px 0 0;
      }
      .recommend-book-name {
        font-weight: 800;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 5px;
        padding: 5px 10px;
      }

      .recommend-book-description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 5px;
      }
    }
  }
}
</style>

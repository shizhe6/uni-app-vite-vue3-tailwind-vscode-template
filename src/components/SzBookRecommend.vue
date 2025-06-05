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
        <image class="recommend-cover" :src="item.image" mode="aspectFill" />
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
import { queryRecommendListAPI } from '@/services/book'
import { BookItem } from '@/types/book'
import { PageParams } from '@/types/global'

// 推荐列表 
const recommendList = ref<BookItem[]>([])
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
  size: 8,
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
  const response = queryRecommendListAPI(query.sourceType,pageParams)

  // 数据追加到推荐列表中
  recommendList.value.push(...response)
  // 
  isLoading.value = false
  if (pageParams.current < response.data.pages) {
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
  recommendList.value = [...recommendList.value, ...queryRecommendListAPI(query.sourceType)]
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
  sourceType: string,
}>()

</script>

<style lang="scss">
.recommend-section {
  margin: 10px;
  height: 400px;
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
      height: 320px;
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

<template>
  <SzLoading v-if="isLoading"></SzLoading>
  <view class="content-container" v-else>3333333</view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 数据加载方法
const loadData = async () => {
  console.log('经典页面加载数据')
}

// 页面加载状态
const isLoading = ref(false)
// 触发加载：页面显示或组件挂载时
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
</script>

<style lang="scss" scoped>
.classic-item {
  padding: 20rpx;
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  display: flex;

  .cover-image {
    width: 200rpx;
    height: 280rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
  }

  .content-info {
    flex: 1;
    .title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    .author {
      font-size: 26rpx;
      color: #666;
    }
    .meta {
      margin-top: 15rpx;
      font-size: 24rpx;
      color: #999;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

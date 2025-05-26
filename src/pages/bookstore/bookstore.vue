<template>
  <view class="container">
    <!-- 安全区域 & 渐变背景 -->
    <view class="header" :style="{ paddingTop: safeAreaInsets!.top + 'px'}">
      <!-- 搜索框 -->
      <uni-easyinput
        class="search-box"
        prefixIcon="search"
        placeholder="重生之我在ktv当少爷"
        @focus="handleSearch"
      ></uni-easyinput>
    </view>

    <!-- 标题栏 -->
    <view class="tabs">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 内容区域 -->
    <swiper :current="currentIndex" @change="onSwiperChange" class="content-swiper">
      <swiper-item v-for="(tab, index) in tabs" :key="index">
        <scroll-view
          class="content-scroll"
          scroll-y
          :show-scrollbar="false"
          @refresherrefresh="handleRefreshSearch"
        >
          <Recommend v-if="isRecommendLoaded" />
          <Classic v-if="isClassicLoaded" />
          <Knowledge v-if="isKnowledgeLoaded" />
          <Audiobook v-if="isAudiobookLoaded" />
          <Drama v-if="isDramaLoaded" />
          <NewArrival v-if="isNewArrivalLoaded" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { onShow } from '@dcloudio/uni-app'
import Classic from './components/ClassicContent.vue'
import Drama from './components/DramaContent.vue'
import Knowledge from './components/KnowledgeContent.vue'
import NewArrival from './components/LatestContent.vue'
import Audiobook from './components/ListeningContent.vue'
import Recommend from './components/RecommendContent.vue'

const tabs = ref(['推荐', '经典', '知识', '听书', '看剧', '最新上架'])
const currentIndex = ref(0)

const isLoading = ref(false)
const isRecommendLoaded = ref(false)
const isClassicLoaded = ref(false)
const isKnowledgeLoaded = ref(false)
const isAudiobookLoaded = ref(false)
const isDramaLoaded = ref(false)
const isNewArrivalLoaded = ref(false)

// 重置所有组件加载状态
const resetLoadedStates = () => {
  isRecommendLoaded.value = false
  isClassicLoaded.value = false
  isKnowledgeLoaded.value = false
  isAudiobookLoaded.value = false
  isDramaLoaded.value = false
  isNewArrivalLoaded.value = false
}

// 刷新搜索处理
const handleRefreshSearch = () => {
  isLoading.value = true
  resetLoadedStates()
}

// 修改滑动切换处理
const onSwiperChange = (e: any) => {
  currentIndex.value = e.detail.current
  isLoading.value = true

  // 重置所有组件加载状态
  resetLoadedStates()

  // 根据当前索引加载对应组件
  switch (currentIndex.value) {
    case 0:
      isRecommendLoaded.value = true
      break
    case 1:
      isClassicLoaded.value = true
      break
    case 2:
      isKnowledgeLoaded.value = true
      break
    case 3:
      isAudiobookLoaded.value = true
      break
    case 4:
      isDramaLoaded.value = true
      break
    case 5:
      isNewArrivalLoaded.value = true
      break
  }
}

// 页面展示时加载推荐内容
onShow(() => {
  isRecommendLoaded.value = true

  //暂停1秒
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 新增搜索跳转方法
const handleSearch = () => {
  uni.navigateTo({
    url: '/pages/bookstore/search', // 跳转到搜索页面
  })
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: env(safe-area-inset-top);
}

.header {
  background: linear-gradient(180deg, #f6ece0 0%, #f8f1eb 50%, #f7f5e6 100%);
  padding: 30rpx 30rpx 0;
  .search-box {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 40rpx;
    padding: 15rpx 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
}

.tabs {
  white-space: nowrap;
  padding: 30rpx 0;
  background-color: #f6f6f6;
  .tab {
    display: inline-block;
    padding: 0 20rpx;
    font-size: 32rpx;
    color: #929292;
    position: relative;

    &.active {
      color: #000000;
      font-weight: bold;
    }
  }

  .underline {
    position: absolute;
    bottom: -10rpx;
    left: 50%;
    transform: translateX(-50%);
    height: 6rpx;
    width: 0;
    transition: all 0.3s ease;
    border-radius: 3rpx;
  }
}

.content-swiper {
  flex: 1;
  background-color: #f6f6f6;
  border-radius: 30rpx 30rpx 0 0;
  overflow: hidden;

  .content-item {
    padding: 30rpx;
    font-size: 28rpx;
    color: #666;
  }
}
</style>

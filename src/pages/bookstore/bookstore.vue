<template>
  <view class="flex flex-col h-screen">
    <!-- 安全区域 & 渐变背景 -->
    <view
      class="p-5 header"
      :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 搜索框 -->
      <uni-easyinput
        prefixIcon="search"
        placeholder="重生之我在ktv当少爷"
        @focus="handleSearch"></uni-easyinput>
    </view>

    <!-- 标题栏 -->
    <view class="flex py-2">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="py-2 text-lg m-[10px] text-gray-400"
        :class="{
          'font-bold text-amber-600': currentIndex === index
        }"
        @click="currentIndex = index">
        {{ tab }}
      </view>
    </view>

    <!-- 内容区域 -->
    <swiper
      :current="currentIndex"
      @change="onSwiperChange"
      class="flex-1 bg-gray-100">
      <swiper-item v-for="(tab, index) in tabs" :key="index">
        <Recommend v-if="isRecommendLoaded" />
        <Classic v-if="isClassicLoaded" />
        <Knowledge v-if="isKnowledgeLoaded" />
        <Audiobook v-if="isAudiobookLoaded" />
        <Drama v-if="isDramaLoaded" />
        <NewArrival v-if="isNewArrivalLoaded" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Classic from './components/ClassicContent.vue'
import Drama from './components/DramaContent.vue'
import Knowledge from './components/KnowledgeContent.vue'
import NewArrival from './components/LatestContent.vue'
import Audiobook from './components/ListeningContent.vue'
import Recommend from './components/RecommendContent.vue'

//
const isLoading = ref(false)
const isRecommendLoaded = ref(false)
const isClassicLoaded = ref(false)
const isKnowledgeLoaded = ref(false)
const isAudiobookLoaded = ref(false)
const isDramaLoaded = ref(false)
const isNewArrivalLoaded = ref(false)

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const tabs = ref(['推荐', '经典', '知识', '听书', '看剧', '最新上架'])
const currentIndex = ref(0)

/**
 * 页面显示时触发
 * 用于初始化数据
 * 这里可以添加一些初始化逻辑
 * 例如：加载数据、重置状态等
 */
onShow(() => {
  isRecommendLoaded.value = true

  //暂停1秒
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
// 重置所有组件加载状态
const resetLoadedStates = () => {
  isRecommendLoaded.value = false
  isClassicLoaded.value = false
  isKnowledgeLoaded.value = false
  isAudiobookLoaded.value = false
  isDramaLoaded.value = false
  isNewArrivalLoaded.value = false
}

/**
 * 修改滑动切换处理函数
 * @param e swiper change事件
 */
const onSwiperChange = (e: any) => {
  //1.获取当前页面索引
  currentIndex.value = e.detail.current
  isLoading.value = true

  // 2.重置所有组件加载状态
  resetLoadedStates()

  // 3.根据当前索引加载对应组件
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

/**
 * 新增搜索跳转方法
 * 跳转到搜索页面
 */
const handleSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search'
  })
}
</script>

<style lang="scss">
.header {
  background: linear-gradient(180deg, #f6ece0 0%, #f8f1eb 50%, #f7f5e6 100%);
}
</style>

<template>
  <view class="flex flex-col h-screen">
    <!-- 安全区域 & 渐变背景 -->
    <view
      class="p-5 header"
      :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 搜索框 -->
      <uni-easyinput
        prefixIcon="search"
        v-model="searchKeyword"
        :placeholder="searchKeywords"
        @focus="handleSearch"></uni-easyinput>
    </view>

    <!-- 标题栏 -->
    <view class="flex py-2">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="py-2 text-lg m-[10px]"
        :class="{
          'font-bold text-amber-600': currentIndex === index
        }"
        @click="handleTabClick(index)">
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
// 页面加载状态
const isLoading = ref(false)
// 标签页组件加载状态
const isRecommendLoaded = ref(false)
const isClassicLoaded = ref(false)
const isKnowledgeLoaded = ref(false)
const isAudiobookLoaded = ref(false)
const isDramaLoaded = ref(false)
const isNewArrivalLoaded = ref(false)
// 搜索关键词
const searchKeyword = ref('')
// 推荐搜索书籍名称ji
const searchKeywords = ref('重生之我在ktv当少爷')

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 标签页数据
const tabs = ref(['推荐', '经典', '知识', '听书', '看剧', '最新上架'])
// 当前标签索引
const currentIndex = ref(0)

/**
 * 页面显示时触发
 * 用于初始化数据
 * 这里可以添加一些初始化逻辑
 * 例如：加载数据、重置状态等
 */
onShow(() => {
  //开启数据加载状态
  isLoading.value = true

  // 加载推荐组件数据
  isRecommendLoaded.value = true

  // 加载完成
  isLoading.value = false
})
// 重置所有组件加载状态
const resetLoadedStates = () => {
  Object.values(tabLoadedMap).forEach((loaded) => (loaded.value = false))
}

// 新增：创建标签索引与加载状态的映射对象
const tabLoadedMap: Record<number, Ref<boolean>> = {
  0: isRecommendLoaded,
  1: isClassicLoaded,
  2: isKnowledgeLoaded,
  3: isAudiobookLoaded,
  4: isDramaLoaded,
  5: isNewArrivalLoaded
}

/**
 * 修改滑动切换处理函数
 * @param e swiper change事件
 */
const onSwiperChange = (e: any) => {
  //1.获取当前页面索引
  currentIndex.value = e.detail.current

  // 2.重置所有组件加载状态
  resetLoadedStates()

  // 3.根据当前索引加载对应组件
  const targetLoaded = tabLoadedMap[currentIndex.value]
  if (targetLoaded) {
    targetLoaded.value = true // 确保索引有效时才设置
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

/**
 *切换标签
 */
const handleTabClick = (index: number) => {
  currentIndex.value = index
}
</script>

<style lang="scss">
.header {
  background: linear-gradient(180deg, #f6ece0 0%, #f8f1eb 50%, #f7f5e6 100%);
}
</style>

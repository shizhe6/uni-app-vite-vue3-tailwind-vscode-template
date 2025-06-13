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
// 推荐搜索书籍名称
const searchKeywordPlaceholder = ref('')

// 定时任务：每隔5秒更新 推荐搜索名称
const searchRecommendData = ['重生之我在ktv当少爷', '天榜', '人在现实，横推主天']
const searchRecommendDataIndex = ref(0)
// timer定义
const timer = ref<any>(null)

// 标签页数据
const tabs = ref(['推荐', '经典', '知识', '听书', '看剧', '最新上架'])
// 当前标签索引
const currentTabIndex = ref(0)

/**
 * 页面显示时触发
 * 用于初始化数据
 * 这里可以添加一些初始化逻辑
 * 例如：加载数据、重置状态等
 */
onShow(() => {
  console.log('onShow')
  // 开启数据加载状态
  isLoading.value = true

  // 加载推荐组件数据
  isRecommendLoaded.value = true

  // 加载完成
  isLoading.value = false
})

/**
 * 页面加载时触发
 */
onLoad(() => {
  console.log('onLoad')
  // 定时器，每5秒更新一次推荐搜索名称
  // 为了避免类型错误，将 timer 的类型声明为 NodeJS.Timeout 类型
  timer.value = setInterval(() => {
    searchKeywordPlaceholder.value = searchRecommendData[searchRecommendDataIndex.value]
    searchKeyword.value = searchRecommendData[searchRecommendDataIndex.value]
    searchRecommendDataIndex.value = (searchRecommendDataIndex.value + 1) % searchRecommendData.length
  }, 5000)
})

/**
 * 页面隐藏时触发
 */
onHide(() => {
  console.log('onHide')
  // 清除定时器
  if (timer.value) {
    clearInterval(timer.value)
  }
})
/**
 * 页面卸载时触发
 */
onUnload(() => {
  console.log('onUnload')
  // 清除定时器
  if (timer.value) {
    clearInterval(timer.value)
  }
})
/**
 * 重置所有组件加载状态
 */
function resetLoadedStates() {
  Object.values(tabLoadedMap).forEach(loaded => (loaded.value = false))
}

/**
 * 新增：创建标签索引与加载状态的映射对象

 */
const tabLoadedMap: Record<number, Ref<boolean>> = {
  0: isRecommendLoaded,
  1: isClassicLoaded,
  2: isKnowledgeLoaded,
  3: isAudiobookLoaded,
  4: isDramaLoaded,
  5: isNewArrivalLoaded,
}

/**
 * 修改滑动切换处理函数
 * @param e swiper change事件
 */
function onSwiperChange(e: any) {
  // 1.获取当前页面索引
  currentTabIndex.value = e.detail.current

  // 2.重置所有组件加载状态
  resetLoadedStates()

  // 3.根据当前索引加载对应组件
  const targetLoaded = tabLoadedMap[currentTabIndex.value]
  if (targetLoaded) {
    targetLoaded.value = true // 确保索引有效时才设置
  }
}

/**
 * 新增搜索跳转方法
 * 跳转到搜索页面
 */
function handleSearch() {
  uni.navigateTo({
    url: '/pages/search/search',
  })
}

/**
 *切换标签
 */
function handleTabClick(tabIndex: number) {
  currentTabIndex.value = tabIndex
}
</script>

<template>
  <view class="flex h-screen flex-col">
    <!-- 1.  搜索框 -->
    <view
      class="header-background "
    >
      <uni-search-bar v-model="searchKeyword" class="h-[40rpx]" :placeholder="searchKeywordPlaceholder" @focus="handleSearch" />
    </view>

    <!-- 2.滑动页面标题栏 -->
    <view class="flex bg-gray-100">
      <view
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        class="mx-[10px] py-2 text-lg"
        :class="
          currentTabIndex === tabIndex ? 'text-black text-xl ' : 'text-gray-600 '
        "
        @click="handleTabClick(tabIndex)"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 3.滑动的页面内容区域 -->
    <swiper
      :current="currentTabIndex"
      class="flex-1 bg-gray-100"
      @change="onSwiperChange"
    >
      <swiper-item v-for="(tab, childIndex) in tabs" :key="childIndex">
        <!-- 为什么需要两个条件都满足？
        因为 swiper-item 是多个，每个 swiper-item 都需要都会加载内部组件
        但是并不是每个组件都要在swiper-item中展示，只有对应的swiper-item才需要展示对应的组件
        所以，只有满足两个条件，才会展示对应的组件
        -->
        <Recommend v-if="isRecommendLoaded && childIndex === currentTabIndex" />
        <Classic v-if="isClassicLoaded && childIndex === currentTabIndex" />
        <Knowledge v-if="isKnowledgeLoaded && childIndex === currentTabIndex" />
        <Audiobook v-if="isAudiobookLoaded && childIndex === currentTabIndex" />
        <Drama v-if="isDramaLoaded && childIndex === currentTabIndex" />
        <NewArrival v-if="isNewArrivalLoaded && childIndex === currentTabIndex" />
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
.header-background {
  background: linear-gradient(180deg, #f6ece0 0%, #f8f1eb 50%, #f7f5e6 100%);
}
</style>

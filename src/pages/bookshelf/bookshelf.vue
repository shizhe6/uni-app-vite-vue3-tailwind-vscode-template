<template>
  <view class="viewreport">
    <!-- 标题栏 -->
    <view class="top-tabs" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ active: currentTabIndex === index }"
        @click="handleTabClick(index)">
        {{ tab }}
      </view>
    </view>
    <view class="middle-container" >
      <swiper
        class="swiper"
        :current="currentTabIndex"
        @change="onSwiperChange">
        <swiper-item
          class="swiper-item"
          v-for="(tab, index) in tabs"
          :key="index">
          <bookshelfOne v-if="index === 0" />
          <bookshelfTwo v-if="index === 1" />
        </swiper-item>
      </swiper>
    </view>


    <!-- 底部标签栏    -->
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import bookshelfOne from './components/bookshelf-one.vue'
import bookshelfTwo from './components/bookshelf-two.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//获取标签页数据
const tabs = ref<string[]>([])
// 标签页数据
const currentTabIndex = ref(0)
// 获取标签页数据
const getTabsData = () => {
  tabs.value = ['书架', '历史', '追剧']
}

onShow(async () => {
  //1.获取标签页数据
  getTabsData()
})

// 点击触发
const handleTabClick = (index: number) => {
  currentTabIndex.value = index
}
// 滑动触发（删除重复定义）
const onSwiperChange = (e: any) => {
  currentTabIndex.value = e.detail.current
}
</script>

<style lang="scss">
.viewreport {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
}
// 顶部标签
.top-tabs {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 80px;
  background-color: #f8f8f8;
  z-index: 999;
  position: fixed;
  width: 100%;
  margin-bottom: 40px;
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
}

// 底部容器
.middle-container {
  border: #000000  1px solid;
  margin-top: 80px;
  flex: 1;
  .swiper {
    height: 100vh;
    width: 100vw;
    .swiper-item {
      // 必须有一个固定高度
      width: 100vw;
      height: 100vh;
      overflow: hidden;

    }
  }
}
</style>

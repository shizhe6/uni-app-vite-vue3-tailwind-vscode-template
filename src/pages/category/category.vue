<template>
  <view class="h-full flex flex-col relative mb-6">
    <!-- 一级分类 -->
    <view
      class="flex justify-start items-center h-[40px] overflow-x-auto flex-nowrap scroll-smooth fixed bg-white">
      <view
        v-for="(primaryCategory, index) in primaryCategoryData"
        :key="index"
        class="px-[20rpx] text-[32rpx] relative whitespace-nowrap"
        :class="{ 'font-bold text-amber-600': activePrimaryIndex === index }"
        @click="handlePrimaryClick(index)">
        {{ primaryCategory.name }}
      </view>
    </view>

    <!-- 中间内容 -->
    <view class="flex-1 relative mt-[40px]">
      <swiper class="h-[100vh]" @change="onSwiperChange">
        <swiper-item
          class="flex flex-row overflow-hidden"
          v-for="(item, index) in primaryCategoryData"
          :key="index">
          <!-- 左侧：二级分类 -->
          <scroll-view class="left-category-container" scroll-y>
            <view
              v-for="(secondCategory, index) in secondCategoryData"
              :key="secondCategory.id"
              class="left-category-item"
              :class="{
                'font-bold text-amber-600': activeSecondIndex === index
              }"
              @tap="handleSecondClick(index)">
              <text>{{ secondCategory.name }}</text>
            </view>
          </scroll-view>
          <!-- 右侧：三级分类 -->
          <scroll-view
            class="right-category-container"
            scroll-y
            scroll-with-animation
            :scroll-top="rightScrollTop"
            @scroll="onRightScroll">
            <view
              v-for="(secondCategory, index) in secondCategoryData"
              :key="secondCategory.id"
              class="right-category-item">
              <view class="right-category-item-top">
                <view>{{ secondCategory.name }}</view>
                <view
                  v-if="secondCategory.children.length > 30"
                  @click="toggleShowAll = !toggleShowAll">
                  {{ toggleShowAll ? '收起 ˄' : '展开 ˅' }}
                </view>
              </view>

              <view class="right-category-item-bottom-content">
                <view
                  class="item-name"
                  v-for="(threeCategory, subIndex) in toggleShowAll
                    ? secondCategory.children
                    : secondCategory.children.slice(0, 30)"
                  :key="subIndex">
                  {{ threeCategory.name }}
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  initCategoryListAPI,
  initThreeCategoryListAPI
} from '@/services/category'
import { CategoryItem } from '@/types/category'
import { onShow } from '@dcloudio/uni-app'
import { getCurrentInstance, onMounted, ref } from 'vue'
// 当前激活的一级分类索引
const activePrimaryIndex = ref(0)
// 当前激活的二级分类索引
const activeSecondIndex = ref(0)

// 一级分类和二级分类数据
const primaryCategoryData = ref<CategoryItem[]>([])
// 二级分类数据和三级分类数据
const secondCategoryData = ref<CategoryItem[]>([])

// 加载状态
const isLoading = ref(false)

// 滚动事件的节流定时器
const rightScrollTop = ref(0)
// 记录每个二级分类的 top 值
const rightDomsTop = ref<number[]>([])
// 记录每个三级分类的 top 值
const leftDomsTop = ref<number[]>([])

// toggleShowAll
const toggleShowAll = ref(false)

/**
 * 监听滚动事件
 * 1.监听左边的scroll-view的滚动事件
 * 2.监听右边的scroll-view的滚动事件
 * 3.根据滚动事件，计算出右边scroll-view的scrollTop值
 */
onMounted(() => {
  const instance = getCurrentInstance()

  const query = uni.createSelectorQuery().in(instance!.proxy)
  query
    .selectAll('.left-category-item')
    .boundingClientRect((data) => {
      // 检查 data 是否为数组，避免类型错误
      if (Array.isArray(data)) {
        // 过滤掉可能为 undefined 的 top 值，确保返回的是 number 类型的数组
        leftDomsTop.value = data
          .map((v) => v.top)
          .filter((top): top is number => top !== undefined)
      } else {
        // 如果 data 不是数组，将 leftDomsTop 设为空数组
        leftDomsTop.value = []
      }
      console.log('左边top：', leftDomsTop.value)
    })
    .exec()
  query
    .selectAll('.right-category-item')
    .boundingClientRect((data) => {
      console.log('右边data：', data)

      // 检查 data 是否为数组，避免类型错误
      if (Array.isArray(data)) {
        // 过滤掉可能为 undefined 的 top 值，确保返回的是 number 类型的数组
        rightDomsTop.value = data
          .map((v) => v.top)
          .filter((top): top is number => top !== undefined)
      } else {
        // 如果 data 不是数组，将 rightDomsTop 设为空数组
        rightDomsTop.value = []
      }
      console.log('右边top：', rightDomsTop.value)
    })
    .exec()
})
/**
 * 页面加载时调用
 */
onShow(async () => {
  // 开启加载状态
  isLoading.value = true
  //1.获取一级分类列表数据
  await initCategoryListData()
  //3.获取三级分类数据
  await initThreeCategoryListData()
  // 关闭加载状态
  isLoading.value = false
})

// 获取一级分类列表数据
const initCategoryListData = () => {
  primaryCategoryData.value = initCategoryListAPI()
}

// 获取二级分类和三级分类数据
const initThreeCategoryListData = () => {
  // 获取当前激活的一级分类id
  const categoryId = primaryCategoryData.value[activePrimaryIndex.value].id

  // 重制二级分类索引
  activeSecondIndex.value = 0
  // 获取所有二级分类以及三级分类数据
  secondCategoryData.value = initThreeCategoryListAPI(categoryId)
}

// 滑动触发（删除重复定义）
const onSwiperChange = (e: any) => {
  // 设置当前激活的一级分类索引
  activePrimaryIndex.value = e.detail.current
  // 查询二级分类和三级分类数据
  initThreeCategoryListData()
}
/**
 * 点击一级分类事件
 * @param index 一级分类索引
 */
const handlePrimaryClick = (index: number) => {
  // 设置当前激活的一级分类索引
  activePrimaryIndex.value = index
  // 查询二级分类和三级分类数据
  initThreeCategoryListData()
}
/**
 *  点击二级分类事件
 * @param index 二级分类索引
 */
const handleSecondClick = (index: number) => {
  // 设置当前激活的二级分类索引
  // activeSecondIndex.value = index
  // 计算出右边scroll-view的scrollTop值
  rightScrollTop.value = rightDomsTop.value[index - 1]
  console.log('触发二级分类索引:' + index)
}

//滚动右侧区域，左侧联动，具体这个284值，需要根据自己的实际情况来调整
const onRightScroll = (e: any) => {
  console.log('onRightScroll:' + e.detail.scrollTop)
  const scrollTop = e.detail.scrollTop // 当前滚动值
  let minGreater = Infinity // 记录比scrollTop大的最小值
  let minIndex = -1 // 记录对应的索引

  // 找到比scrollTop大的最小元素
  rightDomsTop.value.forEach((v, k) => {
    if (v > scrollTop && v < minGreater) {
      minGreater = v
      minIndex = k
    }
  })

  if (minIndex !== -1) {
    activeSecondIndex.value = minIndex
    console.log(
      `找到比${scrollTop}大的最小元素：${minGreater}，索引：${minIndex}`
    )
  } else {
    console.log(`未找到比${scrollTop}大的元素`)
  }
}
</script>

<style lang="scss">
/* 一级分类样式 */
.left-category-container {
  /* 隐藏溢出内容 */
  overflow: hidden;
  /* 设置宽度 */
  width: 180rpx;
  /* 不占据剩余空间 */
  flex: none;
  /* 设置背景颜色 */
  height: 100%;
  /* 一级分类项样式 */
  .left-category-item {
    /* 使用Flex布局，子元素垂直居中，水平居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 设置高度 */
    height: 96rpx;
    /* 设置字体大小 */
    font-size: 26rpx;
    /* 设置相对定位 */
    position: relative;
  }
}
/* 二级分类样式 */
.right-category-container {
  flex: 1;
  margin: 10px;
  .right-category-item {
    display: flex;
    flex-direction: column;
    .right-category-item-top {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 15px;
      background-color: antiquewhite;
      border-radius: 10px;
    }
    .right-category-item-bottom-content {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
      .item-name {
        min-width: 100rpx; // 增加最小宽度约束
        border-radius: 16rpx;
        padding: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        line-height: 1.5;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1); // 增加视觉层次
        white-space: nowrap; // 防止文本换行;
      }
    }
  }
}
</style>

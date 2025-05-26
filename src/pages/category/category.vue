<template>
  <view class="h-screen flex flex-col">
    <!-- 标题栏 -->
    <view
      class="flex flex-row justify-around items-end h-20 bg-slate-100 border-solid border-yellow-600"
      :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="inline-block px-5 py-0 text-black relative"
        :class="`${currentTabIndex === index ? 'font-bold text-black' : ''}`"
        @click="handleTabClick(index)">
        {{ tab }}
      </view>
    </view>

    <view class="flex-1 px-0 py-0 overflow-hidden">
      <swiper class="h-screen" @change="onSwiperChange">
        <!-- 内容区域,头部标题 -->
        <swiper-item
          class="h-screen flex flex-row overflow-hidden"
          v-for="(tab, index) in tabs"
          :key="index">
          <!-- 左侧：一级分类 -->
          <scroll-view
            class="w-20 flex-none h-full bg-slate-100"
            scroll-y
            show-scrollbar="false">
            <view
              v-for="(category, index) in primaryCategories"
              :key="category.id"
              class="flex flex-col items-center justify-center h-20 text-black relative"
              :class="`${index === activePrimaryIndex ? 'text-yellow-600' : ''}`"
              @tap="setActivePrimaryCategory(index)">
              <text>{{ category.name }}</text>
            </view>
          </scroll-view>
          <!-- 右侧：二级分类 -->
          <scroll-view
            class="flex-1 overflow-hidden h-full rounded-t-lg bg-slate-500"
            scroll-y
            scroll-with-animation
            :scroll-top="rightScrollTop"
            @scroll="onRightScroll">
            <view
              v-for="(category, index) in primaryCategories"
              :key="category.id"
              class="flex flex-col">
              <view class="h-12 text-lg text-black text-center">
                {{ category.name }}
              </view>
              <view class="grid grid-cols-3 gap-2">
                <view
                  class="h-6 text-black text-center"
                  v-for="(subCategory, subIndex) in category.children"
                  :key="subIndex">
                  {{ subCategory.name }}
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
import { onShow } from '@dcloudio/uni-app'
import { getCurrentInstance, onMounted, ref } from 'vue'
// 标签页数据
const currentTabIndex = ref(0)
// 当前激活的一级分类索引
const activePrimaryIndex = ref(0)
// 一级分类列表
const primaryCategories = ref<CategoryItem[]>([])
// 二级分类列表
const secondaryCategories = ref<CategoryItem[]>([])

// 加载状态
const isLoading = ref(true)
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//获取标签页数据
const tabs = ref<string[]>([])

//rightScrollTop
const rightScrollTop = ref(0)
const rightDomsTop = ref<number[]>([])
const leftDomsTop = ref<number[]>([])

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
      // console.log('左边top：', leftDomsTop.value)
    })
    .exec()
  query
    .selectAll('.right-secondary-category-item')
    .boundingClientRect((data) => {
      // console.log('右边data：', data)

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
      // console.log('右边top：', rightDomsTop.value)
    })
    .exec()
})

onShow(async () => {
  //1.获取标签页数据
  getTabsData()
  //2.获取左侧二级分类数据
  await fetchOneCategoriesData(1)
  //3.获取三级分类数据
  await fetchTwoCategoriesData(1)
  isLoading.value = false
})

// 分类数据
type CategoryItem = {
  id: number
  name: string
  children?: CategoryItem[]
}

// 获取标签页数据
const getTabsData = () => {
  tabs.value = ['男生', '女生 ', '听书', '出版', '短剧']
}

// 点击触发
const handleTabClick = (index: number) => {
  currentTabIndex.value = index
  activePrimaryIndex.value = 0
  fetchOneCategoriesData(currentTabIndex.value)
  fetchTwoCategoriesData(primaryCategories.value[0].id)
}

// 滑动触发（删除重复定义）
const onSwiperChange = (e: any) => {
  currentTabIndex.value = e.detail.current
  activePrimaryIndex.value = 0
  fetchOneCategoriesData(1)
  fetchTwoCategoriesData(primaryCategories.value[0].id)
}

// 设置激活分类
const setActivePrimaryCategory = (index: number) => {
  console.log('index:' + index)
  activePrimaryIndex.value = index

  // 滚动到对应的二级分类容器
  // 右边scroll-view滚动到对应区块
  // 修正类型错误，正确访问 ref 变量的值
  rightScrollTop.value = rightDomsTop.value[index]
  // console.log('rightScrollTop.value:' + rightScrollTop.value)
}

//滚动右侧区域，左侧联动，具体这个284值，需要根据自己的实际情况来调整
const onRightScroll = (e: any) => {
  const scrollTop = e.detail.scrollTop // 当前滚动值
  let minGreater = Infinity // 记录比scrollTop大的最小值
  let minIndex = -1 // 记录对应的索引

  rightDomsTop.value.forEach((v, k) => {
    if (v > scrollTop && v < minGreater) {
      minGreater = v
      minIndex = k
    }
  })

  if (minIndex !== -1) {
    activePrimaryIndex.value = minIndex
    // console.log(`找到比${scrollTop}大的最小元素：${minGreater}，索引：${minIndex}`)
  } else {
    // console.log(`未找到比${scrollTop}大的元素`)
  }
}
// 获取分类数据方法
const categoryNames = [
  '历史',
  '文学经典',
  '影视小说',
  '精品小说',
  '社会文化',
  '心理',
  '个人成长',
  '经历管理',
  '艺术',
  '生活百科',
  '养生健康',
  '玄幻',
  '科幻',
  '都市',
  '诸天万界'
]

const fetchOneCategoriesData = async (index: number) => {
  setTimeout(() => {
    primaryCategories.value = Array(16)
      .fill({})
      .map((_, i) => ({
        id: i + 1,
        name: categoryNames[i % categoryNames.length],
        children: Array(10)
          .fill({})
          .map((_, j) => ({
            id: j + 1,
            name: categoryNames[j % categoryNames.length]
          }))
      }))
  })
}

const fetchTwoCategoriesData = async (parentId: number) => {
  setTimeout(() => {
    secondaryCategories.value = Array(50)
      .fill({})
      .map((_, i) => ({
        id: i + 1,
        name: categoryNames[i % categoryNames.length]
      }))
  })
}
</script>

<style lang="scss">
// .viewreport {
//   height: 100%;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   background-color: #f6f6f6;
// }
// 顶部标签
// .top-tabs {
//   // display: flex;
//   // justify-content: space-around;
//   // align-items: flex-end;
//   // height: 80px;
//   // position: sticky;
//   // top: 0;
//   // z-index: 100;

//   .tab {
//     // display: inline-block;
//     // padding: 0 20rpx;
//     // font-size: 32rpx;
//     // color: #929292;
//     // position: relative;

//     // &.active {
//     //   color: #000000;
//     //   font-weight: bold;
//     // }
//   }
// }

// 底部容器
// .middle-container {
//   flex: 1;

//   padding: 0 20px;

// .swiper {
// height: 100%;
// height: 85vh;
// .swiper-item {
// 必须有一个固定高度
// height: 100vh;
// display: flex;
// flex-direction: row;
/* 一级分类样式 */
// .left-primary-category-container {
/* 隐藏溢出内容 */
// overflow: hidden;
/* 设置宽度 */
// width: 180rpx;
/* 不占据剩余空间 */
// flex: none;
/* 设置背景颜色 */
// height: 100%;
/* 一级分类项样式 */
// .left-category-item {
/* 使用Flex布局，子元素垂直居中，水平居中 */
// display: flex;
// justify-content: center;
// align-items: center;
// /* 设置高度 */
// height: 96rpx;
// /* 设置字体大小 */
// font-size: 26rpx;
// /* 设置文字颜色 */
// color: black;
// /* 设置相对定位 */
// position: relative;
// }

/* 激活的一级分类项样式 */
// .left-category-item-active {
//           // color: #e96846;
//         }
//       }
//       /* 二级分类样式 */
//       .right-secondary-category-container {
//         flex: 1;
//         .right-secondary-category-item {
//           display: flex;
//           flex-direction: column;
//           // border: 1px solid #e96846;
//           .right-secondary-category-item-top-name {
//             height: 50px;
//             // border: 1px solid #757575;
//             display: flex;
//             align-items: center;
//             justify-content: space-around;
//           }
//           .right-secondary-category-item-bottom-content {
//             flex: 1;
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 10px;
//             padding: 10px;
//             box-sizing: border-box;
//             .item-name {
//               min-width: 100rpx; // 增加最小宽度约束
//               border-radius: 16rpx;
//               padding: 20rpx;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               font-size: 24rpx;
//               line-height: 1.5;
//               box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1); // 增加视觉层次
//               white-space: nowrap;
//             }
//           }
//         }
//       }
//     }
//   }
// }
</style>

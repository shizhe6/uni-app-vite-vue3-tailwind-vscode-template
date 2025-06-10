<template>
  <view class="h-screen flex flex-col">
    <!-- 头部 一级导航 -->
    <view class="h-[30px]">
      <scroll-view
        class="w-full whitespace-nowrap h-[40px] bg-[#fafafa]"
        scroll-x="true"
        :scroll-left="scrollTop"
        @scroll="handleTopScroll">
        <view
          v-for="(item, index) in primaryListData"
          :key="index"
          class="scroll-view-item_H"
          :class="{
            'font-bold text-amber-600 text-xl': activePrimaryTab === index
          }"
          @tap="handlePrimaryTabChange(index)">
          {{ item.name }}
        </view>
      </scroll-view>
    </view>

    <!-- 二级导航和内容 -->
    <view class="flex-1">
      <swiper
        easing-function="linear"
        class="h-[100vh]"
        @change="onSwiperChange"
        :current="activePrimaryTab">
        <swiper-item
          class="h-[100vh] flex flex-row border border-black"
          v-for="(tab, index) in primaryListData"
          :key="index">
          <SzLoading v-if="isLoadingQueryBook"></SzLoading>
          <view v-else class="flex">
            <!-- 二级导航 -->
            <scroll-view class="w-[130rpx] bg-[#fafafa]" scroll-y>
              <view
                v-for="(subItem, subIndex) in secondaryListData"
                :key="subIndex"
                class="h-[96rpx] flex items-center justify-center text-[26rpx] relative"
                :class="{
                  'font-bold text-amber-600': activeSecondaryTab === subIndex
                }"
                @tap="handleSecondaryTabChange(subIndex)">
                {{ subItem.name }}
              </view>
            </scroll-view>
            <!-- 排行榜对应的书本 -->
            <scroll-view
              class="flex-1 p-[20rpx] bg-white"
              scroll-y
              @scrolltolower="pageQueryBookListByRankData">
              <navigator
                v-for="(book, bookIndex) in bookListData"
                :key="bookIndex"
                url="/pages/book/detail"
                class="flex p-[20rpx] mb-[20rpx] rounded-[16rpx] bg-[#f8f8f8]">
                <view
                  class="text-[50rpx] font-medium text-[#999] mr-[10px] flex items-center"
                  :class="{
                    'text-[#d6a364] font-semibold':
                      bookIndex === 0 || bookIndex === 1 || bookIndex === 2
                  }">
                  {{ book.sortNumber }}
                </view>
                <image
                  :src="book.image"
                  class="w-[160rpx] h-[220rpx] rounded-[8rpx]" />
                <view
                  class="flex-1 ml-[20rpx] flex flex-col justify-center items-start">
                  <text class="block text-[30rpx] font-medium mb-[10rpx]">
                    {{ book.name }}
                  </text>
                  <view class="text-[#999]">
                    <text>{{ book.tagOne }} ·</text>
                    <text>{{ book.status }} ·</text>
                    <text>{{ book.hot }}</text>
                  </view>
                </view>
              </navigator>
            </scroll-view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { commonPageQueryData } from '@/services/global'
import { initPrimaryListAPI, pageQueryBookListByRankAPI } from '@/services/rank'
import { BookItem } from '@/types/book'
import { PageParams } from '@/types/global'
import { PrimaryRankItem, SecondaryRankItem } from '@/types/rank'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 一级排行榜当前选中状态
const activePrimaryTab = ref<number>(0)
// 二级排行榜当前选中状态
const activeSecondaryTab = ref<number>(0)

// 一级排行榜数据
const primaryListData = ref<PrimaryRankItem[]>([])
// 二级排行榜数据
const secondaryListData = ref<SecondaryRankItem[]>([])
// 书籍数据
const bookListData = ref<BookItem[]>([])
// 是否加载中获取数据
const isLoadingQueryBook = ref(false)

/**
 * 页面加载时调用
 */
onShow(async () => {
  // 初始化一级排行榜数据
  await initPrimaryListData()
  // 默认加载第一个一级分类的书籍数据
  handlePrimaryTabChange(0)
})

/**
 * 初始化一级排行榜数据
 */
const initPrimaryListData = async () => {
  console.log('initPrimaryListData')
  primaryListData.value = await initPrimaryListAPI()
}
/**
 *
 * @param e 一级排行榜切换事件
 */
const onSwiperChange = (e: any) => {
  // 说明此时是点击事件触发了一级菜单变化，不需要再次循环查询了
  if (e.detail.current === activePrimaryTab.value) {
    return
  }
  console.log('onSwiperChange' + e.detail.current)

  // 正常的一级菜单左右滑动
  // 计算一级榜单移动距离
  handleTopScroll(e.detail.current)

  //一级排行榜按钮点击事件
  handlePrimaryTabChange(e.detail.current)
}

/**
 * 一级排行榜按钮点击事件
 * @param index 一级排行榜索引
 */
const handlePrimaryTabChange = async (index: number) => {
  console.log('handlePrimaryTabChange' + index)
  isLoadingQueryBook.value = true
  // 设置一级导航选中状态，这个会触发滑动事件
  activePrimaryTab.value = index

  // 获取二级导航数据
  secondaryListData.value = primaryListData.value[index].subItems

  // 重置二级导航选中状态
  await handleSecondaryTabChange(0)

  // 休息1秒
  await new Promise((resolve) => setTimeout(resolve, 1000))
  isLoadingQueryBook.value = false
}

/**
 * 二级排行榜切换
 * @param index 二级排行榜索引
 */
const handleSecondaryTabChange = async (index: number) => {
  console.log('handleSecondaryTabChange' + index)
  // 设置二级导航选中索引
  activeSecondaryTab.value = index

  // 分页书籍数据
  await pageQueryBookListByRankData()
}
// 是否加载完成
const finish = ref(false)
// 是否正在加载
const isLoading = ref(true)
// 分页参数
const pageParams: Required<PageParams> = {
  current: 1,
  size: 8
}
// 查询参数
const queryParams = ref({
  activePrimaryTab: activePrimaryTab.value,
  activeSecondaryTab: activeSecondaryTab.value
})
/**
 * 查询分页数据
 */
const pageQueryBookListByRankData = async () => {
  console.log('pageQueryBookListByRankData')
  // 分页查询书籍列表
  await commonPageQueryData(
    pageQueryBookListByRankAPI,
    bookListData,
    finish,
    isLoading,
    pageParams,
    queryParams
  )
}

// 一级分类左右滑动距离
const scrollTop = ref(0)
// 一级分类切换，触发左右滑动
const handleTopScroll = (current: number) => {
  console.log('handleTopScroll' + current)
  // 判断是左滑动还是右滑动
  if (current > activePrimaryTab.value) {
    // 右滑动
    if (current > 0) {
      scrollTop.value = (current - 1) * 100
    }
  } else {
    // 左滑动
    if (current >= 0) {
      scrollTop.value = scrollTop.value - 100
    }
  }
}
</script>

<style lang="scss">
.scroll-view-item_H {
  display: inline-block;
  width: 20%;
  height: 30px;
  text-align: center;
}
</style>

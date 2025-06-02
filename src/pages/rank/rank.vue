<template>
  <view class="h-full flex flex-col">
    <!-- 头部 一级导航 -->
    <view
      class="flex justify-start items-center h-[40px] overflow-x-auto flex-nowrap scroll-smooth">
      <view
        v-for="(item, index) in primaryListData"
        :key="index"
        class="px-[20rpx] text-[32rpx] relative whitespace-nowrap"
        :class="{ 'font-bold text-amber-600': activePrimaryTab === index }"
        @tap="handlePrimaryTabChange(index)">
        {{ item.name }}
      </view>
    </view>

    <!-- 二级导航和内容 -->
    <view class="flex-1">
      <swiper class="h-[85vh]" @change="onSwiperChange">
        <swiper-item
          class="h-[100vh] flex flex-row border border-black"
          v-for="(tab, index) in primaryListData"
          :key="index">
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
          <scroll-view class="flex-1 p-[20rpx] bg-white" scroll-y>
            <view
              v-for="(book, bookIndex) in bookListData"
              :key="bookIndex"
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
                :src="book.cover"
                class="w-[160rpx] h-[220rpx] rounded-[8rpx]" />
              <view
                class="flex-1 ml-[20rpx] flex flex-col justify-center items-start">
                <text class="block text-[30rpx] font-medium mb-[10rpx]">
                  {{ book.name }}
                </text>
                <view class="text-[#999]">
                  <text>{{ book.type }} ·</text>
                  <text>{{ book.status }} ·</text>
                  <text>{{ book.hot }}</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { initBookListAPI, initPrimaryListAPI } from '@/services/rank'
import { BookItem } from '@/types/book'
import { PrimaryRankItem, SecondaryRankItem } from '@/types/rank'
import { onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'

// 一级排行榜当前选中状态
const activePrimaryTab = ref<number>(0)
// 二级排行榜当前选中状态
const activeSecondaryTab = ref<number>(0)

// 一级排行榜数据
const primaryListData = ref<PrimaryRankItem[]>([])
// 二级排行榜数据
const secondaryListData = reactive<SecondaryRankItem[]>([])
// 书籍数据
const bookListData = reactive<BookItem[]>([])

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
  primaryListData.value = await initPrimaryListAPI()
}
/**
 *
 * @param e 一级排行榜切换事件
 */
const onSwiperChange = (e: any) => {
  handlePrimaryTabChange(e.detail.current)
}

/**
 *
 * @param index 一级排行榜索引
 */
const handlePrimaryTabChange = async (index: number) => {
  // 设置一级导航选中状态
  activePrimaryTab.value = index

  //使用 Infinity 表示删除所有旧数据，直接填充新数据
  secondaryListData.splice(
    0,
    Infinity,
    ...primaryListData.value[index].subItems
  )

  // 重置二级导航选中状态
  await handleSecondaryTabChange(0)
}

/**
 * 二级排行榜切换
 * @param index 二级排行榜索引
 */
const handleSecondaryTabChange = async (index: number) => {
  activeSecondaryTab.value = index

  // 初始化书籍数据
  const books = await initBookListAPI(
    activePrimaryTab.value,
    activeSecondaryTab.value
  )
  bookListData.splice(0, Infinity, ...books)
}
</script>

<style lang="scss"></style>

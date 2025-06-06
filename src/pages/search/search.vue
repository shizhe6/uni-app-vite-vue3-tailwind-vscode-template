<template>
  <view class="flex flex-col h-screen">
    <!-- 1.搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="searchKeyword"
        @clear="handleClear"
        @input="handleInput"
        @confirm="handleSearch"></uni-easyinput>
    </view>

    <!-- 2.1推荐搜索 -->
    <view v-if="showRecommendSearchName" class="flex-1 flex flex-col mt-4">
      <view
        @click="handleSearchRecommend(item)"
        v-for="item in recommendSearchNameData"
        class="mb-4 px-4">
        <uni-icons type="search" size="20"></uni-icons>
        {{ item }}
      </view>
    </view>

    <!-- 2.2搜索结果  列表 -->
    <view v-if="showSearchBook" class="flex-1 flex flex-col mt-4 mx-2">
      <navigator
        url="/pages/book/detail"
        v-for="book in searchBookData"
        :key="book.id"
        class="flex flex-row justify-center mt-10">
        <!-- 书籍封面 -->
        <image
          class="w-[80px] h-[100px] rounded-lg mr-2"
          :src="book.image"
          mode="aspectFill" />

        <!-- 书籍信息 -->
        <view class="flex-1">
          <!-- 标题和评分 -->
          <view class="flex items-center justify-between">
            <view class="overflow-hidden whitespace-nowrap text-ellipsis">
              {{ book.name }}
            </view>
            <view class="w-[40px] font-bold text-amber-600">
              {{ book.score }}分
            </view>
          </view>

          <!-- 描述信息 -->
          <view class="text-sm text-gray-400 mt-2">
            {{ book.description }}
          </view>

          <!-- 标签 -->
          <view class="text-sm text-gray-400 mt-2">
            <text v-for="(tag, index) in book.tagList">{{ tag }}·</text>
          </view>
        </view>
      </navigator>
    </view>

    <!-- 2.3 展示排行榜 -->
    <scroll-view
      v-if="showRank"
      class="flex-1 flex flex-col mt-[40px] overflow-hidden"
      scroll-y>
      <!-- 2.1搜索历史 -->
      <view class="h-auto mb-4 my-4">
        <view class="flex justify-between items-center px-8">
          <text class="title text-7 font-bold">搜索历史</text>
          <view @click="toggleShowAll = !toggleShowAll">
            <text>{{ toggleShowAll ? '收起 ˄' : '展开 ˅' }}</text>
          </view>
        </view>
        <!-- 历史列表 -->
        <view class="flex flex-wrap gap-5 p-5">
          <uni-tag
            v-for="(item, index) in toggleShowAll
              ? searchHistoryData
              : searchHistoryData.slice(0, 12)"
            :key="index"
            :text="item.name"
            :inverted="true"
            @click="handleSearchHistory(item)" />
        </view>
      </view>

      <!-- 2.2热搜榜单 -->
      <view class="flex-1 overflow-y-auto">
        <scroll-view scroll-x class="w-full whitespace-nowrap">
          <view class="inline-flex">
            <view
              v-for="(list, index) in hotSearchData"
              :key="index"
              class="w-52 m-4 p-4 rounded-lg"
              :class="'rank-background-' + index">
              <!-- 推荐榜单名称 -->
              <view class="flex items-center mb-5">
                <text class="font-bold pl-2.5 mr-2.5">
                  {{ list.title }}
                </text>
                <uni-icons type="right" size="14" color="#999" />
              </view>
              <!-- 推荐榜单内容 -->
              <view class="flex flex-col gap-5">
                <view
                  v-for="(item, idx) in list.subItems"
                  :key="idx"
                  class="flex flex-row items-center py-2.5"
                  @click="handleHotSearch(item)">
                  <!-- 排名 -->
                  <text class="w-10">
                    {{ idx + 1 }}
                  </text>
                  <!-- 标题 -->
                  <view class="flex flex-column">
                    <text>
                      {{ item.name }}
                    </text>
                    <text>
                      {{ item.heat }}
                    </text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { queryBookBySearchKeywordAPI } from '@/services/category'
import {
  initHotSearchListsAPI,
  initSearchHistoryAPI,
  queryRecommendSearchNameAPI
} from '@/services/search'
import { BookItem } from '@/types/book'
import { HotItem, SearchHistoryItem } from '@/types/search'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// toggleShowAll
const toggleShowAll = ref(false)
// 搜索关键词
const searchKeyword = ref('')
// 搜索历史
const searchHistoryData = ref<SearchHistoryItem[]>([])
// 热搜榜单
const hotSearchData = ref<HotItem[]>([])
// 推荐搜索名称
const recommendSearchNameData = ref<string[]>([])
// 搜索列表
const searchBookData = ref<BookItem[]>([])
// 展示的搜索列表
const showSearchBook = ref(false)
// 展示排行榜
const showRank = ref(false)
// 展示推荐搜索名称
const showRecommendSearchName = ref(false)

/**
 * 清空搜索框内容
 */
const handleClear = () => {
  console.log('handleClear' + searchKeyword.value)
  searchKeyword.value = ''
  showRankPage()
}
/**
 * 搜索框开始搜索
 * @returns
 */
const handleSearch = () => {
  // 获取搜索列表
  querySearchBookData()
  // 展示搜索列表
  showSearchBookPage()
}

/**
 * 搜索框内容改变时触发
 * @param e 输入框内容
 */
const handleInput = (e: any) => {
  console.log('handleInput' + searchKeyword.value)
  // 查询推荐搜索名称
  queryRecommendSearchNameData()
  // 展示推荐搜索名称
  showRecommendSearchNamePage()
}

/**
 * 点击推荐书本名称时触发
 * @param item 推荐搜索名称
 */
const handleSearchRecommend = (item: string) => {
  // 将搜索历史放到搜索框中
  searchKeyword.value = item
  // 查询书籍列表
  querySearchBookData()
  //展示搜索列表
  showSearchBookPage()
}

/**
 * 展示排行榜
 */
const showRankPage = () => {
  showRank.value = true
  showSearchBook.value = false
  showRecommendSearchName.value = false
}
/**
 * 展示搜索结果
 */
const showSearchBookPage = () => {
  showRank.value = false
  showSearchBook.value = true
  showRecommendSearchName.value = false
}

/**
 * 展示推荐搜索名称
 */
const showRecommendSearchNamePage = () => {
  showRank.value = false
  showSearchBook.value = false
  showRecommendSearchName.value = true
}

/**
 * 搜索框内容改变时触发
 * @param e
 */
const queryRecommendSearchNameData = () => {
  recommendSearchNameData.value = queryRecommendSearchNameAPI(
    searchKeyword.value
  )
}

/**
 * 点击搜索历史时触发
 * @param item 搜索历史
 */
const handleSearchHistory = (item: SearchHistoryItem) => {
  // 将搜索历史放到搜索框中
  searchKeyword.value = item.name
  // 开始搜索
  handleSearch()
}

/**
 * 点击排行榜中的书本触发
 * @param item 热搜榜单
 */
const handleHotSearch = (item: any) => {
  searchKeyword.value = item.name
  handleSearch()
}
/**
 * 页面加载时调用
 */
onShow(() => {
  // 初始化搜索历史
  initSearchHistoryData()
  // 初始化热搜榜单
  initHotSearchListsData()
  // 展示展示排行榜
  showRankPage()
})

/**
 * 初始化数据
 */
const initSearchHistoryData = () => {
  searchHistoryData.value = initSearchHistoryAPI()
}
/** */
const initHotSearchListsData = () => {
  hotSearchData.value = initHotSearchListsAPI()
}

/**
 * 查询书籍列表
 */
const querySearchBookData = () => {
  searchBookData.value = queryBookBySearchKeywordAPI(searchKeyword.value)
  searchBookData.value.forEach((book) => {
    book.description =
      book.description!.length > 25
        ? book.description!.slice(0, 25) + '...'
        : book.description
    book.name =
      book.name!.length > 15 ? book.name!.slice(0, 14) + '...' : book.name
  })
}
</script>

<style lang="scss">
/* 分别定义三个元素的背景色 */
.rank-background-0 {
  background: #020024;
  background: linear-gradient(
    0deg,
    rgb(186, 182, 254) 0%,
    rgb(148, 253, 148) 35%
  );
}

.rank-background-1 {
  background: #22c1c3;
  background: linear-gradient(
    0deg,
    rgb(114, 253, 255) 0%,
    rgb(249, 220, 157) 100%
  );
}

.rank-background-2 {
  background: #833ab4;
  background: linear-gradient(
    0deg,
    rgba(244, 85, 85) 0%,
    rgba(254, 203, 132) 100%
  );
}
</style>

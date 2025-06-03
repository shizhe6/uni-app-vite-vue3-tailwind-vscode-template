<template>
  <view class="flex flex-col h-screen">
    <!-- 搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="keyword"
        @confirm="handleSearch"></uni-easyinput>
    </view>

    <!-- 滚动内容 -->
    <scroll-view
      class="flex-1 flex flex-col mt-[40px] overflow-hidden"
      scroll-y>
      <!-- 搜索历史 -->
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
            @click="searchFromHistory(item)" />
        </view>
      </view>

      <!-- 热搜榜单 -->
      <view class="flex-1 overflow-y-auto">
        <scroll-view scroll-x class="w-full whitespace-nowrap">
          <view class="inline-flex">
            <view
              v-for="(list, index) in hotSearchData"
              :key="index"
              class="w-52 m-4 p-4 rank-backgroud-color rounded-lg">
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
import { initHotSearchListsAPI, initSearchHistoryAPI } from '@/services/search'
import { HotItem, SearchHistoryItem } from '@/types/search'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// toggleShowAll
const toggleShowAll = ref(false)

const keyword = ref('')

// 搜索历史
const searchHistoryData = ref<SearchHistoryItem[]>([])

// 热搜榜单
const hotSearchData = ref<HotItem[]>([])

const handleSearch = () => {
  if (!keyword.value) return
  // 实际搜索逻辑
}

const searchFromHistory = (item: SearchHistoryItem) => {
  keyword.value = item.name
  handleSearch()
}

const handleHotSearch = (item: any) => {
  // 处理热搜点击
}

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
 * 页面加载时调用
 */
onShow(() => {
  // 初始化数据
  initSearchHistoryData()
  initHotSearchListsData()
})
</script>

<style lang="scss">
.rank-backgroud-color {
  background-color: #ebb6b6;
  border: 1px solid #e61d1d;
}
</style>

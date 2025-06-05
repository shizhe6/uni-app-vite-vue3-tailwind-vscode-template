<template>
  <view class="h-screen flex flex-col">
    <!-- 1.搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="searchKeyword"
        @confirm="handleSearch"></uni-easyinput>
    </view>

    <!-- 2.搜索条件 -->
    <view
      class="h-[180px] flex flex-col gap-5 mt-[40px] border-b border-gray-100">
      <!-- 标签 -->
      <view class="h-[40px] flex">
        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 mt-2">
          <view
            v-for="(tagItem, index) in queryTagData"
            @click="handleTag(tagItem)"
            :class="{
              'font-bold text-amber-600  bg-orange-200':
                selectedTueryTag.includes(tagItem)
            }"
            class="inline-block ml-3 rounded-lg p-1">
            {{ tagItem }}
          </view>
        </view>
        <view class="ml-3" @click="showTags = !showTags">
          <uni-badge :text="selectedTagsBadgeText"></uni-badge>
        </view>
      </view>

      <!-- 查询条件 -->
      <view class="h-[120px] flex flex-col justify-center">
        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 my-2">
          <view
            class="inline-block ml-3"
            @click="handleQueryWordCount(wordCountItem)"
            v-for="(wordCountItem, index) in queryWordCountData"
            :class="{
              'font-bold text-amber-600':
                wordCountItem === selectedQueryWordCount
            }">
            {{ wordCountItem }}
          </view>
        </view>

        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 my-2">
          <view
            class="inline-block ml-3"
            @click="handleQueryStatus(statusItem)"
            v-for="(statusItem, index) in queryStatusData"
            :class="{
              'font-bold text-amber-600': statusItem === selectedQueryStatus
            }">
            {{ statusItem }}
          </view>
        </view>

        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 my-2">
          <view
            class="inline-block ml-3"
            @click="handleQueryType(typeItem)"
            v-for="(typeItem, index) in queryTypeData"
            :class="{
              'font-bold text-amber-600': typeItem === selectedQueryType
            }">
            {{ typeItem }}
          </view>
        </view>
      </view>
    </view>
    <!-- 3.搜索结果 -->
    <view class="flex-1 flex flex-col mt-4">
      <!-- 圈子 -->
      <view class="h-[40px] flex flex-row justify-start items-center">
        <view
          v-for="item in selectedTueryTag"
          class="h-[40px] rounded-lg ml-3 px-3 flex flex-row justify-center items-center bg-gray-100">
          <image
            class="w-[30px] h-[30px] rounded-full mr-2"
            src="https://picsum.photos/200/300?random=1"
            mode="aspectFill" />
          <view>{{ item }} ›</view>
        </view>
      </view>

      <!-- 书本列表 -->
      <view class="flex-1 mx-3">
        <navigator
          url="/pages/book/detail"
          v-for="book in bookData"
          :key="book.id"
          class="flex flex-row justify-center mt-10">
          <!-- 书籍封面 -->
          <image
            class="w-[80px] h-[100px] rounded-lg mr-2"
            :src="book.cover"
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
    </view>

    <!-- 4.底部弹窗 -->
    <view class="tagView" v-if="showTags">底部弹窗</view>
  </view>
</template>

<script lang="ts" setup>
import {
  initBookDataAPI,
  initQueryStatusDataAPI,
  initQueryTagAPI,
  initQueryTypeDataAPI,
  initQueryWordCountDataAPI
} from '@/services/categorySearch'
import { BookItem } from '@/types/book'
import { CategorySearchParams } from '@/types/categorySearch'

// 搜索关键词
const searchKeyword = ref('')
// 书籍列表
const bookData = ref<BookItem[]>([])
// 查询条件：标签
const queryTagData = ref<string[]>([])
//查询条件：字数
const queryWordCountData = ref<string[]>([])
// 查询条件：状态
const queryStatusData = ref<string[]>([])
// 查询条件：类型
const queryTypeData = ref<string[]>([])

// 选中的查询条件
const selectedTueryTag = ref<string[]>([])
const selectedQueryWordCount = ref('')
const selectedQueryStatus = ref('')
const selectedQueryType = ref('')
// 查询参数
const queryParams = ref<CategorySearchParams>({
  tag: selectedTueryTag.value,
  wordCount: selectedQueryWordCount.value,
  status: selectedQueryStatus.value,
  type: selectedQueryType.value,
  name: searchKeyword.value
})

/**
 * 页面加载时初始化数据
 */
onShow(() => {
  // 初始化查询条件：标签
  initQueryTagData()
  // 初始化查询条件：字数
  initQueryWordCountData()
  // 初始化查询条件：状态
  initQueryStatusData()
  // 初始化查询条件：类型
  initQueryTypeData()
  // 初始化书籍列表
  initBookData()
})

/**
 * 搜索
 */
const handleSearch = () => {
  if (!searchKeyword.value) return
  console.log('搜索关键词：', searchKeyword.value)
}

/**
 * 搜索条件：标签
 */
const initQueryTagData = () => {
  queryTagData.value = initQueryTagAPI()
  selectedTueryTag.value = queryTagData.value.slice(0, 3)
}
/**
 * 初始化查询条件：字数
 */
const initQueryWordCountData = () => {
  queryWordCountData.value = initQueryWordCountDataAPI()
  selectedQueryWordCount.value = queryWordCountData.value[0]
}

/**
 * 初始化查询条件：状态
 */
const initQueryStatusData = () => {
  queryStatusData.value = initQueryStatusDataAPI()
  selectedQueryStatus.value = queryStatusData.value[0]
}

/**
 * 初始化查询条件：类型
 */
const initQueryTypeData = () => {
  // 初始化查询条件
  queryTypeData.value = initQueryTypeDataAPI()
  // 初始化选中的查询条件
  selectedQueryType.value = queryTypeData.value[0]
}

/**
 * 初始化书籍列表
 */
const initBookData = () => {
  bookData.value = initBookDataAPI(queryParams.value)
  // 书本的字段description， book.description!.length > 25? book.description!.slice(0, 25) + '...': book.description
  // book.name!.length > 15? book.name!.slice(0, 14) + '...': book.name
  bookData.value.forEach((book) => {
    book.description =
      book.description!.length > 25
        ? book.description!.slice(0, 25) + '...'
        : book.description
    book.name =
      book.name!.length > 15 ? book.name!.slice(0, 14) + '...' : book.name
  })
}
/**
 *
 * @param query 查询条件：字数
 */
const handleQueryWordCount = (query: string) => {
  selectedQueryWordCount.value = query
}
/**
 *
 * @param query 查询条件：状态
 */
const handleQueryStatus = (query: string) => {
  selectedQueryStatus.value = query
}

/**
 *
 * @param query 查询条件：类型
 */
const handleQueryType = (query: string) => {
  selectedQueryType.value = query
}

/**
 *
 * 选中标签，如果超过3个，提示最多可选3个标签，反之则添加标签
 */
const handleTag = (tag: string) => {
  if (selectedTueryTag.value.includes(tag)) {
    // 如果标签已选中，则移除该标签
    selectedTueryTag.value = selectedTueryTag.value.filter(
      (item) => item !== tag
    )
  } else {
    if (selectedTueryTag.value.length >= 3) {
      // 提示最多可选3个标签
      uni.showToast({
        title: '最多可选3个标签',
        icon: 'none'
      })
    } else {
      // 添加标签
      selectedTueryTag.value.push(tag)
    }
  }
}
// showTags
const showTags = ref(false)

// 显示选中的标签数量
const selectedTagsBadgeText = computed(() => {
  return selectedTueryTag.value.length > 0 ? selectedTueryTag.value.length : '>'
})
</script>

<style lang="scss">
/* 底部弹窗 */
.tagView {
  position: fixed;
  bottom: 0;
  background-color: aqua;
  height: 65vh;
  width: 100%;
}
</style>

<template>
  <view class="h-screen flex flex-col">
    <!-- 1.搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="keyword"
        @confirm="handleSearch"></uni-easyinput>
    </view>

    <!-- 2.搜索条件 -->
    <view class="h-[180px] flex flex-col gap-5 mt-[40px] border">
      <!-- 标签 -->
      <view class="h-[40px] flex">
        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 mt-2">
          <view
            v-for="(item, index) in tagList"
            :class="{
              'font-bold text-amber-600 border bg-orange-200':
                selectedTags.includes(item)
            }"
            class="inline-block ml-3 rounded-lg border-gray-300 border p-1">
            {{ item }}
          </view>
        </view>
        <view class="ml-3" @click="showTags = !showTags">
          {{ selectedTags.length > 0 ? selectedTags.length : '>' }}
        </view>
      </view>

      <!-- 查询条件 -->
      <view class="h-[120px]border flex flex-col justify-center">
        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 my-2">
          <view
            class="inline-block ml-3"
            @click="handleQuery1(item1)"
            v-for="(item1, index) in queryList1"
            :class="{
              'font-bold text-amber-600': item1 === selectedQuery1
            }">
            {{ item1 }}
          </view>
        </view>

        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 my-2">
          <view
            class="inline-block ml-3"
            @click="handleQuery2(item2)"
            v-for="(item2, index) in queryList2"
            :class="{
              'font-bold text-amber-600': item2 === selectedQuery2
            }">
            {{ item2 }}
          </view>
        </view>

        <view
          class="whitespace-nowrap overflow-x-auto flex items-center pl-2 my-2">
          <view
            class="inline-block ml-3"
            @click="handleQuery3(item3)"
            v-for="(item3, index) in queryList3"
            :class="{
              'font-bold text-amber-600': item3 === selectedQuery3
            }">
            {{ item3 }}
          </view>
        </view>
      </view>
    </view>
    <!-- 3.搜索结果 -->
    <view class="flex-1 border flex flex-col mt-9">
      <!-- 圈子 -->
      <view class="h-[60px] border flex flex-row justify-start items-center">
        <view
          v-for="item in selectedTags"
          class="h-[40px] rounded-lg ml-6 px-3 flex flex-row justify-center items-center bg-gray-100">
          <image
            class="w-[30px] h-[30px] rounded-full mr-2"
            src="https://picsum.photos/200/300?random=1"
            mode="aspectFill" />
          <view>{{ item }} ›</view>
        </view>
      </view>

      <!-- 书本列表 -->
      <view class="flex-1 mx-3">
        <view
          v-for="book in bookList"
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
                {{
                  book.name!.length > 15
                    ? book.name!.slice(0, 14) + '...'
                    : book.name
                }}
              </view>
              <view class="w-[40px] font-bold text-amber-600">
                {{ book.score }}分
              </view>
            </view>

            <!-- 描述信息 -->
            <view class="text-sm text-gray-400 mt-2">
              {{
                book.description!.length > 25
                  ? book.description!.slice(0, 25) + '...'
                  : book.description
              }}
            </view>

            <!-- 标签 -->
            <view class="text-sm text-gray-400 mt-2">
              <text v-for="(tag, index) in book.tagList">{{ tag }}·</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 4.底部弹窗 -->
    <view class="tagView" v-if="showTags">底部弹窗</view>
  </view>
</template>

<script lang="ts" setup>
import { BookItem } from '@/types/book'

const keyword = ref('')

const handleSearch = () => {
  if (!keyword.value) return
  // 实际搜索逻辑
}

// 获取推荐书籍
const recommendBook = ref('玄幻：一起进入奇幻世界')
// 模拟数据
const bookList = ref<BookItem[]>([
  {
    id: 1,
    cover: 'https://picsum.photos/200/300?random=1',
    name: '三体：死神永生三体：死神永生',
    author: '刘慈欣',
    score: 3,
    description: '[轮回转世]+[平行宇宙]+[无固定女主]',
    tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
  },
  {
    id: 2,
    cover: 'https://picsum.photos/200/300?random=2',
    name: '流浪地球：之我从宝宝巴士开车-去学校好好学习',
    author: '刘慈欣',
    score: 5,
    description:
      '[轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主]',
    tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
  },
  {
    id: 3,
    cover: 'https://picsum.photos/200/300?random=3',
    name: '球状闪电',
    author: '刘慈欣',
    score: 5,
    description: '[轮回转世]+[平行宇宙]+[无固定女主]',
    tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
  },
  {
    id: 4,
    cover: 'https://picsum.photos/200/300?random=4',
    name: '超新星纪元',
    author: '刘慈欣',
    score: 5,
    description: '[轮回转世]+[平行宇宙]+[无固定女主]',
    tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
  },
  {
    id: 5,
    cover: 'https://picsum.photos/200/300?random=7',
    name: '乡村教师',
    author: '刘慈欣',
    score: 5,
    description: '[轮回转世]+[平行宇宙]+[无固定女主]',
    tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
  }
])

// 获取标签列表
const tagList = ref([
  '玄幻',
  '奇幻',
  '武侠',
  '仙侠',
  '都市',
  '历史',
  '军事',
  '游戏',
  '科幻',
  '灵异',
  '同人'
])
//查询条件
const queryList1 = ref([
  '不限',
  '10万字以内',
  '30万字以内',
  '50万字以内',
  '100万字以内',
  '200万字以内',
  '300万字以内'
])

const queryList2 = ref([
  '不限',
  '完结',
  '半年内完结',
  '连载中',
  '3个月内完结',
  '6个月内完结',
  '1年内完结',
  '半年内完结',
  '连载中',
  '3个月内完结',
  '6个月内完结',
  '1年内完结'
])

const queryList3 = ref(['综合', '新书', '高分', '字数'])

// 选中的查询条件
const selectedQuery1 = ref('')
const selectedQuery2 = ref('')
const selectedQuery3 = ref('')
const selectedTags = ref(['玄幻', '武侠', '都市'])

onShow(() => {
  // 初始化数据
  selectedQuery1.value = queryList1.value[0]
  selectedQuery2.value = queryList2.value[0]
  selectedQuery3.value = queryList3.value[0]

  //
})

//
const handleQuery1 = (query: string) => {
  selectedQuery1.value = query
}
const handleQuery2 = (query: string) => {
  selectedQuery2.value = query
}
const handleQuery3 = (query: string) => {
  selectedQuery3.value = query
}

// showTags
const showTags = ref(false)
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

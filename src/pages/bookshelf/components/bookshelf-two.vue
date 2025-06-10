<template>
  <view class="bookshelf-container">
    <!-- 标题栏 -->
    <view class="top-title">
      <view @click="toggleView">{{ isGrid ? '列表' : '宫格' }}</view>
      <view class="edit-button">编辑</view>
    </view>
    <!-- 功能样式 -->
    <view class="top-book-type">
      <!-- 使用常量遍历生成标签 -->
      <view
        v-for="(type, index) in bookTypeList"
        :key="index"
        @click="selectedTypeIndex = index"
        :class="{
          activeSelectedType: selectedTypeIndex === index
        }"
        class="book-type-item">
        {{ type }}
      </view>
      <!-- 添加帅选按钮navigator -->
      <navigator
        class="flex py-2 mx-3 text-sm text-gray-600"
        url="/pages/bookshelf/components/bookFilter">
        <uni-icons type="settings" size="30"></uni-icons>
        <view>筛选</view>
      </navigator>
    </view>
    <!-- 宫格模式 -->

    <scroll-view scroll-y class="flex-1" v-if="isGrid">
      <view class="book-container-grid">
        <navigator
          v-for="book in bookList"
          :key="book.id"
          class="grid-book-item"
          url="/pages/book/detail">
          <image class="grid-cover" :src="book.image" mode="aspectFill" />
          <view class="grid-info">
            <text class="grid-title">{{ book.name }}</text>
            <text class="grid-update">更新至{{ book.totalChapters }}章</text>
          </view>
        </navigator>
      </view>
    </scroll-view>

    <!-- 列表模式 -->
    <scroll-view scroll-y class="book-container-list" v-else>
      <navigator
        v-for="book in bookList"
        :key="book.id"
        class="book-item"
        url="/pages/book/detail">
        <!-- 书籍封面 -->
        <image class="book-cover" :src="book.image" mode="aspectFill" />

        <!-- 书籍信息 -->
        <view class="book-info">
          <!-- 标题行 -->
          <view class="title-row">
            <text class="book-title">{{ book.name }}</text>
            <text class="book-author">{{ book.author }}</text>
          </view>

          <!-- 更新信息 -->
          <view class="update-info">
            <text class="unread-chapters">未读 {{ book.unread }} 章</text>
            <text class="update-time">{{ book.lastUpdate }}前更新</text>
          </view>

          <!-- 最新章节 -->
          <view class="latest-chapter">
            <text>最新章节：{{ book.latestChapter }}</text>
            <text class="chapter-count">（{{ book.totalChapters }}章）</text>
          </view>
        </view>
      </navigator>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { queryBookShelfAPI } from '@/services/bookshelf'
import { BookItem } from '@/types/book'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 新增：定义分类标签常量
const bookTypeList = ref(['全部', '阅读', '听书'])
// 定义选中的标签索引
const selectedTypeIndex = ref(0)
// 书籍列表
const bookList = ref<BookItem[]>()

// 用于控制宫格和列表的切换状态
const isGrid = ref(true)
const toggleView = () => {
  isGrid.value = !isGrid.value
}

onShow(() => {
  // 页面加载时执行的逻辑
  console.log('two页面加载')
})
onMounted(() => {
  selectedTypeIndex.value = 0
  queryBookShelfData()
})

const queryBookShelfData = async () => {
  bookList.value = await queryBookShelfAPI()
}
</script>

<style lang="scss">
.bookshelf-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  // padding: 20rpx;
  .top-title {
    z-index: 40;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    position: fixed;
    background-color: #fff;
    width: 100vw;
    .edit-button {
      position: relative;
      margin-left: 20rpx;
      padding: 10rpx 20rpx;
    }
  }

  .top-book-type {
    z-index: 40;
    width: 100vw;
    margin-top: 30px;
    position: fixed;
    height: 40px;
    margin-bottom: 20px;
    background-color: #fff;
    // 内部元素水平排列，可以左右滑动
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    flex-wrap: nowrap;
    scroll-behavior: smooth;
    .book-type-item {
      background-color: #fff0e9;
      margin-right: 10px;
      width: 50px;
      height: 30px;
      white-space: nowrap;
      padding: 8rpx 14rpx;
    }
  }
}

.activeSelectedType {
  font-size: larger;
  color: burlywood;
}
.book-container-list {
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20rpx;

  .book-item {
    display: flex;
    margin-bottom: 30rpx;
    padding: 20rpx;
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

    .book-cover {
      width: 180rpx;
      height: 240rpx;
      border-radius: 8rpx;
      margin-right: 30rpx;
    }

    .book-info {
      flex: 1;

      .title-row {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        .book-title {
          font-size: 32rpx;
          font-weight: bold;
          margin-right: 20rpx;
        }

        .book-author {
          font-size: 24rpx;
          color: #666;
        }
      }

      .update-info {
        display: flex;
        align-items: center;
        margin-bottom: 15rpx;

        .unread-chapters {
          font-size: 26rpx;
          color: #e4393c;
          margin-right: 30rpx;
        }

        .update-time {
          font-size: 24rpx;
          color: #888;
        }
      }

      .latest-chapter {
        font-size: 26rpx;
        color: #333;

        .chapter-count {
          color: #666;
          margin-left: 15rpx;
        }
      }
    }
  }
}

.book-container-grid {
  margin-top: 70px;
  height: 100vh;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;

  padding: 10px;
  .grid-book-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .grid-cover {
      width: 100%;
      height: 140px;
      border-radius: 8rpx;
      margin-bottom: 15rpx;
      border: 1px solid #ccc;
    }
    .grid-info {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      .grid-title {
        font-size: 26rpx;
        color: #030303;
      }
      .grid-update {
        color: #ababab;
        font-size: 24rpx;
      }
    }
  }
}
</style>

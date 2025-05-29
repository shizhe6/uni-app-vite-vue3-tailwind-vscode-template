<template>
  <view class="viewport">
    <!-- 一级导航 -->
    <view class="primary-nav">
      <scroll-view class="nav-scroll" scroll-x enable-flex-enhanced :show-scrollbar="false">
        <view
          v-for="(item, index) in primaryList"
          :key="index"
          class="nav-item"
          :class="{ 'nav-active': activePrimary === index }"
          @tap="handlePrimaryChange(index)"
        >
          {{ item.name }}
        </view>
      </scroll-view>
    </view>

    <!-- 二级导航和内容 -->
    <view class="container">
      <!-- 二级导航 -->
      <view class="secondary-nav">
        <scroll-view scroll-y>
          <view
            v-for="(subItem, subIndex) in secondaryList"
            :key="subIndex"
            class="sub-nav-item"
            :class="{ 'sub-nav-active': activeSecondary === subIndex }"
            @tap="handleSecondaryChange(subIndex)"
          >
            {{ subItem.name }}
          </view>
        </scroll-view>
      </view>

      <!-- 内容区域 -->
      <view class="content">
        <scroll-view scroll-y>
          <view v-for="(book, bookIndex) in bookList" :key="bookIndex" class="book-item">
            <view
              class="book-sort-number"
              :class="{
                'three-sort-number': bookIndex === 0 || bookIndex === 1 || bookIndex === 2,
              }"
              >{{ book.sortNumber }}</view
            >
            <image :src="book.cover" class="book-cover" />
            <view class="book-info">
              <text class="book-title">{{ book.title }}</text>
              <view class="book-meta">
                <text class="book-type">{{ book.type }} · </text>
                <text class="book-status">{{ book.status }} · </text>
                <text class="book-hot">{{ book.hot }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'

interface PrimaryItem {
  id: number
  name: string
  subItems: SecondaryItem[]
}

interface SecondaryItem {
  id: number
  name: string
}

interface BookItem {
  id: number // 新增书籍唯一标识
  sortNumber: number // 新增排序序号
  cover: string
  title: string
  type: string
  status: string
  hot: string
}

// 完整的一级分类数据
const primaryList = reactive<PrimaryItem[]>([
  {
    id: 1,
    name: '全部',
    subItems: [
      { id: 1, name: '推荐棒' },
      { id: 2, name: '新书榜' },
      { id: 3, name: '畅销榜' },
    ],
  },
  {
    id: 2,
    name: '玄幻',
    subItems: [
      { id: 1, name: '战力榜' },
      { id: 2, name: '更新榜' },
      { id: 3, name: '完本榜' },
    ],
  },
  {
    id: 3,
    name: '言情',
    subItems: [
      { id: 1, name: '人气榜' },
      { id: 2, name: '完结榜' },
      { id: 3, name: '新书榜' },
    ],
  },
  {
    id: 4,
    name: '历史',
    subItems: [
      { id: 1, name: '古风榜' },
      { id: 2, name: '穿越榜' },
      { id: 3, name: '架空榜' },
    ],
  },
  {
    id: 5,
    name: '悬疑',
    subItems: [
      { id: 1, name: '悬疑榜' },
      { id: 2, name: '推理榜' },
      { id: 3, name: '推理榜' },
    ],
  },
  {
    id: 6,
    name: '科幻',
    subItems: [
      { id: 1, name: '科幻榜' },
      { id: 2, name: '科幻榜' },
      { id: 3, name: '科幻榜' },
    ],
  },
  {
    id: 7,
    name: '都市',
    subItems: [
      { id: 1, name: '都市榜' },
      { id: 2, name: '都市榜' },
      { id: 3, name: '都市榜' },
    ],
  },
  {
    id: 8,
    name: '职场',
    subItems: [
      { id: 1, name: '职场榜' },
      { id: 2, name: '职场榜' },
      { id: 3, name: '职场榜' },
    ],
  },
  {
    id: 9,
    name: '玄幻',
    subItems: [
      { id: 1, name: '玄幻榜' },
      { id: 2, name: '玄幻榜' },
      { id: 3, name: '玄幻榜' },
    ],
  },
])

// 当前选中状态
const activePrimary = ref<number>(1)
const activeSecondary = ref<number>(0)
const secondaryList = reactive<SecondaryItem[]>([])
const bookList = reactive<BookItem[]>([])
onShow(async () => {
  // 默认加载数据
  handlePrimaryChange(0)
})

// 查询一级分类方法
const handlePrimaryChange = async (index: number) => {
  const currentPrimary = primaryList[index] // 直接获取当前分类对象
  activePrimary.value = index // 直接使用数组索引

  // 获取当前分类的直接子项
  secondaryList.splice(0, secondaryList.length, ...currentPrimary.subItems)

  // 重置二级导航选中状态
  activeSecondary.value = 0
  await handleSecondaryChange(0)
}

// 获取二级分类数据
const handleSecondaryChange = async (index: number) => {
  activeSecondary.value = index
  // 获取书籍数据
  const books = await fetchBooks(activePrimary.value, activeSecondary.value)
  bookList.splice(0, bookList.length, ...books)
}

// 查询二级分类方法
const fetchSecondary = (primaryId: number) => {
  return new Promise<SecondaryItem[]>((resolve) => {
    setTimeout(() => {
      const target = primaryList.find((p) => p.id === primaryId)
      resolve(target?.subItems || [])
    }, 300)
  })
}

// 查询书籍方法
const fetchBooks = (primaryId: number, secondaryId: number) => {
  return new Promise<BookItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_, i) => ({
          id: primaryId * 1000 + secondaryId * 100 + i, // 生成唯一ID
          sortNumber: i + 1, // 排序号从1开始
          cover: `https://picsum.photos/200/300?n=${i + primaryId * 100 + secondaryId}`,
          title: `${
            // 根据一级分类显示不同书名系列
            [
              ['玄幻经典', '武侠风云', '仙侠奇缘'],
              ['现代言情', '都市甜宠', '职场婚姻'],
              ['历史演义', '王朝争霸', '架空穿越'],
            ][primaryId % 3][i % 3]
          }`,
          type: [
            '玄幻',
            '言情',
            '历史', // 根据一级分类显示类型
          ][primaryId % 3],
          status: [
            ['连载', '完本'], // 二级分类0-1对应不同状态比例
            ['热更', '完结'],
            ['更新', '全本'],
          ][secondaryId % 3][i % 2],
          hot: `${Math.floor(Math.random() * (10000 + secondaryId * 500))}万热度`,
        })),
      )
    }, 500)
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .primary-nav {
    height: 80px; // 固定导航栏高度
    line-height: 100px; // 垂直居中文字
    white-space: nowrap; // 禁止文字换行
    background: #fafafa; // 背景色
    overflow: hidden; // 隐藏纵向滚动条;

    .nav-item {
      display: inline-flex; // 行内弹性布局
      align-items: center; // 垂直居中
      height: 100%; // 继承父级高度
      padding: 0 24rpx; // 左右内边距
      font-size: 26rpx; // 字体大小
      color: #666; // 默认文字颜色
      position: relative; // 相对定位
      flex-shrink: 0; // 禁止弹性收缩

      &.nav-active {
        color: #000000; // 选中状态文字颜色
        font-weight: 500; // 选中状态字重
      }
    }
  }

  .container {
    flex: 1; // 填充剩余空间
    display: flex; // 弹性布局
    overflow: hidden; // 隐藏溢出内容

    .secondary-nav {
      width: 130rpx; // 固定侧边栏宽度
      background: #fafafa; // 背景色

      .sub-nav-item {
        height: 96rpx; // 固定项高度
        display: flex; // 弹性布局
        align-items: center; // 垂直居中
        justify-content: center; // 水平居中
        font-size: 26rpx; // 字体大小
        color: #595c63; // 默认文字颜色
        position: relative; // 相对定位

        &.sub-nav-active {
          color: #000; // 选中文字颜色
          font-weight: bold; // 选中字重
        }
      }
    }

    .content {
      flex: 1; // 填充剩余空间
      padding: 20rpx; // 内边距
      background: #fff; // 背景色

      .book-item {
        display: flex; // 弹性布局
        padding: 20rpx; // 内边距
        margin-bottom: 20rpx; // 下外边距
        border-radius: 16rpx; // 圆角
        background: #f8f8f8; // 背景色
        .book-sort-number {
          display: block; // 块级显示
          font-size: 50rpx; // 字体大小
          font-weight: 500; // 字重
          color: #999999;
          margin-right: 10px;
          display: flex;
          align-items: center;
        }

        // 新增前三名特殊样式
        .three-sort-number {
          color: #d6a364;
          font-weight: 600;
        }

        .book-cover {
          width: 160rpx; // 固定宽度
          height: 220rpx; // 固定高度
          border-radius: 8rpx; // 圆角
        }

        .book-info {
          flex: 1; // 填充剩余空间
          margin-left: 20rpx; // 左外边距
          display: flex; // 弹性布局
          flex-direction: column; // 垂直布局
          justify-content: center; // 垂直
          align-items: flex-start; //  水平

          .book-title {
            display: block; // 块级显示
            font-size: 30rpx; // 字体大小
            font-weight: 500; // 字重
            margin-bottom: 10rpx; // 下外边距
          }

          .book-meta {
            color: #999999;
          }
        }
      }
    }
  }
}
</style>

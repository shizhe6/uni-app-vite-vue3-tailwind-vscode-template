<template>
  <view class="bookshelf-container">
    <view class="top-title">
      <view @click="toggleView">{{ isGrid ? '列表' : '宫格' }}</view>
      <view class="edit-button">编辑</view>
    </view>
    <view class="top-book-type">
      <view class="book-type-item">全部</view>
      <view class="book-type-item">阅读</view>
      <view class="book-type-item">出版</view>
    </view>
    <!-- 宫格模式 -->
    <view class="book-container-grid" v-if="isGrid">
      <view v-for="book in bookList" :key="book.id" class="grid-book-item">
        <image class="grid-cover" :src="book.cover" mode="aspectFill" />
        <view class="grid-info">
          <text class="grid-title">{{ book.title }}</text>
          <text class="grid-update">更新至{{ book.totalChapters }}章</text>
        </view>
      </view>
    </view>

    <!-- 列表模式 -->
    <view class="book-container-list" v-else>
      <view v-for="book in bookList" :key="book.id" class="book-item">
        <!-- 书籍封面 -->
        <image class="book-cover" :src="book.cover" mode="aspectFill" />

        <!-- 书籍信息 -->
        <view class="book-info">
          <!-- 标题行 -->
          <view class="title-row">
            <text class="book-title">{{ book.title }}</text>
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
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

interface BookItem {
  id: number
  cover: string
  title: string
  author: string
  unread: number
  lastUpdate: string
  latestChapter: string
  totalChapters: number
}

// 模拟数据
const bookList = ref<BookItem[]>([
  {
    id: 1,
    cover: 'https://picsum.photos/200/300?random=1',
    title: '三体：死神永生三体：死神永生',
    author: '刘慈欣',
    unread: 3,
    lastUpdate: '2天3小时',
    latestChapter: '第201章 二向箔降临',
    totalChapters: 256,
  },
  {
    id: 2,
    cover: 'https://picsum.photos/200/300?random=2',
    title: '流浪地球',
    author: '刘慈欣',
    unread: 5,
    lastUpdate: '3天2小时',
    latestChapter: '第105章 地球启航',
    totalChapters: 150,
  },
  {
    id: 3,
    cover: 'https://picsum.photos/200/300?random=3',
    title: '球状闪电',
    author: '刘慈欣',
    unread: 2,
    lastUpdate: '1天5小时',
    latestChapter: '第87章 宏原子核',
    totalChapters: 120,
  },
  {
    id: 4,
    cover: 'https://picsum.photos/200/300?random=4',
    title: '超新星纪元',
    author: '刘慈欣',
    unread: 4,
    lastUpdate: '4天1小时',
    latestChapter: '第130章 新纪元开始',
    totalChapters: 180,
  },
  {
    id: 5,
    cover: 'https://picsum.photos/200/300?random=7',
    title: '乡村教师',
    author: '刘慈欣',
    unread: 1,
    lastUpdate: '5小时前',
    latestChapter: '第35章 知识的传承',
    totalChapters: 50,
  },
  {
    id: 6,
    cover: 'https://picsum.photos/200/300?random=5',
    title: '赡养人类',
    author: '刘慈欣',
    unread: 6,
    lastUpdate: '5天3小时',
    latestChapter: '第98章 文明的碰撞',
    totalChapters: 140,
  },
  {
    id: 7,
    cover: 'https://picsum.photos/200/300?random=6',
    title: '诗云',
    author: '刘慈欣',
    unread: 3,
    lastUpdate: '2天4小时',
    latestChapter: '第76章 用诗征服宇宙',
    totalChapters: 110,
  },
  {
    id: 8,
    cover: 'https://picsum.photos/200/300?random=7',
    title: '朝闻道',
    author: '刘慈欣',
    unread: 2,
    lastUpdate: '1天6小时',
    latestChapter: '第62章 真理祭坛',
    totalChapters: 90,
  },
  {
    id: 9,
    cover: 'https://picsum.photos/200/300?random=7',
    title: '全频带阻塞干扰',
    author: '刘慈欣',
    unread: 5,
    lastUpdate: '3天5小时',
    latestChapter: '第115章 电磁干扰战',
    totalChapters: 160,
  },
  {
    id: 10,
    cover: 'https://picsum.photos/200/300?random=8',
    title: '镜子',
    author: '刘慈欣',
    unread: 4,
    lastUpdate: '4天2小时',
    latestChapter: '第103章 宇宙的真相',
    totalChapters: 145,
  },
  {
    id: 11,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '思想者',
    author: '刘慈欣',
    unread: 1,
    lastUpdate: '6小时前',
    latestChapter: '第28章 大脑的奥秘',
    totalChapters: 40,
  },
  {
    id: 12,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '吞食者',
    author: '刘慈欣',
    unread: 6,
    lastUpdate: '6天1小时',
    latestChapter: '第121章 地球保卫战',
    totalChapters: 170,
  },
  {
    id: 13,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '微纪元',
    author: '刘慈欣',
    unread: 3,
    lastUpdate: '2天7小时',
    latestChapter: '第82章 微观世界的繁荣',
    totalChapters: 115,
  },
  {
    id: 14,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '天使时代',
    author: '刘慈欣',
    unread: 2,
    lastUpdate: '1天8小时',
    latestChapter: '第57章 基因改造的人类',
    totalChapters: 80,
  },
  {
    id: 15,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '命运',
    author: '刘慈欣',
    unread: 5,
    lastUpdate: '3天6小时',
    latestChapter: '第109章 时间的漩涡',
    totalChapters: 155,
  },
  {
    id: 16,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '中国2185',
    author: '刘慈欣',
    unread: 4,
    lastUpdate: '4天3小时',
    latestChapter: '第137章 未来的中国',
    totalChapters: 190,
  },
  {
    id: 17,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '圆圆的肥皂泡',
    author: '刘慈欣',
    unread: 1,
    lastUpdate: '7小时前',
    latestChapter: '第43章 泡泡的奇迹',
    totalChapters: 60,
  },
  {
    id: 18,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '信使',
    author: '刘慈欣',
    unread: 6,
    lastUpdate: '7天2小时',
    latestChapter: '第112章 信息的传递',
    totalChapters: 165,
  },
  {
    id: 19,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '梦之海',
    author: '刘慈欣',
    unread: 3,
    lastUpdate: '2天9小时',
    latestChapter: '第94章 海洋的梦幻',
    totalChapters: 130,
  },
  {
    id: 20,
    cover: 'https://picsum.photos/200/300?random=9',
    title: '纤维',
    author: '刘慈欣',
    unread: 2,
    lastUpdate: '1天10小时',
    latestChapter: '第71章 微观纤维世界',
    totalChapters: 100,
  },
])

// 用于控制宫格和列表的切换状态
const isGrid = ref(true)
const toggleView = () => {
  isGrid.value = !isGrid.value
}

onShow(() => {
  // 页面加载时执行的逻辑
  console.log('one页面加载')
})
</script>

<style lang="scss">
.bookshelf-container {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  .top-title {
    height: 30px;
    // background-color: antiquewhite;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    .edit-button {
      position: relative;
      margin-left: 20rpx;
      padding: 10rpx 20rpx;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 60%;
        background: #b4b4b4;
      }
    }
  }

  .top-book-type {
    // background-color: rgb(128, 219, 110);
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
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

.book-container-list {
  width: 100vw;
  flex: 1;
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
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100vw;
  .grid-book-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .grid-cover {
      width: 180rpx;
      height: 240rpx;
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

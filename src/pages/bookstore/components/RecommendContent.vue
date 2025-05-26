<template>
  <view class="container">
    <!-- 榜单导航 -->
    <view class="rank-nav">
      <view
        class="nav-item"
        v-for="(rank, index) in rankList"
        :key="index"
        :class="{ active: activeRank === index }"
        @click="switchRank(index)"
      >
        {{ rank.title }}
      </view>
      <view class="nav-item" @click="handleViewFullList" style="margin-right: 0"> 完整榜单> </view>

      <!-- 当前榜单内容 -->
      <swiper class="rank-swiper" circular :autoplay="false">
        <swiper-item v-for="(page, pIndex) in pagedBooks" :key="pIndex">
          <view class="book-grid">
            <view v-for="(book, bIndex) in page" :key="bIndex" class="book-item">
              <image class="book-cover" :src="book.cover" mode="aspectFill" />
              <view class="book-number">
                <text>{{ book.rank }}</text>
              </view>

              <view class="book-info">
                <view class="book-name">
                  <text>{{ book.name }}</text>
                </view>
                <view class="book-info-details">
                  <text class="book-genre">{{ book.genre }}</text>
                  <text class="book-popularity">🔥 {{ book.popularity }}万</text>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 推荐书籍模块保持不变 -->
    <view class="recommend-section">
      <view class="section-header">
        <text class="title">猜你喜欢</text>
      </view>
      <view class="recommend-grid">
        <view v-for="(item, idx) in recommendList" :key="idx" class="recommend-grid-item">
          <navigator class="recommend-item" url="/pages/book/book">
            <image class="recommend-cover" :src="item.cover" mode="aspectFill" />
            <text class="recommend-book-name">
              {{ item.name }}
            </text>
            <text class="recommend-book-description">
              {{ item.description ? item.description.slice(0, 20) + '...' : '' }}
            </text>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// 引入 onShow 钩子函数
const activeRank = ref(0)

const rankList = ref([
  {
    title: '畅销榜',
    books: Array(16)
      .fill({})
      .map((_, i) => ({
        rank: i + 1,
        cover: `https://picsum.photos/200/300?random=${i + 1}`,
        name: `畅销书籍 ${i + 1}`,
        genre: ['都市', '言情', '科幻'][i % 3],
        popularity: (300 + i * 10).toFixed(1),
      })),
  },
  {
    title: '新书榜',
    books: Array(16)
      .fill({})
      .map((_, i) => ({
        rank: i + 1,
        cover: `https://picsum.photos/200/300?n=${i + 100}`,
        name: `新书推荐 ${i + 1}`,
        genre: ['悬疑', '历史', '奇幻'][i % 3],
        popularity: (200 + i * 15).toFixed(1),
      })),
  },
  {
    title: '人气榜',
    books: Array(16)
      .fill({})
      .map((_, i) => ({
        rank: i + 1,
        cover: `https://picsum.photos/200/300?p=${i + 200}`,
        name: `人气作品 ${i + 1}`,
        genre: ['武侠', '职场', '玄幻'][i % 3],
        popularity: (400 + i * 20).toFixed(1),
      })),
  },
])
// 数据加载方法
const loadData = async () => {
  console.log('推荐页面加载数据')
}

// 触发加载：页面显示或组件挂载时
onMounted(() => loadData())

const switchRank = (index: number) => {
  activeRank.value = index
}

const handleViewFullList = () => {
  uni.navigateTo({
    url: '/pages/bookstore/rank',
  })
}

const currentBooks = computed(() => {
  return rankList.value[activeRank.value]?.books || []
})

interface Book {
  rank: number
  cover: string
  name: string
  genre: string
  popularity: string
}

interface RankList {
  title: string
  books: Book[]
}

const pagedBooks = computed<Book[][]>(() => {
  const pageSize = 4

  return currentBooks.value.reduce<Book[][]>((resultArray, item: Book, index) => {
    const chunkIndex = Math.floor(index / pageSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
})

// recommendList 添加数据
const recommendList = ref([
  {
    cover: 'https://picsum.photos/200/300?random=1',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=2',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=3',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=4',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=5',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=6',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=7',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=8',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=9',
    name: '放下个人素质，享无敌人生',
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来',
  },
  {
    cover: 'https://picsum.photos/200/300?random=10',
    name: '放下个人素质，享无敌人生',
  },
  {
    cover: 'https://picsum.photos/200/300?random=11',
    name: '放下个人素质，享无敌人生',
  },
  {
    cover: 'https://picsum.photos/200/300?random=12',
    name: '放下个人素质，享无敌人生',
  },
])
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f6f6f6;

  .rank-nav {
    white-space: nowrap;
    padding: 20rpx;
    background: #fff;
    border-radius: 10px;

    .nav-item {
      display: inline-block;
      padding: 16rpx 0rpx;
      margin-right: 30rpx;
      border-radius: 40rpx;
      color: #666;
      font-size: 28rpx;

      &.active {
        color: rgb(25, 25, 25);
      }
    }

    .rank-swiper {
      height: 55vh;

      .book-grid {
        display: flex;
        flex-direction: column;
        padding: 20rpx;

        .book-item {
          height: 200rpx;
          display: flex;
          align-items: center;
          padding: 20rpx;

          .book-cover {
            height: 150rpx;
            width: 20%;
            border-radius: 8rpx;
          }

          .book-number {
            margin: 0 20px;
            height: 80px;
            font-weight: 500;
          }

          .book-info {
            flex: 1;

            .book-name {
              display: flex;
              justify-content: flex-start;
            }

            .book-info-details {
              display: flex;
              .book-genre {
                color: #fbd78f;
              }
            }
          }
        }
      }
    }
  }

  .recommend-section {
    .section-header {
      padding: 30rpx 20rpx;

      .title {
        font-size: 34rpx;
        font-weight: bold;
      }
    }

    .recommend-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;

      .recommend-item {
        height: 300px;
        background: #fff;
        border-radius: 16rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

        .recommend-cover {
          width: 100%;
          height: 200px;
          border-radius: 10px 10px 0 0;
        }
        .recommend-book-name {
          font-weight: 800;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding: 5px;
          padding: 5px 10px;
        }

        .recommend-book-description {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding: 5px;
        }
      }
    }
  }
}
</style>

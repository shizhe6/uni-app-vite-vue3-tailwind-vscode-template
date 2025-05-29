<template>
  <view class="search-container">
    <!-- 搜索框 -->
    <view class="top-bar">
      <view class="top-bar-back" @click="handleBack">
        <uni-icons type="left" size="24" color="#333" />
      </view>
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="keyword"
        @confirm="handleSearch"
      ></uni-easyinput>
      <text class="top-bar-text">搜索</text>
    </view>

    <!-- 滚动内容 -->
    <scroll-view class="middle-content" scroll-y>
      <!-- 搜索历史 -->
      <view class="search-history">
        <view class="search-history-header">
          <text class="title">搜索历史</text>
          <uni-icons type="trash" size="18" @click="clearHistory" />
        </view>
        <view class="search-history-tag-list">
          <uni-tag
            v-for="(item, index) in searchHistory"
            :key="index"
            :text="item"
            :inverted="true"
            @click="searchFromHistory(item)"
          />
        </view>
      </view>

      <!-- 热搜榜单 -->
      <view class="hot-search">
        <scroll-view scroll-x class="hot-search-scroll">
          <view class="hot-list-container">
            <view v-for="(list, index) in hotSearchLists" :key="index" class="hot-item-list">
              <!-- 推荐榜单名称 -->
              <view class="list-header">
                <text class="title">{{ list.title }}</text>
                <uni-icons type="right" size="14" color="#999" />
              </view>
              <!-- 推荐榜单内容 -->
              <view class="list-content">
                <view
                  v-for="(item, idx) in list.items"
                  :key="idx"
                  class="book-item"
                  @click="handleHotSearch(item)"
                >
                  <text class="book-index" :class="{ top3: idx < 3 }">{{ idx + 1 }}</text>
                  <view class="book-content">
                    <text class="book-name">{{ item.name }}</text>
                    <text class="book-heat">{{ item.heat }}</text>
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
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const keyword = ref('')
const searchHistory = ref([
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
])
const hotSearchLists = ref([
  {
    title: '番茄热搜榜',
    items: [
      { order: 1, name: '重生之逆袭人生', heat: '256万' },
      { order: 2, name: '霸道总裁爱上我', heat: '198万' },
      { order: 3, name: '神医弃妃要逆天', heat: '187万' },
      { order: 4, name: '末世重生之涅槃', heat: '175万' },
      { order: 5, name: '王爷的替嫁医妃', heat: '168万' },
      { order: 6, name: '团宠小公主驾到', heat: '155万' },
      { order: 7, name: '影帝的隐婚娇妻', heat: '142万' },
      { order: 8, name: '穿书后我成团宠', heat: '135万' },
      { order: 9, name: '学霸的科技帝国', heat: '128万' },
      { order: 10, name: '风水相师在都市', heat: '118万' },
    ],
  },
  {
    title: '热搜短剧榜',
    items: [
      { order: 1, name: '王妃今天又跑了', heat: '189万' },
      { order: 2, name: '校花的贴身高手', heat: '176万' },
      { order: 3, name: '总裁的替身前妻', heat: '165万' },
      { order: 4, name: '萌宝来袭爹地快跑', heat: '158万' },
      { order: 5, name: '神医毒妃狠嚣张', heat: '149万' },
      { order: 6, name: '摄政王的心尖宠', heat: '137万' },
      { order: 7, name: '将军夫人要翻身', heat: '129万' },
      { order: 8, name: '腹黑世子俏医妃', heat: '122万' },
      { order: 9, name: '冷王盛宠医妃狂', heat: '115万' },
      { order: 10, name: '穿书后我成了反派', heat: '108万' },
    ],
  },
  {
    title: '热搜漫画榜',
    items: [
      { order: 1, name: '斗破苍穹', heat: '342万' },
      { order: 2, name: '一人之下', heat: '289万' },
      { order: 3, name: '全职高手', heat: '275万' },
      { order: 4, name: '狐妖小红娘', heat: '262万' },
      { order: 5, name: '镇魂街', heat: '248万' },
      { order: 6, name: '偷星九月天', heat: '235万' },
      { order: 7, name: '斗罗大陆', heat: '221万' },
      { order: 8, name: '火凤燎原', heat: '208万' },
      { order: 9, name: '天行九歌', heat: '195万' },
      { order: 10, name: '秦时明月', heat: '182万' },
    ],
  },
])

const handleSearch = () => {
  if (!keyword.value) return
  // 实际搜索逻辑
}

const clearHistory = () => {
  searchHistory.value = []
}

const searchFromHistory = (text: string) => {
  keyword.value = text
  handleSearch()
}

const handleHotSearch = (item: any) => {
  // 处理热搜点击
}

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

//设置标题为空
onShow(() => {})

// 添加返回方法
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
.search-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // 头部搜索框
  .top-bar {
    height: 90px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: fixed;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    .top-bar-back {
    }
    .top-bar-text {
    }
  }

  // 内容区域
  .middle-content {
    flex: 1;
    flex-direction: column;
    padding: 20px;
    padding-top: calc(100px + env(safe-area-inset-top));
    height: calc(100vh - 100px - env(safe-area-inset-top));
    .search-history {
      height: auto;
      margin-bottom: 40px;
      .search-history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .title {
          font-size: 28rpx;
          font-weight: bold;
        }
      }
      .search-history-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
      }
    }
    .hot-search {
      flex: 1;
      overflow-y: auto;
      .hot-search-scroll {
        width: 100%;
        white-space: nowrap;

        .hot-list-container {
          display: inline-flex;
          gap: 30rpx;
          padding: 0 20rpx;

          .hot-item-list {
            width: 320rpx;
            background: #fff8f6;
            border-radius: 16rpx;
            padding: 20rpx;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

            .list-header {
              display: flex;
              align-items: center;
              margin-bottom: 20rpx;

              .title {
                font-size: 26rpx;
                font-weight: bold;
                padding-left: 10rpx;
                border-left: 6rpx solid #d6a364;
                margin-right: 10rpx;
              }
            }

            .list-content {
              display: flex;
              flex-direction: column;
              gap: 20rpx;

              .book-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 10rpx 0;

                .book-index {
                  width: 40rpx;
                  margin-right: 15rpx;
                  color: #999;
                  font-size: 28rpx;

                  &.top3 {
                    color: #d6a364;
                    font-weight: bold;
                  }
                }

                .book-content {
                  display: flex;
                  flex-direction: column;
                  .book-name {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 28rpx;
                  }

                  .book-heat {
                    color: #999;
                    font-size: 24rpx;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

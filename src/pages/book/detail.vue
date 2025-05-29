<template>
  <scroll-view class=" h-screen pb-3 bg-gray-50" scroll-y>
    <!-- 第一部分：书籍基础信息 -->
    <view class="book-base">
      <image class="cover" :src="bookInfo.cover" mode="widthFix"></image>
      <view class="base-info">
        <text class="name">{{ bookInfo.name }}</text>
        <view class="tags">
          <text class="tag">{{ bookInfo.type }}</text>
          <text class="tag">{{ bookInfo.status }}</text>
          <text class="tag">字数：{{ bookInfo.wordCount }}</text>
        </view>
      </view>
    </view>

    <!-- 第二部分：作者信息 -->
    <view class="flex flex-col items-start justify-center m-[10px]">
      <!-- 作者信息 -->
      <view class="flex flex-row items-center justify-around w-full">
        <image
          class="w-10 h-10 rounded-full"
          :src="authorInfo.avatar"
          mode="aspectFill"></image>
        <view class="flex-1 flex flex-col pl-3">
          <text class="text-black">{{ authorInfo.name }}</text>
          <text class="text-slate-400 text-sm">关注我，掌握最新动态</text>
        </view>
        <button class="text-sm text-red-500 px-2 py-2 rounded-lg">
          + 关注
        </button>
      </view>
      <!-- 评分和阅读数 -->
      <view class="flex flex-row items-center justify-between w-full">
        <view class="flex flex-col">
          <text class="text-lg text-black">{{ authorInfo.rating }}★★★★★</text>
          <text class="text-sm text-slate-400">本书评分</text>
        </view>
        <view class="flex flex-col">
          <text class="text-lg text-black">{{ authorInfo.readCount }}万人</text>
          <text class="text-sm text-slate-400">正在阅读</text>
        </view>
      </view>
    </view>

    <!-- 第三部分：书籍简介 -->
    <view class="mt-[20px] flex flex-col m-2">
      <view class="text-lg text-black">书籍简介</view>
      <!-- 简介内容容器 -->
      <view
        class="text-sm text-slate-400 overflow-hidden"
        :class="{ 'line-clamp-3': !isExpanded }">
        {{ bookInfo.intro }}
      </view>
      <!-- 展开/收起按钮 -->
      <button
        class="text-sm text-gray-500 mt-2"
        @click="isExpanded = !isExpanded">
        {{ isExpanded ? '收起' : '展开' }}
      </button>
      <view class="text-sm flex flex-row">
        <text
          v-for="tag in bookInfo.tags"
          :key="tag"
          class="text-xs text-slate-400 pr-2 bg-gray-300 p-1 rounded-lg mr-2">
          {{ tag }}
        </text>
      </view>
    </view>
  </scroll-view>

  <!-- 第四部分：操作按钮（固定底部） -->
  <view class="action-btns">
    <uni-icons type="headphones" size="28"></uni-icons>
    <uni-icons type="download" size="28"></uni-icons>
    <navigator class="action-btn primary" url="/pages/book/chapter">
      免费阅读
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 添加控制展开状态的响应式变量
const isExpanded = ref(false) // 初始状态为折叠

// 假数据
const bookInfo = ref({
  name: '《星辰大海》',
  cover: 'https://picsum.photos/200/300?random=1',
  type: '科幻/冒险',
  status: '连载中',
  wordCount: '120万',
  intro:
    '夜幕低垂，星辰在天际闪烁，一艘神秘的飞船划破寂静的夜空，驶向未知的星际深处，展开冒险之旅。在这漫长的旅途中，船员们不仅要面对宇宙中各种奇异的天体和恶劣的环境，还要与潜藏在黑暗中的神秘势力斗智斗勇，他们能否揭开星际的秘密，平安归来，一切都充满了未知。',
  tags: ['星际探险', '成长故事', '硬科幻']
})

const authorInfo = ref({
  name: '流浪诗人',
  avatar: 'https://picsum.photos/200/300?random=2',
  rating: '9.8',
  readCount: '890'
})
</script>

<style lang="scss">

/* 第一部分样式 */
.book-base {
  display: flex;
  margin: 10px;

  .cover {
    width: 240rpx;
    height: 320rpx;
    border-radius: 12rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  }

  .base-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 34rpx;
      font-weight: 600;
      color: #222;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12rpx;
    }

    .tag {
      font-size: 28rpx;
      color: #666;
      padding: 4rpx 12rpx;
      background-color: #f0f0f0;
      border-radius: 16rpx;
    }
  }
}

/* 第三部分样式 */
.intro-section {
  margin-bottom: 50rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #222;
    margin-bottom: 20rpx;
  }

  .intro-content {
    font-size: 28rpx;
    color: #444;
    line-height: 1.6;
    margin-bottom: 24rpx;
  }

  .tag-list {
    display: flex;
    gap: 16rpx;
    flex-wrap: wrap;

    .tag-item {
      font-size: 28rpx;
      color: #2d8cf0;
      padding: 4rpx 16rpx;
      border: 1rpx solid #2d8cf0;
      border-radius: 20rpx;
    }
  }
}

/* 第四部分样式（固定底部） */
.action-btns {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);


  .action-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    height: 40px;
    color: #ffffff;
    background-color: #f7ad4c;
  }
}



.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>

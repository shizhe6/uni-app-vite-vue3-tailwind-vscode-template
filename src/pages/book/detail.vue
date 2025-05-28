<template>
  <scroll-view class="content" scroll-y>
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
      <view class="flex flex-row items-center justify-around">
        <image
          class="w-10 h-10 rounded-full"
          :src="authorInfo.avatar"
          mode="aspectFill"></image>
        <view class="flex-1 flex flex-col pl-3">
          <text class=" text-black">{{ authorInfo.name }}</text>
          <text class=" text-slate-400 text-sm">关注我，掌握最新动态</text>
        </view>
        <button class="text-sm text-red-500 px-2 py-2 rounded-lg">+ 关注</button>
      </view>
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
    <view class="intro-section">
      <text class="section-title">书籍简介</text>
      <text class="intro-content">{{ bookInfo.intro }}</text>
      <view class="tag-list">
        <text v-for="tag in bookInfo.tags" :key="tag" class="tag-item">
          {{ tag }}
        </text>
      </view>
    </view>
  </scroll-view>

  <!-- 第四部分：操作按钮（固定底部） -->
  <view class="action-btns">
    <button class="action-btn">
      <uni-icons type="headphones" size="28"></uni-icons>
    </button>
    <button class="action-btn">
      <uni-icons type="download" size="28"></uni-icons>
    </button>
    <navigator class="action-btn primary" url="/pages/book/chapter">
      免费阅读
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 假数据
const bookInfo = ref({
  name: '《星辰大海》',
  cover: 'https://picsum.photos/200/300?random=1',
  type: '科幻/冒险',
  status: '连载中',
  wordCount: '120万',
  intro: '夜幕低垂，星辰在天际闪烁...（此处为简介正文）',
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
  gap: 20rpx;
  padding: 20rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);

  .primary {
    background-color: #f7ad4c;
  }

  .action-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24rpx 0;
    border-radius: 16rpx;
    background-color: #fff;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    height: 40px;
  }
}

/* 调整滚动区域底部边距，避免内容被按钮遮挡 */
.content {
  padding-bottom: 180rpx;
  /* 根据按钮高度调整 */
  height: 100vh;
  background-color: #f8f8f8;
  border: 1px solid rgb(34, 238, 51);
}
</style>

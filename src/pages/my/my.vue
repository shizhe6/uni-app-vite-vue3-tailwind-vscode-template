<template>
  <qiun-loading v-if="isLoading" loadingType="2" />
  <view
    v-else
    class="viewport"
    :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <!-- 添加背景图片 -->
    <view class="user">
      <view class="user-left">
        <navigator url="/pagesMember/profile/profile" class="avatar-container">
          <image
            class="avatar"
            src="https://picsum.photos/200/300?random=1"
            mode="aspectFill"></image>
        </navigator>
      </view>
      <view class="user-middle">
        <view class="user-name">大帅比</view>
        <view class="user-detail">
          <!-- 关注，粉丝，获赞，拯救书荒 -->
          <view class="user-info">
            <view class="user-info-item">
              <view class="user-info-label">关注</view>
              <view class="user-info-value">0</view>
            </view>
            <view class="user-info-item">
              <view class="user-info-label">粉丝</view>
              <view class="user-info-value">0</view>
            </view>
            <view class="user-info-item">
              <view class="user-info-label">获赞</view>
              <view class="user-info-value">0</view>
            </view>
            <view class="user-info-item">
              <view class="user-info-label">拯救书荒</view>
              <view class="user-info-value">0</view>
            </view>
          </view>
        </view>
      </view>
      <view class="user-right">
        <uni-icons type="right" size="30"></uni-icons>
      </view>
    </view>

    <!-- 工具栏目 -->
    <view class="tool-bar">
      <!-- 浏览历史，阅读偏好，赞过的视频，反馈与在赞助，我的预约 -->
      <view class="tool-bar-item">
        <uni-icons type="fire" size="30"></uni-icons>
        <text>浏览历史</text>
      </view>
      <view class="tool-bar-item">
        <uni-icons type="map" size="30"></uni-icons>
        <text>阅读偏好</text>
      </view>
      <view class="tool-bar-item">
        <uni-icons type="videocam" size="30"></uni-icons>
        <text>赞过的视频</text>
      </view>
      <view class="tool-bar-item">
        <uni-icons type="info" size="30"></uni-icons>
        <text>反馈与赞助</text>
      </view>
      <view class="tool-bar-item">
        <uni-icons type="mail-open" size="30"></uni-icons>
        <text>我的预约</text>
      </view>
      <view class="tool-bar-item">
        <uni-icons type="gear" size="30"></uni-icons>
        <text>设置</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
const isLoading = ref(false)
onShow(async () => {})
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss">
.viewport {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;

  /* 用户信息区域 */
  .user {
    height: 300rpx;
    margin: 30rpx 24rpx;
    padding: 30rpx;
    border-radius: 20rpx;
    background: linear-gradient(135deg, #f6ece0 0%, #f8f1eb 50%, #f7f5e6 100%);
    box-shadow: 0 4rpx 16rpx rgba(246, 236, 224, 0.4);
    display: flex;
    align-items: center;

    .user-left {
      flex: 0 0 150rpx;
      .avatar-container {
        .avatar {
          width: 150rpx;
          height: 150rpx;
          border-radius: 16rpx;
          border: 4rpx solid #fff;
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
        }
      }
    }

    .user-middle {
      flex: 1;
      margin: 0 30rpx;

      .user-name {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 16rpx;
      }

      .user-info {
        display: flex;
        gap: 24rpx;

        .user-info-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .user-info-label {
            font-size: 24rpx;
            color: #666;
            margin-bottom: 4rpx;
          }

          .user-info-value {
            font-size: 30rpx;
            font-weight: 500;
            color: #222;
          }
        }
      }
    }

    .user-right {
      flex: 0 0 40rpx;
      color: #999;
      font-size: 32rpx;
    }
  }

  /* 工具栏目 */
  .tool-bar {
    margin: 24rpx;
    background: #f9f9f9;
    border-radius: 16rpx;
    box-shadow: 0 1rpx 8rpx rgba(0, 0, 0, 0.03);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    .tool-bar-item {
      height: 96rpx;
      padding: 0 36rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 30rpx;
      color: #222;
      white-space: nowrap;
    }
  }
}
</style>

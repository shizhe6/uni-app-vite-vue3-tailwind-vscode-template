<template>
  <SzLoading v-if="isLoading"></SzLoading>
  <scroll-view
    v-else
    scroll-y
    @scrolltolower="onScrollToLower"
    class="h-screen viewport"
    :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <!-- 添加背景图片 -->
    <view
      class="h-[300rpx] m-[30rpx_24rpx] p-[30rpx] rounded-[20rpx] flex items-center bg-white">
      <view class="flex-none w-[150rpx]">
        <navigator url="/pagesMember/profile/profile" class="block">
          <image
            class="w-[150rpx] h-[150rpx] rounded-[16rpx] border-[4rpx] border-white shadow-[0_2rpx_8rpx_rgba(0,0,0,0.1)]"
            src="https://picsum.photos/200/300?random=1"
            mode="aspectFill"></image>
        </navigator>
      </view>
      <view class="flex-grow mx-[30rpx]">
        <view class="text-[36rpx] font-semibold text-[#333] mb-[16rpx]">
          大帅比
        </view>
        <view class="flex gap-[24rpx]">
          <!-- 关注，粉丝，获赞，拯救书荒 -->
          <view class="flex flex-col items-center">
            <view class="text-[24rpx] text-[#666] mb-[4rpx]">关注</view>
            <view class="text-[30rpx] font-medium text-[#222]">0</view>
          </view>
          <view class="flex flex-col items-center">
            <view class="text-[24rpx] text-[#666] mb-[4rpx]">粉丝</view>
            <view class="text-[30rpx] font-medium text-[#222]">0</view>
          </view>
          <view class="flex flex-col items-center">
            <view class="text-[24rpx] text-[#666] mb-[4rpx]">获赞</view>
            <view class="text-[30rpx] font-medium text-[#222]">0</view>
          </view>
          <view class="flex flex-col items-center">
            <view class="text-[24rpx] text-[#666] mb-[4rpx]">拯救书荒</view>
            <view class="text-[30rpx] font-medium text-[#222]">0</view>
          </view>
        </view>
      </view>
      <view class="flex-none w-[40rpx] text-[#999] text-[32rpx]">
        <uni-icons type="right" size="30"></uni-icons>
      </view>
    </view>

    <!-- 工具栏目 -->
    <view
      class="h-[300rpx] m-[24rpx] rounded-[16rpx] bg-white grid grid-cols-3 gap-2.5 p-[24rpx]">
      <!-- 浏览历史，阅读偏好，赞过的视频，反馈与在赞助，我的预约 -->
      <view
        class="h-[96rpx] px-[36rpx] flex flex-col items-center justify-center text-[30rpx] text-[#222] whitespace-nowrap">
        <uni-icons type="fire" size="30"></uni-icons>
        <text>浏览历史</text>
      </view>
      <view
        class="h-[96rpx] px-[36rpx] flex flex-col items-center justify-center text-[30rpx] text-[#222] whitespace-nowrap">
        <uni-icons type="map" size="30"></uni-icons>
        <text>阅读偏好</text>
      </view>
      <view
        class="h-[96rpx] px-[36rpx] flex flex-col items-center justify-center text-[30rpx] text-[#222] whitespace-nowrap">
        <uni-icons type="videocam" size="30"></uni-icons>
        <text>赞过的视频</text>
      </view>
      <view
        class="h-[96rpx] px-[36rpx] flex flex-col items-center justify-center text-[30rpx] text-[#222] whitespace-nowrap">
        <uni-icons type="info" size="30"></uni-icons>
        <text>反馈与赞助</text>
      </view>
      <view
        class="h-[96rpx] px-[36rpx] flex flex-col items-center justify-center text-[30rpx] text-[#222] whitespace-nowrap">
        <uni-icons type="mail-open" size="30"></uni-icons>
        <text>我的预约</text>
      </view>
      <view
        class="h-[96rpx] px-[36rpx] flex flex-col items-center justify-center text-[30rpx] text-[#222] whitespace-nowrap">
        <uni-icons type="gear" size="30"></uni-icons>
        <text>设置</text>
      </view>
    </view>

    <!-- 2.推荐书籍模块 -->
    <SzBookRecommend ref="bookRecommendRef" />
  </scroll-view>
</template>

<script setup lang="ts">
import { bookRecommendList } from '@/composables'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
const isLoading = ref(false)
onShow(async () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 猜你喜欢
const { bookRecommendRef, onScrollToLower } = bookRecommendList()
</script>

<style lang="scss">
.viewport {
  // 渐变色背景色;
  background: linear-gradient(to bottom, #edcea7, #cfed8b, #4c90e9);
}
</style>

<template>
  <view class="h-screen flex flex-col">
    <!-- 搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="keyword"
        @confirm="handleSearch"></uni-easyinput>
    </view>

    <!-- 搜索条件 -->
    <view class="flex flex-col gap-5 border">
      <!-- 推荐书籍 -->
      <view class="h-[20px] border">推荐书籍</view>
      <!-- 标签 -->
      <view class="h-[20px] border">标签</view>
      <!-- 查询条件 -->
      <view class="h-[40px] border">查询条件</view>
    </view>

    <!-- 搜索结果 -->
    <view class="flex flex-col gap-5">
      <!-- 圈子 -->
      <view class="h-[40px] border">圈子</view>

      <!-- 书本列表 -->
      <view class="flex-1">
        <view v-for="(list, index) in 40" class="h-[60px] border">
          书本{{ index }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const keyword = ref('')

const handleSearch = () => {
  if (!keyword.value) return
  // 实际搜索逻辑
}
</script>

<style scoped></style>

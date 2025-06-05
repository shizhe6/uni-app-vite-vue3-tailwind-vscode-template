<template>
  <view class="flex flex-col h-screen">
    <!-- 1.搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="searchKeyword"
        @input="handleChange"
        @confirm="handleSearch"></uni-easyinput>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 接收父组件传过来的值
const { searchKeyword } = defineProps({
  searchKeyword: {
    type: String,
    default: ''
  }
})

/**
 * 搜索
 * @returns
 */
const handleSearch = () => {}

const handleChange = (e: any) => {}
</script>

<style lang="scss"></style>

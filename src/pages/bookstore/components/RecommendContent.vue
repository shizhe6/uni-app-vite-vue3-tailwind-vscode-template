<script lang="ts" setup>
/**
 * 页面挂载时加载数据
 *为什么使用onMounted，而不是onShow？
 */
onMounted(() => {
  console.log('推荐页面挂载')
})
</script>

<template>
  <view class="viewreport">
    推荐
  </view>
</template>

<style  lang="scss" scoped>
.viewreport {
  background-color: antiquewhite;
  height: 100vh;
}
</style>

<template>
  <SzLoading v-if="isLoadingQueryBook"></SzLoading>
</template>

<script lang="ts" setup>
// 是否加载中获取数据
const isLoadingQueryBook = ref(false)
</script>
<style lang="scss" scoped></style>

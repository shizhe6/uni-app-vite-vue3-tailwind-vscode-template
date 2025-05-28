<template>
  <uni-section
    class="chapter-picker relative h-full overflow-y-auto"
    v-show="showFooterBar && showDirectoyPanel"
    @click="toggleCategoryList">
    <!-- 头部：小说信息 -->
    <view
      class="novel-header sticky top-0 z-10 bg-white p-[15px] border-b border-[#eee]">
      <image class="cover-img" src="/static/novel-cover.jpg" mode="widthFix" />
      <view class="novel-meta">
        <text class="novel-title">《九界独尊》</text>
        <text class="novel-author">作者：风笑天</text>
      </view>
    </view>

    <!-- 目录/书签切换tab -->
    <view
      class="tab-container sticky top-[80px] z-10 bg-white border-b border-[#eee]">
      <view
        :class="['tab-item', { active: currentTab === 'directory' }]"
        @click="currentTab = 'directory'">
        目录
      </view>
      <view
        :class="['tab-item', { active: currentTab === 'bookmark' }]"
        @click="currentTab = 'bookmark'">
        书签(3)
      </view>
    </view>

    <!-- 目录/书签内容列表 -->
    <view class="list-content pt-[160px]">
      <!-- 目录列表 -->
      <view v-if="currentTab === 'directory'">
        <uni-list>
          <uni-list-item
            :key="item.id"
            :class="{
              active:
                currentChapterSectionIndex * CHAPTER_SECTION_COUNT + index ===
                currentPageIndex
            }"
            v-for="(item, index) in chapterListData"
            :title="item.title"
            @click="gotoTargeChapterFromItem(item, index)"
            class="chapter-item"
            hover-class="uni-list-item-hover" />
        </uni-list>
      </view>

      <!-- 书签列表 -->
      <view v-else>
        <uni-list>
          <uni-list-item
            v-for="(item, index) in bookmarkList"
            :key="item.id"
            :title="item.title"
            :extra="`第${item.page}页`"
            @click="gotoTargeChapterFromItem(item, index)"
            class="bookmark-item"
            show-extra
            hover-class="uni-list-item-hover" />
        </uni-list>
      </view>
    </view>
  </uni-section>
</template>

<script setup>
// 这里可以编写组件的逻辑
</script>

<style scoped>
/* 这里可以编写组件的样式 */
</style>

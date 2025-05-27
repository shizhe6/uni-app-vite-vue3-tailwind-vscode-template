<template>
  <view :class="['chapter-page', { nightMode: isNightMode }]">
    <!-- 章节内容 -->
    <rich-text
      class="chapter-content"
      @click="onPageClick"
      :nodes="chapterDetailsConver"
      :style="{ fontSize: chapterFontSize + 'px' }" />

    <!-- 上一章下一章 -->
    <view class="turnPage" v-show="chapterDetailsConver">
      <view
        class="button last"
        @click="gotoTargeChapter(currentPageIndex - 1)"
        v-if="currentPageIndex > 0">
        上一章
      </view>
      <view
        class="button next"
        @click="gotoTargeChapter(currentPageIndex + 1)"
        v-if="currentPageIndex < chaptersSectionCount - 1">
        下一章
      </view>
    </view>
    <!-- 底部菜单 -->
    <view :class="['chapter-footbar', { show: showFooterBar }]">
      <view>
        <view @click="gotoHome" v-if="fromOtherPlace">
          <i class="iconfont icon-home"></i>
          <span>书架</span>
        </view>
        <view @click="toggleNightOrDay">
          <i class="iconfont icon-sun1" v-if="isNightMode"></i>
          <i class="iconfont icon-moon" v-else></i>
          <view>{{ isNightMode ? '白天' : '夜间' }}</view>
        </view>
        <view @click="toggleSettingPanel">
          <i class="iconfont icon-setting"></i>
          <view>设置</view>
        </view>
        <view @click="toggleCategoryList">
          <i class="iconfont icon-menu"></i>
          <view>目录</view>
        </view>
        <view @click="gotoSourcePage(chapterListDataId)">
          <i class="iconfont icon-change"></i>
          <view>换源</view>
        </view>
      </view>
      <!-- 设置面板 -->
      <view class="setting-panel" v-show="showFooterBar && showSettingPanel">
        <!-- 亮度调节面板 -->
        <view class="lightness setting-panel-normal">
          <i class="iconfont icon-sun"></i>
          <uni-slider
            min="0"
            max="1"
            :value="lightness"
            step="0.05"
            color="#f5f5f5"
            activeColor="#4393e2"
            block-size="14"
            @changing="changeLightNess"
            @change="changeLightNess" />
          <div>
            <span style="margin-right: 10px">常亮</span>
            <uni-switch
              type="checkbox"
              :checked="isKeepLight"
              @change="toggleScreenLight"></uni-switch>
          </div>
        </view>
        <!-- 字体大小调节面板 -->
        <view class="font-size setting-panel-normal">
          <i class="iconfont icon-ziti"></i>
          <slider
            min="12"
            max="30"
            :value="chapterFontSize"
            step="1"
            color="#f5f5f5"
            activeColor="#4393e2"
            block-size="14"
            @change="changeFontSize" />
        </view>
      </view>
    </view>
    <!-- 目录 -->
    <uni-section
      :class="['chapter-picker', { showDirectory: showDirectory?.value }]"
      @click="toggleCategoryList">
      <view @click.stop>
        <view>目录(共{{ chaptersSectionCount }}章)</view>
        <uni-picker
          :range="chapterSectionArray"
          @change="chapterSectionArrayChange"
          :value="currentChapterSectionIndex">
          <text class="picker">
            {{ chapterSectionArray[currentChapterSectionIndex] }}
            <i class="iconfont icon-dropDown"></i>
          </text>
        </uni-picker>
      </view>
      <view @click.stop>
        <view
          :key="item.id"
          :class="{
            active:
              currentChapterSectionIndex * CHAPTER_SECTION_COUNT + index ===
              currentPageIndex
          }"
          v-for="(item, index) in currentChapterSection"
          @click="gotoTargeChapterFromItem(item, index)">
          {{ item.title }}
        </view>
      </view>
      <button>关闭</button>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
// 假数据定义
const isNightMode = ref(false)
const chapterDetailsConver = ref([
  { type: 'text', text: '这是一个假的章节内容' }
])
const chapterFontSize = ref(16)
const currentPageIndex = ref(0)
const chaptersSectionCount = ref(10)
const fromOtherPlace = ref(true)
const showFooterBar = ref(false)
const showSettingPanel = ref(false)
const lightness = ref(0.5)
const isKeepLight = ref(false)
const chapterSectionArray = ref(['章节 1', '章节 2', '章节 3'])
const currentChapterSectionIndex = ref(0)
const currentChapterSection = ref([
  { id: 1, title: '章节 1' },
  { id: 2, title: '章节 2' }
])
const chapterListDataId = ref(1)
const CHAPTER_SECTION_COUNT = 1
const showDirectory = ref(false)

// 方法实现
const onPageClick = () => {
  console.log('页面被点击')
}

const gotoTargeChapter = (index: number) => {
  currentPageIndex.value = index
  console.log(`跳转到章节 ${index}`)
}

const gotoHome = () => {
  console.log('返回书架')
}

const toggleNightOrDay = () => {
  isNightMode.value = !isNightMode.value
  console.log(`切换到 ${isNightMode.value ? '夜间' : '白天'} 模式`)
}

const toggleSettingPanel = () => {
  showSettingPanel.value = !showSettingPanel.value
  console.log(`设置面板 ${showSettingPanel.value ? '显示' : '隐藏'}`)
}

const toggleCategoryList = () => {
  console.log('切换目录列表显示状态')
}

const gotoSourcePage = (id: number) => {
  console.log(`跳转到换源页面，源 ID: ${id}`)
}

const changeLightNess = (e: any) => {
  lightness.value = e.detail.value
  console.log(`亮度调整为 ${lightness.value}`)
}

const toggleScreenLight = (e: any) => {
  isKeepLight.value = e.detail.value
  console.log(`屏幕常亮状态: ${isKeepLight.value}`)
}

const changeFontSize = (e: any) => {
  chapterFontSize.value = e.detail.value
  console.log(`字体大小调整为 ${chapterFontSize.value}px`)
}

const chapterSectionArrayChange = (e: any) => {
  currentChapterSectionIndex.value = e.detail.value
  console.log(`当前章节段索引变更为 ${currentChapterSectionIndex.value}`)
}

const gotoTargeChapterFromItem = (item: any, index: number) => {
  currentPageIndex.value =
    currentChapterSectionIndex.value * CHAPTER_SECTION_COUNT + index
  console.log(`从目录项跳转到章节 ${currentPageIndex.value}`)
}
</script>

<style lang="scss" scoped>
$primaryColor: #4393e2;

.chapter-page {
  background-color: #efe6df;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
  font-size: 14px;

  .changeSourceButton {
    position: absolute;
    left: 50%;
    top: 50%;
    width: auto;
    transform: translate(-50%, -50%);
    padding: 2px 20px;
    color: #fff;
    background-color: $primaryColor;
    font-size: 14px;
  }
}

.chapter-content {
  padding: 15px 15px 0;
  line-height: 1.75;
  text-indent: 2em;
  min-height: 80vh;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  display: block;
  word-wrap: break-word;
}

.turnPage {
  padding: 30px 15px 20px;
  display: flex;
  justify-content: space-between;

  .button {
    background-color: transparent;
    flex: 1;
    border-radius: 30px;
    border: 1px solid #999;
    color: #666;
    outline: none;
    font-size: 14px;
    text-align: center;
    padding: 6px 0;

    &.next {
      flex: 1.8;
      margin-left: 20px;
    }
  }
}

.chapter-footbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  transition: transform 0.3s ease;
  transform: translateY(100%);

  &.show {
    transform: translateY(0);
  }

  > ul {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 100;
    padding-top: 5px;
  }

  li {
    flex: 1;
    text-align: center;
    padding: 8px 0;

    .iconfont {
      margin-bottom: 5px;
    }
  }
}

.setting-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #333;
  padding: 1px 20px;
  border-bottom: 1px solid #4e4e4e;

  .setting-panel-normal {
    padding: 5px 0;
    display: flex;
    align-items: center;

    slider {
      flex: 1;
    }

    &.lightness > div {
      display: inline-flex;
      align-items: center;
    }
  }
}

.chapter-picker {
  color: #333;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  overflow: auto;
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0 0 10px rgba(#333, 0.375);

    .picker {
      display: inline-flex;
      align-items: center;
    }

    .icon-dropDown {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  & > ul {
    flex: 1;
    overflow: auto;

    li {
      padding: 10px 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.active {
        color: #fff;
        background-color: rgba($primaryColor, 0.75);
      }
    }
  }

  &.showDirectory {
    transform: translate3d(0, 0, 0);
  }

  > button {
    width: 100%;
    background-color: $primaryColor;
    outline: none;
    border-radius: 0;
    border: 0;
    font-size: 14px;
    color: #fff;
    padding: 5px 0;
    box-shadow: 0 0 10px rgba($primaryColor, 0.375);
  }
}

// 主题调整
.chapter-page {
  // 夜间模式
  &.nightMode {
    background: #333;

    .chapter-content {
      color: #777;
    }

    .chapter-picker {
      background: #333;

      header,
      > ul {
        color: #666;
      }

      li.active {
        color: $primaryColor;
        background-color: transparent;
      }
    }
  }
}
</style>

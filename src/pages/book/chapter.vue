<template>
  <view
    class="chapter-page"
    :class="{ nightMode: isNightMode }"
    :style="{ backgroundColor: computedBgColor }">
    <!-- 1.章节内容 -->
    <!-- 标题 -->
    <view class="flex justify-center items-center text-lg font-bold mb-8">
      {{ chapterItemList[0].title }}
    </view>
    <!-- 段落内容 -->
    <view
      @click="onPageClick"
      class="ph-content mb-8  m-2"
      v-for="(paragraphItem, index) in paragraphItemList"
      :key="index">
      <!-- 段落内容 -->
      <text
        class="pl-8 text-sm leading-relaxed"
        :style="{ fontSize: chapterFontSize + 'px' }">
        {{ paragraphItem.content }}
      </text>
      <uni-badge
        v-if="paragraphItem.charts.length > 0"
        :text="paragraphItem.charts.length"
        absolute="rightTop"
        size="small">
        <view @click.stop="showCharts()" class="box">
          <uni-icons
            type="chat"
            size="30"
            class="relative"
            hover-stop-propagation="true"></uni-icons>
        </view>
      </uni-badge>
    </view>

    <!-- 2.底部菜单 -->
    <view :class="['chapter-footbar', { show: showFooterBar }]">
      <!-- 目录按钮 -->
      <view @click="toggleCategoryList" class="flex flex-col">
        <uni-icons type="wallet" size="30"></uni-icons>
        <text>目录</text>
      </view>
      <!-- 夜间模式按钮 -->
      <view @click="toggleNightOrDay" class="flex flex-col">
        <uni-icons
          type="smallcircle-filled"
          size="30"
          v-if="isNightMode"></uni-icons>
        <uni-icons type="star" size="30" v-else></uni-icons>
        <text>{{ isNightMode ? '白天' : '夜间' }}</text>
      </view>
      <!-- 设置按钮 -->
      <view @click="toggleSettingPanel" class="flex flex-col">
        <uni-icons type="settings" size="30"></uni-icons>
        <text>设置</text>
      </view>
      <!-- 2.1 设置面板 -->
      <view class="setting-panel" v-show="showFooterBar && showSettingPanel">
        <!-- 亮度调节面板 -->
        <view class="setting-panel-normal">
          <text>亮度</text>
          <slider
            min="0"
            max="1"
            :value="lightness"
            step="0.05"
            color="#f5f5f5"
            activeColor="#4393e2"
            block-size="14"
            @changing="changeLightNess"
            @change="changeLightNess" />
          <view>
            <text style="margin-right: 10px">常亮</text>
            <switch
              type="checkbox"
              :checked="isKeepLight"
              @change="toggleScreenLight"></switch>
          </view>
        </view>
        <!-- 字体大小调节面板 -->
        <view class="setting-panel-normal">
          <text>字体</text>
          <slider
            min="12"
            max="30"
            :value="chapterFontSize"
            step="1"
            color="#f5f5f5"
            activeColor="#4393e2"
            block-size="14"
            show-value
            @change="changeFontSize" />
        </view>
        <!-- 背景颜色调节面板 -->
        <view class="setting-panel-normal">
          <text>背景</text>
          <view class="flex-1 flex flex-row justify-around items-center">
            <view
              v-for="(color, index) in backgroundColorList"
              :key="index"
              class="rounded-full w-8 h-8"
              :style="{ backgroundColor: color }"
              @click="changeBackgroundColor(color, index)"></view>
          </view>
        </view>
      </view>

      <!-- 2.2 设置面板 -->
      <view class="directoy-panel" v-show="showFooterBar && showDirectoyPanel">
        <!-- 头部：小说信息 -->
        <view class="flex p-[15px] border-b border-[#eee]">
          <image
            class="w-[60px] h-[80px] rounded mr-3"
            :src="novelInfo.cover"
            mode="widthFix" />
          <view class="flex-1 flex flex-col justify-center">
            <text class="text-base font-semibold mb-1">
              {{ novelInfo.title }}
            </text>
            <text class="text-sm text-gray-600">{{ novelInfo.author }}</text>
          </view>
        </view>

        <!-- 目录/书签切换tab -->
        <view class="flex border-b border-[#eee]">
          <view
            class="flex-1 text-center py-3 text-[15px] text-gray-600"
            :class="{
              'text-[#4393e2] font-semibold border-b-2 border-[#4393e2]':
                currentTab === 'directory'
            }"
            @click="changeCurrentTab('directory')">
            目录
          </view>
          <view
            class="flex-1 text-center py-3 text-[15px] text-gray-600"
            :class="{
              'text-[#4393e2] font-semibold border-b-2 border-[#4393e2]':
                currentTab === 'bookmark'
            }"
            @click="changeCurrentTab('bookmark')">
            书签
          </view>
        </view>

        <!-- 内容列表 -->
        <view class="p-[15px] h-[500px] overflow-y-auto">
          <!-- 目录列表 -->
          <uni-list v-if="currentTab === 'directory'">
            <uni-list-item
              :key="item.id"
              v-for="(item, index) in chapterItemList"
              :title="item.title"
              @click="gotoTargeChapterFromItem(item, index)"
              class="py-1 text-sm border-b border-[#f5f5f5] last:border-0"
              hover-class="uni-list-item-hover" />
          </uni-list>
          <uni-list v-else>
            <uni-list-item
              clickable
              :key="item.id"
              v-for="(item, index) in bookmMarkItemList"
              :title="item.title"
              @click="gotoTargeChapterFromItem(item, index)"
              class="py-1 text-sm border-b border-[#f5f5f5] last:border-0"
              hover-class="uni-list-item-hover" />
          </uni-list>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  initBookMarkItemListAPI,
  initChapterItemListAPI,
  initParagraphItemListAPI
} from '@/services/book'
import { BookMarkItem, ChapterItem, ParagraphItem } from '@/types/book'

const currentTab = ref<'directory' | 'bookmark'>('directory')

//背景色列表
const backgroundColorList = ref<string[]>([])
// 背景色，取第一个颜色
const computedBgColor = ref()
//当前背景色索引
const currentColorIndex = ref(0)

//当前章节数据
const chapterItemList = ref<ChapterItem[]>([])

// 书签列表
const bookmMarkItemList = ref<BookMarkItem[]>([])
// 初始化章节数据
const paragraphItemList = ref<ParagraphItem[]>([])
// 当前章节id
const currentChapterId = ref(0)
// 当前书籍的id
const currentBookId = ref(0)

// 初始化数据
onLoad(() => {
  // 1.初始化当前章节数据
  initChapterItemList()

  // 2.初始化章节数据
  currentChapterId.value = 1
  initParagraphItemList(currentChapterId.value)

  // 3.初始化目录数据
  initBookMarkItemList(currentBookId.value)

  // 4.初始化背景颜色
  initBackgroundColorListData()
})

// 定义小说的图片名称作者
const novelInfo = {
  id: 1,
  cover: 'https://picsum.photos/200/300?random=1',
  title: '九界独尊',
  author: '风笑天'
}
// changeCurrentTab
const changeCurrentTab = (tab: string) => {
  // 由于 tab 是 string 类型，需要进行类型断言以解决类型不匹配问题
  currentTab.value = tab as 'directory' | 'bookmark'
  console.log(`切换到 ${tab} 面板`)
}
const initBackgroundColorListData = () => {
  backgroundColorList.value = [
    '#f2f2f2',
    '#f0dbbc',
    '#d8e5cb',
    '#ced7e6',
    '#333'
  ]

  // 默认第一个颜色
  computedBgColor.value = backgroundColorList.value[currentColorIndex.value]
}

// 切换背景颜色
const changeBackgroundColor = (color: string, index: number) => {
  if (index == 4) {
    isNightMode.value = true
    computedBgColor.value = color
  } else {
    isNightMode.value = false
    computedBgColor.value = color
  }
}

// popup
const showPopup = ref(false)
// 明确指定 event 参数的类型为 MouseEvent，解决隐式 any 类型问题
const showCharts = () => {
  console.log('显示聊天记录', showPopup.value)
  uni.navigateTo({
    url: '/pages/chart/chart'
  })
}
/**
 *
 * @returns 章节列表数据
 */
const initChapterItemList = () => {
  chapterItemList.value = initChapterItemListAPI()
}
const initBookMarkItemList = (currentBookId: number) => {
  bookmMarkItemList.value = initBookMarkItemListAPI(currentBookId)
}
const initParagraphItemList = (currentChapterId: number) => {
  paragraphItemList.value = initParagraphItemListAPI(1)
}

const isNightMode = ref(false)
const chapterFontSize = ref(16)
const currentPageIndex = ref(0)
const showFooterBar = ref(false)
const showSettingPanel = ref(false)
const showDirectoyPanel = ref(false)
const lightness = ref(0.5)
const isKeepLight = ref(false)
const currentChapterSectionIndex = ref(0)

const CHAPTER_SECTION_COUNT = 1
const showDirectory = ref(false)
// 方法实现
const onPageClick = () => {
  console.log('页面被点击')
  showFooterBar.value = !showFooterBar.value
}

// 切换黑夜和白天模式
const toggleNightOrDay = () => {
  isNightMode.value = !isNightMode.value
  if (isNightMode.value) {
    // 切换到夜间模式
    console.log('切换到夜间模式')
    computedBgColor.value = backgroundColorList.value[4]
  } else {
    console.log('切换到白天模式')
    computedBgColor.value = backgroundColorList.value[0]
  }
}

// 切换设置面板显示状态
const toggleSettingPanel = () => {
  showSettingPanel.value = !showSettingPanel.value
  // 关闭目录面板
  showDirectoyPanel.value = false
  console.log(`设置面板 ${showSettingPanel.value ? '显示' : '隐藏'}`)
}

// 切换目录列表显示状态
const toggleCategoryList = () => {
  showDirectoyPanel.value = !showDirectoyPanel.value

  // 关闭设置面板
  showSettingPanel.value = false
  console.log('切换目录列表显示状态')
}

// 修改屏幕亮度
const changeLightNess = (e: any) => {
  lightness.value = e.detail.value
  console.log(`亮度调整为 ${lightness.value}`)
  uni.setScreenBrightness({
    value: lightness.value,
    success: function () {
      console.log('success')
    }
  })
}

// 设置是否常亮
const toggleScreenLight = (e: any) => {
  isKeepLight.value = e.detail.value
  console.log(`屏幕常亮状态: ${isKeepLight.value}`)
  uni.setKeepScreenOn({
    keepScreenOn: isKeepLight.value
  })
}

const changeFontSize = (e: any) => {
  chapterFontSize.value = e.detail.value
  console.log(`字体大小调整为 ${chapterFontSize.value}px`)
}

const gotoTargeChapterFromItem = (item: any, index: number) => {
  currentPageIndex.value =
    currentChapterSectionIndex.value * CHAPTER_SECTION_COUNT + index
  console.log(`从目录项跳转到章节 ${currentPageIndex.value}`)
}
</script>

<style lang="scss" scoped>
// 整体样式
.chapter-page {
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
  font-size: 14px;
  // 夜间模式
  &.nightMode {
    .chapter-content {
      color: #fff5f5;
    }
  }
  // 目录
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
  // 底部菜单
  .chapter-footbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    color: black;
    transition: transform 0.3s ease;
    transform: translateY(100%);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    &.show {
      transform: translateY(0);
    }
  }
}

// 设置面板
.setting-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1px 20px;
  .setting-panel-normal {
    padding: 5px 0;
    display: flex;
    align-items: center;

    slider {
      flex: 1;
    }
  }
}

// 目录面板
.directoy-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1px 20px;
  border-bottom: 1px solid #e64f4f;
}

.box {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  font-size: 12px;
}

// 目录面板
.chart-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1px 20px;
  border-bottom: 1px solid #e64f4f;
  height: 400px;
}

.uni-badge-left-margin {
  border: 1px solid #e64f4f;
}
</style>

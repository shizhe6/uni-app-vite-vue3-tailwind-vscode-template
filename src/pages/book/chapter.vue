<template>
  <view
    :class="['chapter-page', { nightMode: isNightMode }]"
    :style="{ backgroundColor: computedBgColor }">
    <!-- 章节内容 -->
    <rich-text
      class="chapter-content"
      @click="onPageClick"
      :nodes="chapterDetailsConver"
      :style="{ fontSize: chapterFontSize + 'px' }" />

    <!-- 底部菜单 -->
    <view :class="['chapter-footbar', { show: showFooterBar }]">
      <view @click="toggleCategoryList" class="flex flex-col">
        <uni-icons type="wallet" size="30"></uni-icons>
        <text>目录</text>
      </view>
      <view @click="toggleNightOrDay" class="flex flex-col">
        <uni-icons
          type="smallcircle-filled"
          size="30"
          v-if="isNightMode"></uni-icons>
        <uni-icons type="star" size="30" v-else></uni-icons>
        <text>{{ isNightMode ? '白天' : '夜间' }}</text>
      </view>
      <view @click="toggleSettingPanel" class="flex flex-col">
        <uni-icons type="settings" size="30"></uni-icons>
        <text>设置</text>
      </view>

      <!-- 设置面板 -->
      <view class="setting-panel" v-show="showFooterBar && showSettingPanel">
        <!-- 亮度调节面板 -->
        <view class="lightness setting-panel-normal">
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
        <view class="font-size setting-panel-normal">
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
        <view class="background-color setting-panel-normal">
          <text>背景</text>
          <view class="flex-1 flex flex-row justify-around items-center">
            <view
              v-for="(color, index) in backgroundColorList"
              :key="index"
              class="rounded-full w-8 h-8"
              :style="{ backgroundColor: color }"
              @click="changeBackgroundColor(index)"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
//定义backgroundColorList，并给5个值
const backgroundColorList = ref([
  '#f2f2f2',
  '#f0dbbc',
  '#d8e5cb',
  '#ced7e6',
  '#333'
])
// currentColorIndex
const currentColorIndex = ref(0)
// 切换背景颜色 computedBgColor
import { ref } from 'vue'
const computedBgColor = ref(backgroundColorList.value[currentColorIndex.value])

const changeBackgroundColor = (index: number) => {
  currentColorIndex.value = index
  const backgroundColor = backgroundColorList.value[index]
  // 修改组件背景色 <view :class="['chapter-page', { nightMode: isNightMode }]">

  console.log('backgroundColor index', index)
  if (index == 4) {
    isNightMode.value = true
    computedBgColor.value = backgroundColor
  } else {
    isNightMode.value = false
    computedBgColor.value = backgroundColor
  }
}

// 修改假数据定义，使用网页搜索的小说内容替换 `chapterDetailsConver` 的假数据。
const chapterDetailsConver = ref([
  { type: 'text', text: '  第142章 冲突  跟上他们的身形。' },
  { name: 'br' },
  { type: 'text', text: '  还偷偷摸摸，故意遮掩气息。' },
  { type: 'text', text: '  他身上携带的恶意，已经昭然若揭！' },
  { name: 'br' },
  { type: 'text', text: '  季浮游thoughts流转。' },
  { type: 'text', text: '  心中瞬间有了决断。' },
  { name: 'br' },
  { type: 'text', text: '  他不想节外生枝得罪周忘川，可现在的问题是……' },
  { type: 'text', text: '  对方已经将主意打到他们身上了！' },
  { name: 'br' },
  { type: 'text', text: '  目的……' },
  { type: 'text', text: '  想渔翁得利？' },
  { type: 'text', text: '  还是其他原因？' },
  { type: 'text', text: '  都不重要了！' },
  { name: 'br' },
  { type: 'text', text: '  就在这人潜至离季浮游所属雕像不远时，季浮游动了。' },
  {
    type: 'text',
    text: '  本就保持着半蹲状态下的他，劲力爆发，浑身气血犹如烘炉运转，提供源源不断的能量灌注全身。'
  },
  { name: 'br' },
  { type: 'text', text: '  与此同时，他长剑刺出，剑意勃发！' },
  {
    type: 'text',
    text: '  大成境界的守真剑意仿佛能撕裂灵魂，瞬间让这位意识到自己暴露的男子脸上涌现出遏制不住的惊恐。'
  },
  { name: 'br' },
  { type: 'text', text: '  “住手……”' },
  { type: 'text', text: '  他张口就要大叫。' },
  { name: 'br' },
  { type: 'text', text: '  可季浮游这一剑来的太快。' },
  { type: 'text', text: '  以幻真无影术藏在一侧，再暴起出手，且剑意勃发。' },
  {
    type: 'text',
    text: '  这种迅如惊雷的一剑，如何是这个体魄估计只有23、24左右的武者所能抵挡？'
  },
  { name: 'br' },
  { type: 'text', text: '  他甚至只能堪堪做出横刀身前的动作……' },
  {
    type: 'text',
    text: '  没等来得及封锁住冷钢剑的进攻轨迹，冷冽的剑锋已经贯穿了他的喉咙，将他接下来的惨叫声全部堵了回去。'
  },
  { name: 'br' },
  { type: 'text', text: '  “嗤！”' },
  { type: 'text', text: '  刺剑、拔剑！' },
  { name: 'br' },
  {
    type: 'text',
    text: '  动作完成的前一秒，季浮游更是左手一击，狠狠打在他心脏位置。'
  },
  { type: 'text', text: '  伤口处即将喷涌而出的鲜血竟是被生生凝滞。' },
  { type: 'text', text: '  仿佛所有血液失去了输送、运转之力，冻结在体内。' },
  { type: 'text', text: '' },
  {
    type: 'text',
    text: '  而后，季浮游抓起这道男子的身躯，一步虚跨，瞬间进入了不远处的祷告室。'
  },
  {
    type: 'text',
    text: '  这个时候，杨开泰亦是听到了外面传来的动静，迅速迎了上来。'
  },
  { name: 'br' },
  { type: 'text', text: '  “队长……”' },
  {
    type: 'text',
    text: '  当看到他手上提来的那道已经化为尸体的身影，眼瞳猛然一缩：“周忘川的人！？”'
  },
  { name: 'br' },
  {
    type: 'text',
    text: '  “偷偷摸摸的跟上来，还特意隐藏气息，你的精神都没感知到吧？般鬼鬼祟祟，目的不用我多说了。”'
  },
  { type: 'text', text: '  季浮游简短的道了一声。' },
  { name: 'br' },
  {
    type: 'text',
    text: '  杨开泰眼尖：“周忘川，好大的胆子，当真以为我们好欺负不成！”'
  },
  { type: 'text', text: '  他看一眼祷告室内那些怪物和人类尸体……' },
  { type: 'text', text: '  这一两公里路上他们就遇到周忘川一行人。' },
  { name: 'br' },
  { type: 'text', text: '  十有八九……' },
  { type: 'text', text: '  那以严松为首的九位狩猎者就是死在他们手上。' },
  { name: 'br' },
  { type: 'text', text: '  季浮游将尸体往里面一丢：“准备一下！”' },
  { type: 'text', text: '  “周忘川那些人……”' },
  { type: 'text', text: '  “他们敢打我们的主意，就得做好被我们反杀的准备！”' },
  { type: 'text', text: '  季浮游直接道：“迎上去！”' },
  { name: 'br' },
  { type: 'text', text: '  “和他们动手？”' },
  { type: 'text', text: '  杨开泰微微一怔。' },
  { type: 'text', text: '  周忘川那一行人可不是弱者。' },
  { type: 'text', text: '  实力怕是丝毫不在他们之下。' },
  { type: 'text', text: '' },
  { type: 'text', text: '  不对！' },
  { type: 'text', text: '  他们有季浮游！' },
  { type: 'text', text: '  季浮游的实力比之他们来高出一个层次！' },
  { type: 'text', text: '' },
  {
    type: 'text',
    text: '  再加上此刻他们已经减员一人，真打起来，他们一方的胜率至少有七八成。'
  },
  { type: 'text', text: '  七八成胜率，那还有什么好怕的？' },
  { type: 'text', text: '' },
  { type: 'text', text: '  “就依队长所说。”' },
  {
    type: 'text',
    text: '  杨开泰重重一点头：“他们中，最厉害的是周忘川和秦舟！其中，秦舟应该有不逊色于小雪的实力，至于周忘川……我可以牵制他一段时间！”'
  },
  { type: 'text', text: '' },
  { type: 'text', text: '  “可以！”' },
  {
    type: 'text',
    text: '  季浮游点了点头：“秦舟我解决，你们四个，对付他们三个，不要求你们战胜他们，至少得确保将他们牵制住，有没有问题？”'
  },
  { type: 'text', text: '' },
  { type: 'text', text: '  “好！”' },
  { type: 'text', text: '  “秦舟和我差不多？要么我去对付？”' },
  { type: 'text', text: '  “听从队长安排。”' },
  { type: 'text', text: '  方栖云、萧寒雪、柳依人纷纷表态。' },
  { type: 'text', text: '' },
  { type: 'text', text: '  当下，六人迅速出了祷告室。' },
  { type: 'text', text: '  直奔那道身影潜伏而来的方向而去。' },
  { type: 'text', text: '' },
  {
    type: 'text',
    text: '  很快，杨开泰、季浮游两人已经感应到了一道探查而来的精神力。'
  },
  { type: 'text', text: '  “在那边！”' },
  { type: 'text', text: '  杨开泰道。' },
  { type: 'text', text: '' },
  {
    type: 'text',
    text: '  不过，似乎是季浮游一行人表现的太过气势汹汹，这种明显有恃无恐的姿态让他们心生忌惮。'
  },
  {
    type: 'text',
    text: '  精神力一接触，周忘川竟是带人转身就走，丝毫没有为自家队员报仇的意思。'
  },
  { type: 'text', text: '' },
  { type: 'text', text: '  “追！”' },
  { type: 'text', text: '  季浮游当即下令，大步流星。' },
  { type: 'text', text: '' },
  { type: 'text', text: '  而一追击，双方的距离渐渐拉开。' },
  { type: 'text', text: '  季浮游、萧寒雪是第一梯队。' },
  { type: 'text', text: '  方栖云、关越是第二梯队。' },
  { type: 'text', text: '  柳依人和杨开泰自然就落入第三梯队了。' },
  { type: 'text', text: '' },
  {
    type: 'text',
    text: '  不过，这种追击持续了数百米后，杨开泰却仿佛意识到了什么：“不对！”'
  },
  {
    type: 'text',
    text: '  他突然道：“如果他们要逃，按理说应该朝反方向逃，可现在……他们逃跑的方向……似乎在将我们往里面引……”'
  },
  { type: 'text', text: '<br>' },
  {
    type: 'br',
    text: '  几乎在杨开泰察觉到这一点的同时，周忘川身上的精神波动猛然积蓄到了极致。'
  },
  {
    type: 'text',
    text: '  下一刻，这些精神力量凝聚一股，仿佛一道划过迷雾的长箭，直往离他们仅百余米的一个大门紧锁的房间射去。'
  }
])
const isNightMode = ref(false)
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
  showFooterBar.value = !showFooterBar.value
}

const gotoTargeChapter = (index: number) => {
  currentPageIndex.value = index
  console.log(`跳转到章节 ${index}`)
}

const gotoHome = () => {
  console.log('返回书架')
}

// 切换黑夜和白天模式
const toggleNightOrDay = () => {
  isNightMode.value = !isNightMode.value
  console.log(`切换到 ${isNightMode.value ? '夜间' : '白天'} 模式`)

  if (isNightMode.value) {
    // 切换到夜间模式
    console.log('切换到夜间模式')
    changeBackgroundColor(4)
  } else {
    changeBackgroundColor(0)
    console.log('切换到白天模式')
  }
}

// 切换设置面板显示状态
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
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
  font-size: 14px;
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

.setting-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
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

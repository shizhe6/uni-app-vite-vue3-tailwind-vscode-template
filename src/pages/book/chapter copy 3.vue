<template>
  <view
    class="chapter-page h-screen box-border relative overflow-auto text-sm"
    :class="{ nightMode: isNightMode }"
    :style="{ backgroundColor: computedBgColor }">
    <!-- 章节内容 -->
    <rich-text
      class="chapter-content pt-[15px] px-[15px] leading-7 indent-8 min-h-[80vh] text-gray-900 w-full box-border block break-words"
      @click="onPageClick"
      :nodes="chapterDetailsConver"
      :style="{ fontSize: chapterFontSize + 'px' }" />

    <!-- 底部菜单 -->
    <view
      class="chapter-footbar fixed bottom-0 left-0 right-0 bg-white text-black transition-transform duration-300 ease-in-out translate-y-full flex flex-row items-center justify-around h-[100px]"
      :class="{ 'show: translate-y-0': showFooterBar }">
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
      <view
        class="setting-panel absolute bottom-full left-0 right-0 bg-white py-[1px] px-[20px] border-b border-[#4e4e4e]"
        v-show="showFooterBar && showSettingPanel">
        <!-- 亮度调节面板 -->
        <view class="lightness setting-panel-normal py-[5px] flex items-center">
          <text>亮度</text>
          <slider
            class="flex-1"
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
            <text class="mr-2">常亮</text>
            <switch
              type="checkbox"
              :checked="isKeepLight"
              @change="toggleScreenLight"></switch>
          </view>
        </view>
        <!-- 字体大小调节面板 -->
        <view class="font-size setting-panel-normal py-[5px] flex items-center">
          <text>字体</text>
          <slider
            class="flex-1"
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
        <view
          class="background-color setting-panel-normal py-[5px] flex items-center">
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

    <!-- 目录 -->
    <uni-section
      :class="[
        'chapter-picker relative h-full overflow-y-auto',
        { showDirectory: showDirectory }
      ]"
      @click="toggleCategoryList">
      <!-- 头部：小说信息 -->
      <view class="novel-header flex p-[15px] border-b border-[#eee]">
        <image
          class="cover-img w-[60px] h-[80px] rounded mr-3"
          src="/static/novel-cover.jpg"
          mode="widthFix" />
        <view class="novel-meta flex-1 flex flex-col justify-center">
          <text class="novel-title text-base font-semibold mb-1">
            《九界独尊》
          </text>
          <text class="novel-author text-sm text-gray-600">作者：风笑天</text>
        </view>
      </view>

      <!-- 目录/书签切换tab -->
      <view class="tab-container flex border-b border-[#eee]">
        <view
          :class="[
            'tab-item flex-1 text-center py-3 text-[15px] text-gray-600',
            {
              'text-[#4393e2] font-semibold border-b-2 border-[#4393e2]':
                currentTab === 'directory'
            }
          ]"
          @click="currentTab = 'directory'">
          目录
        </view>
        <view
          :class="[
            'tab-item flex-1 text-center py-3 text-[15px] text-gray-600',
            {
              'text-[#4393e2] font-semibold border-b-2 border-[#4393e2]':
                currentTab === 'bookmark'
            }
          ]"
          @click="currentTab = 'bookmark'">
          书签(3)
        </view>
      </view>

      <!-- 内容列表 -->
      <view class="list-content p-[15px]">
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
              v-for="(item, index) in currentChapterSection"
              :title="item.title"
              @click="gotoTargeChapterFromItem(item, index)"
              class="chapter-item py-2 text-sm border-b border-[#f5f5f5] last:border-0"
              hover-class="uni-list-item-hover" />
          </uni-list>
        </view>

        <!-- 书签列表（假数据） -->
        <view v-else>
          <uni-list>
            <uni-list-item
              v-for="(item, index) in bookmarkList"
              :key="item.id"
              :title="item.title"
              :extra="`第${item.page}页`"
              @click="gotoTargeChapterFromItem(item, index)"
              class="bookmark-item py-2 text-sm text-gray-600 border-b border-[#f5f5f5] last:border-0"
              show-extra
              hover-class="uni-list-item-hover" />
          </uni-list>
        </view>
      </view>
    </uni-section>
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
  if (index == 4) {
    isNightMode.value = true
    computedBgColor.value = backgroundColor
  } else {
    isNightMode.value = false
    computedBgColor.value = backgroundColor
  }
}
// 新增假数据
const currentTab = ref('directory') // 当前显示的tab（directory-目录，bookmark-书签）
const bookmarkList = ref([
  { id: 1, title: '第1章 初入九界', page: 1 },
  { id: 2, title: '第2章 玄铁认主', page: 2 },
  { id: 3, title: '第3章 秘境试炼', page: 3 },
  { id: 4, title: '第4章 九界传闻', page: 4 },
  { id: 5, title: '第5章 初入九界', page: 5 },
  { id: 6, title: '第6章 宗门之争', page: 6 },
  { id: 7, title: '第7章 剑鸣九霄', page: 7 },
  { id: 8, title: '第8章 惊变突生', page: 8 },
  { id: 9, title: '第9章 意外收获', page: 9 },
  { id: 10, title: '第10章 闭关突破', page: 10 },
  { id: 11, title: '第11章 重出江湖', page: 11 },
  { id: 12, title: '第12章 故人重逢', page: 12 },
  { id: 13, title: '第13章 阴谋浮现', page: 13 },
  { id: 14, title: '第14章 智破迷局', page: 14 },
  { id: 15, title: '第15章 强敌来袭', page: 15 },
  { id: 16, title: '第16章 生死一战', page: 16 },
  { id: 17, title: '第17章 绝境反击', page: 17 },
  { id: 18, title: '第18章 玄铁剑鸣', page: 18 },
  { id: 19, title: '第19章 九界秘辛', page: 19 },
  { id: 20, title: '第20章 独尊之路', page: 20 }
])
const novelName = ref('《九界独尊》')
const author = ref('风笑天')
const coverImage = ref('/static/novel-cover.jpg') // 假设项目static目录有封面图
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
const showFooterBar = ref(false)
const showSettingPanel = ref(false)
const lightness = ref(0.5)
const isKeepLight = ref(false)
const chapterSectionArray = ref(['章节 1', '章节 2', '章节 3'])
const currentChapterSectionIndex = ref(0)
const currentChapterSection = ref([
  { id: 1, title: '章节 1' },
  { id: 2, title: '章节 2' },
  { id: 3, title: '章节 3' },
  { id: 4, title: '章节 4' },
  { id: 5, title: '章节 5' },
  { id: 6, title: '章节 6' },
  { id: 7, title: '章节 7' },
  { id: 8, title: '章节 8' },
  { id: 9, title: '章节 9' },
  { id: 10, title: '章节 10' },
  { id: 11, title: '章节 11' },
  { id: 12, title: '章节 12' },
  { id: 13, title: '章节 13' },
  { id: 14, title: '章节 14' },
  { id: 15, title: '章节 15' },
  { id: 16, title: '章节 16' },
  { id: 17, title: '章节 17' },
  { id: 18, title: '章节 18' },
  { id: 19, title: '章节 19' },
  { id: 20, title: '章节 20' },
  { id: 21, title: '章节 21' },
  { id: 22, title: '章节 22' },
  { id: 23, title: '章节 23' },
  { id: 24, title: '章节 24' },
  { id: 25, title: '章节 25' },
  { id: 26, title: '章节 26' },
  { id: 27, title: '章节 27' },
  { id: 28, title: '章节 28' },
  { id: 29, title: '章节 29' },
  { id: 30, title: '章节 30' },
  { id: 31, title: '章节 31' },
  { id: 32, title: '章节 32' },
  { id: 33, title: '章节 33' },
  { id: 34, title: '章节 34' },
  { id: 35, title: '章节 35' },
  { id: 36, title: '章节 36' },
  { id: 37, title: '章节 37' },
  { id: 38, title: '章节 38' },
  { id: 39, title: '章节 39' },
  { id: 40, title: '章节 40' }
])
const CHAPTER_SECTION_COUNT = 1
const showDirectory = ref(false)

// 方法实现
const onPageClick = () => {
  showFooterBar.value = !showFooterBar.value
}

const gotoTargeChapter = (index: number) => {
  currentPageIndex.value = index
}

// 切换黑夜和白天模式
const toggleNightOrDay = () => {
  isNightMode.value = !isNightMode.value
  if (isNightMode.value) {
    changeBackgroundColor(4)
  } else {
    changeBackgroundColor(0)
  }
}

// 切换设置面板显示状态
const toggleSettingPanel = () => {
  showSettingPanel.value = !showSettingPanel.value
}

const toggleCategoryList = () => {
  showDirectory.value = !showDirectory.value
}

const gotoSourcePage = (id: number) => {
  console.log(`跳转到换源页面，源 ID: ${id}`)
}

// 修改屏幕亮度
const changeLightNess = (e: any) => {
  lightness.value = e.detail.value
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
  uni.setKeepScreenOn({
    keepScreenOn: isKeepLight.value
  })
}

const changeFontSize = (e: any) => {
  chapterFontSize.value = e.detail.value
}

const chapterSectionArrayChange = (e: any) => {
  currentChapterSectionIndex.value = e.detail.value
}

const gotoTargeChapterFromItem = (item: any, index: number) => {
  currentPageIndex.value =
    currentChapterSectionIndex.value * CHAPTER_SECTION_COUNT + index
}
</script>

<style lang="scss" scoped>
.nightMode {
  background: #333;
 
  .chapter-content {
    color: #777;
  }

}
</style>

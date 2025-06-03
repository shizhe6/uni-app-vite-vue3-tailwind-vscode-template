<template>
  <view class="flex flex-col h-screen">
    <!-- 搜索框 -->
    <view
      class="h-[40px] flex items-end justify-center fixed w-full z-1000 bg-white px-4">
      <uni-easyinput
        prefixIcon="search"
        placeholder="请输入搜索关键词"
        v-model="keyword"
        @confirm="handleSearch"></uni-easyinput>
    </view>

    <!-- 滚动内容 -->
    <scroll-view
      class="flex-1 flex flex-col mt-[40px] overflow-hidden"
      scroll-y>
      <!-- 搜索历史 -->
      <view class="h-auto mb-4 my-4">
        <view class="flex justify-between items-center px-8">
          <text class="title text-7 font-bold">搜索历史</text>
          <view @click="toggleShowAll = !toggleShowAll">
            <text>{{ toggleShowAll ? '收起 ˄' : '展开 ˅' }}</text>
          </view>
        </view>
        <!-- 历史列表 -->
        <view class="flex flex-wrap gap-5 p-5">
          <uni-tag
            v-for="(item, index) in toggleShowAll
              ? searchHistory
              : searchHistory.slice(0, 12)"
            :key="index"
            :text="item"
            :inverted="true"
            @click="searchFromHistory(item)" />
        </view>
      </view>

      <!-- 热搜榜单 -->
      <view class="flex-1 overflow-y-auto">
        <scroll-view scroll-x class="w-full whitespace-nowrap">
          <view class="inline-flex">
            <view
              v-for="(list, index) in hotSearchLists"
              :key="index"
              class="w-52 m-4 p-4 rank-backgroud-color rounded-lg">
              <!-- 推荐榜单名称 -->
              <view class="flex items-center mb-5">
                <text class="font-bold pl-2.5 mr-2.5">
                  {{ list.title }}
                </text>
                <uni-icons type="right" size="14" color="#999" />
              </view>
              <!-- 推荐榜单内容 -->
              <view class="flex flex-col gap-5">
                <view
                  v-for="(item, idx) in list.items"
                  :key="idx"
                  class="flex flex-row items-center py-2.5"
                  @click="handleHotSearch(item)">
                  <!-- 排名 -->
                  <text class="w-10">
                    {{ idx + 1 }}
                  </text>
                  <!-- 标题 -->
                  <view class="flex flex-column">
                    <text>
                      {{ item.name }}
                    </text>
                    <text>
                      {{ item.heat }}
                    </text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// toggleShowAll
const toggleShowAll = ref(false)

const keyword = ref('')
const searchHistory = ref([
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情',
  '科幻未来',
  '玄幻小说',
  '都市言情'
])
const hotSearchLists = ref([
  {
    title: '番茄热搜榜',
    items: [
      { order: 1, name: '重生之逆袭人生', heat: '256万' },
      { order: 2, name: '霸道总裁爱上我', heat: '198万' },
      { order: 3, name: '神医弃妃要逆天', heat: '187万' },
      { order: 4, name: '末世重生之涅槃', heat: '175万' },
      { order: 5, name: '王爷的替嫁医妃', heat: '168万' },
      { order: 6, name: '团宠小公主驾到', heat: '155万' },
      { order: 7, name: '影帝的隐婚娇妻', heat: '142万' },
      { order: 8, name: '穿书后我成团宠', heat: '135万' },
      { order: 9, name: '学霸的科技帝国', heat: '128万' },
      { order: 10, name: '风水相师在都市', heat: '118万' }
    ]
  },
  {
    title: '热搜短剧榜',
    items: [
      { order: 1, name: '王妃今天又跑了', heat: '189万' },
      { order: 2, name: '校花的贴身高手', heat: '176万' },
      { order: 3, name: '总裁的替身前妻', heat: '165万' },
      { order: 4, name: '萌宝来袭爹地快跑', heat: '158万' },
      { order: 5, name: '神医毒妃狠嚣张', heat: '149万' },
      { order: 6, name: '摄政王的心尖宠', heat: '137万' },
      { order: 7, name: '将军夫人要翻身', heat: '129万' },
      { order: 8, name: '腹黑世子俏医妃', heat: '122万' },
      { order: 9, name: '冷王盛宠医妃狂', heat: '115万' },
      { order: 10, name: '穿书后我成了反派', heat: '108万' }
    ]
  },
  {
    title: '热搜漫画榜',
    items: [
      { order: 1, name: '斗破苍穹', heat: '342万' },
      { order: 2, name: '一人之下', heat: '289万' },
      { order: 3, name: '全职高手', heat: '275万' },
      { order: 4, name: '狐妖小红娘', heat: '262万' },
      { order: 5, name: '镇魂街', heat: '248万' },
      { order: 6, name: '偷星九月天', heat: '235万' },
      { order: 7, name: '斗罗大陆', heat: '221万' },
      { order: 8, name: '火凤燎原', heat: '208万' },
      { order: 9, name: '天行九歌', heat: '195万' },
      { order: 10, name: '秦时明月', heat: '182万' }
    ]
  }
])

// showHistoryList

const handleSearch = () => {
  if (!keyword.value) return
  // 实际搜索逻辑
}

const clearHistory = () => {
  searchHistory.value = []
}

const searchFromHistory = (text: string) => {
  keyword.value = text
  handleSearch()
}

const handleHotSearch = (item: any) => {
  // 处理热搜点击
}

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

//设置标题为空
onShow(() => {})
</script>

<style lang="scss">
.rank-backgroud-color {
  background-color: #ebb6b6;

  border: 1px solid #e61d1d;
}
</style>

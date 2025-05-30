<template>
  <view
    class="viewport"
    :style="{ background: backgroundColors[parseInt(query.colorIndex)] }">
    <view
      class="comment-item"
      v-for="(comment, index) in comments"
      :key="index">
      <image class="avatar" :src="comment?.avatar" />
      <view class="content">
        <view class="header">
          <view class="info">
            <text class="name">{{ comment.userName }}</text>
            <text class="time">{{ comment.createTime }}</text>
          </view>

          <view class="like" @click="toggleLike(index)">
            <uni-icons
              :type="comment.liked ? 'hand-up-filled' : 'hand-up'"
              size="30"></uni-icons>
            <text class="like-count">{{ comment.likeCount }}</text>
          </view>
        </view>

        <text class="text">{{ comment.chartContent }}</text>

        <view class="actions">
          <text class="reply" @click="showReplies()" v-if="comment.replies > 0">
            ——查看共{{ comment.replies }}条回复>
          </text>
        </view>
      </view>
    </view>
    <view class="input-container">
      <textarea
        class="input-box"
        :class="{ expanded: isExpanded }"
        placeholder="输入评论..."
        v-model="comment"
        @focus="expandInput"></textarea>
      <uni-icons
        class="send-icon"
        type="paperplane"
        size="24"
        @click="sendComment"></uni-icons>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// 接收页面参数
const query = defineProps<{
  id: number
  colorIndex: string
}>()

/** 请求结果 */
export type ChartItem = {
  id: number
  avatar: string
  userName: string
  createTime: string
  chartContent: string
  liked: number
  likeCount: number
  replies: number
  poemId: number
}

export type PoemChartsEntity = {
  chartContent: string
  poemId: number
  liked: number
}
/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  current?: number
  /** 页大小：默认值为 10 */
  size?: number
}
// 背景色数组
const backgroundColors = [
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)'
]
const isLoading = ref(false)
// 页面加载完成后执行
onLoad(async () => {
  isLoading.value = true
  await queryChartsByPoemIdData()
  isLoading.value = false
})

//查询评论-分页查询
const queryChartsByPoemIdData = async () => {
  isLoading.value = true

  comments.value = getChartsByPoemIdAPI()

  isLoading.value = false
}

// getChartsByPoemIdAPI
const getChartsByPoemIdAPI = (): ChartItem[] => {
  // 生成假数据
  const fakeData = [
    {
      id: 1,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User1',
      createTime: '2024-01-01',
      chartContent: '内容1',
      liked: 0,
      likeCount: 10,
      replies: 2,
      poemId: 1
    },
    {
      id: 2,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User2',
      createTime: '2024-01-02',
      chartContent: '内容2',
      liked: 1,
      likeCount: 20,
      replies: 3,
      poemId: 2
    },
    {
      id: 3,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User3',
      createTime: '2024-01-03',
      chartContent: '内容3',
      liked: 0,
      likeCount: 30,
      replies: 4,
      poemId: 3
    },
    {
      id: 4,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User4',
      createTime: '2024-01-04',
      chartContent: '内容4',
      liked: 1,
      likeCount: 40,
      replies: 5,
      poemId: 4
    },
    {
      id: 5,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User5',
      createTime: '2024-01-05',
      chartContent: '内容5',
      liked: 0,
      likeCount: 50,
      replies: 6,
      poemId: 5
    },
    {
      id: 6,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User6',
      createTime: '2024-01-06',
      chartContent: '内容6',
      liked: 1,
      likeCount: 60,
      replies: 7,
      poemId: 6
    },
    {
      id: 7,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User7',
      createTime: '2024-01-07',
      chartContent: '内容7',
      liked: 0,
      likeCount: 70,
      replies: 8,
      poemId: 7
    },
    {
      id: 8,
      avatar: 'avatar8.png',
      userName: 'User8',
      createTime: '2024-01-08',
      chartContent: '内容8',
      liked: 1,
      likeCount: 80,
      replies: 9,
      poemId: 8
    },
    {
      id: 9,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User9',
      createTime: '2024-01-09',
      chartContent: '内容9',
      liked: 0,
      likeCount: 90,
      replies: 10,
      poemId: 9
    },
    {
      id: 10,
      avatar: `https://picsum.photos/200/300?random=10`,
      userName: 'User10',
      createTime: '2024-01-10',
      chartContent: '内容10',
      liked: 1,
      likeCount: 100,
      replies: 11,
      poemId: 10
    }
  ]
  return fakeData
}

// 定义comments对象类型ChartItem，引入charts.d.ts文件
const comments = ref<ChartItem[]>([])

// 点赞
const toggleLike = (index: number) => {
  const comment = comments.value[index]
  if (comment.liked == 1) {
    comment.likeCount--
    comment.liked = 2
  } else {
    comment.likeCount++
    comment.liked = 1
  }
}

// 跳转到回复页面
const showReplies = () => {
  uni.navigateTo({
    url:
      '/pages/poem/components/replyChart?colorIndex=' +
      query.colorIndex +
      '&id=' +
      query.id
  })
}

const isExpanded = ref(false)
const expandInput = () => {
  isExpanded.value = true
}

const comment = ref('')
const sendComment = async () => {
  //构建一个ChartItem对象
  let newComment: PoemChartsEntity = {
    poemId: query.id,
    chartContent: comment.value,
    liked: 1
  }
  // await savePoemChart(newComment)

  //刷新页面，重新查询评论
  await queryChartsByPoemIdData()

  // 收起输入框
  isExpanded.value = false
  //刷新页面
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
  //清空输入框
  comment.value = ''
}
</script>

<style lang="scss">
.viewport {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 20px;
}

.comment-item {
  display: flex;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.content {
  flex: 1;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .info {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: bold;
        margin-right: 10px;
      }

      .time {
        color: #999;
        font-size: 12px;
      }
    }

    .like {
      right: 0px;
      margin-right: 10px;
      color: #999;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }
  }
}

.text {
  margin: 5px 0;
  display: block;
}

.actions {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
}

.replies {
  margin-top: 10px;
  padding-left: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
}

.reply-item {
  display: flex;
  margin-bottom: 10px;
}

.reply-item .avatar {
  width: 30px;
  height: 30px;
}

.reply-item .content {
  margin-left: 10px;
}

.reply-item .name {
  font-weight: bold;
  font-size: 12px;
}

.reply-item .time {
  color: #999;
  font-size: 10px;
}

.reply-item .text {
  font-size: 12px;
  color: #666;
}

.like,
.reply {
  margin-right: 10px;
  color: #007aff;
  cursor: pointer;
}

.reply-input {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.reply-button {
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #007aff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
}

.input-box {
  flex: 1;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  transition: all 0.3s ease;
}

.input-box.expanded {
  height: 100px;
}

.send-icon {
  margin-left: 10px;
  color: #007aff;
  cursor: pointer;
}
</style>

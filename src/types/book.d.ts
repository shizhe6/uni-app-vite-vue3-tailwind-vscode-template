export type BookMarkItem = {
  id: number
  title: string
  page: number
}

export type ChapterNodesItem = {
  type?: string
  text?: string
  name?: string
}

// 章节
export type ChapterItem = {
  id: number
  title: string
}

export type BookItem = {
  id: number
  // 排名
  rank?: number
  // 名称
  name?: string
  // 作者
  author?: string
  // 热度
  popularity?: string
  // 评分
  score?: number
  // 简介
  description?: string
  // 排名
  sortNumber?: number
  // 图片
  image?: string
  //单一标签
  tagOne?: string
  //状态
  status?: string
  //热度值
  hot?: string
  // 标签列表
  tagList?: string[]
  // 未读章节
  unread?: number
  // 更新时间
  lastUpdate?: string
  // 最新章节
  latestChapter?: string
  // 总章节数
  totalChapters?: number
}

// 段落数据
interface ParagraphItem {
  id: number
  name: string
  content: string
  charts: any[]
}

export type ChartItem = {
  id: number
  userName: string
  content: string
  time: string
  likeCount: number
  unLikeCount: number
  isLike: boolean
}

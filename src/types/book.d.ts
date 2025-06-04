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
  rank?: number
  name?: string
  genre?: string
  author?: string
  popularity?: string
  score?: number
  description?: string
  sortNumber?: number
  cover?: string
  type?: string
  status?: string
  hot?: string
  tagList?: string[]
}

export type RankListItem = {
  title: string
  books: BookItem[]
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

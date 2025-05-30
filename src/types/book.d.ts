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
  rank?: number
  cover: string
  name: string
  genre?: string
  popularity?: string
  description?: string
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

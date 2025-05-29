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

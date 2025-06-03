// 搜索历史
export type SearchHistoryItem = {
  id: number
  name: string
}

// 热门榜单
export type HotItem = {
  id: number
  title: string
  subItems: {
    id?: number
    order: number
    name: string
    heat: string
  }[]
}

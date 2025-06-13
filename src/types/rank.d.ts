import { BookItem } from './book'

export type PrimaryRankItem = {
  id: number
  name: string
  subItems: SecondaryRankItem[]
}

export type SecondaryRankItem = {
  id: number
  name: string
}

/**
 * 排行榜列表项
 */
export type RankListItem = {
  title: string
  books: BookItem[]
}

export type SearchParams = {
  primaryId: number
  secondaryId: number
}

// 分类数据
export type CategoryItem = {
  id: number
  name: string
  children?: CategoryItem[]
}

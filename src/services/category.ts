import { BookItem } from '@/types/book'
import { CategoryItem } from '@/types/category'
import { PrimaryRankItem, SecondaryRankItem } from '@/types/rank'

/**
 *  查询一级分类列表和二级分类列表
 * @returns 一级分类列表和二级分类列表
 */
export const initCategoryListAPI = (): CategoryItem[] => {
  // 获取分类数据方法
  const categoryNames = [
    '历史',
    '文学经典',
    '影视小说',
    '精品小说',
    '社会文化',
    '心理',
    '个人成长',
    '经历管理',
    '艺术',
    '生活百科',
    '养生健康',
    '玄幻',
    '科幻',
    '都市',
    '诸天万界'
  ]
  return [
    {
      id: 1,
      name: '男生',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 2,
      name: '女生',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 3,
      name: '出版',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 4,
      name: '生活',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 5,
      name: '科技',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 6,
      name: '文化',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 7,
      name: '教育',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 8,
      name: '金融',
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    }
  ]
}

/**
 *  查询一级分类列表和二级分类列表
 * @returns 一级分类列表和二级分类列表
 */
export const initThreeCategoryListAPI = (
  categoryId: number
): CategoryItem[] => {
  // 获取分类数据方法
  const categoryNames = [
    '历史',
    '文学经典',
    '影视小说',
    '精品小说',
    '社会文化',
    '心理',
    '个人成长',
    '经历管理',
    '艺术',
    '生活百科',
    '养生健康',
    '玄幻',
    '科幻',
    '都市',
    '诸天万界'
  ]
  return [
    {
      id: 1,
      name: categoryNames[categoryId],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 2,
      name: categoryNames[categoryId + 1],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 3,
      name: categoryNames[categoryId + 2],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 4,
      name: categoryNames[categoryId + 4],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 5,
      name: categoryNames[categoryId + 5],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 6,
      name: categoryNames[categoryId + 6],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 7,
      name: categoryNames[categoryId + 7],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    }
  ]
}

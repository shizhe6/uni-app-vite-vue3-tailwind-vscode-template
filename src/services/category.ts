import { BookItem } from '@/types/book'
import { CategoryItem } from '@/types/category'

/**
 *  查询一级分类列表和二级分类列表
 * @returns 一级分类列表和二级分类列表
 */
export const queryOneTwoCategoryListAPI = (): CategoryItem[] => {
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
      level: 1,
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        level: 2,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 2,
      name: '女生',
      level: 1,
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        level: 2,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 3,
      name: '出版',
      level: 1,
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        level: 2,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 4,
      name: '生活',
      level: 1,
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        level: 2,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 5,
      name: '科技',
      level: 1,
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        level: 2,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 6,
      name: '文化',
      level: 1,
      children: Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        level: 2,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    }
  ]
}

/**
 *  查询一级分类列表和二级分类列表
 * @param categoryId 一级分类id
 * @returns 一级分类列表和二级分类列表
 */
export const queryTwoThreeCategoryListAPI = (
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
      level: 2,
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 2,
      level: 2,
      name: categoryNames[categoryId + 1],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 3,
      level: 2,
      name: categoryNames[categoryId + 2],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 4,
      level: 2,
      name: categoryNames[categoryId + 4],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 5,
      level: 2,
      name: categoryNames[categoryId + 5],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 6,
      level: 2,
      name: categoryNames[categoryId + 6],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    },
    {
      id: 7,
      level: 2,
      name: categoryNames[categoryId + 7],
      children: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        level: 3,
        name: categoryNames[index % categoryNames.length],
        children: []
      }))
    }
  ]
}

/**
 * 根据搜索名称查询书籍
 * @param searchKeyword 搜索名称
 * @returns 书籍列表
 */
export const queryBookBySearchKeywordAPI = (
  searchKeyword: string
): BookItem[] => {
  return [
    {
      id: 1,
      image: 'https://picsum.photos/200/300?random=1',
      name: '三体：死神永生三体：死神永生',
      author: '刘慈欣',
      score: 3,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300?random=2',
      name: '流浪地球：之我从宝宝巴士开车-去学校好好学习',
      author: '刘慈欣',
      score: 5,
      description:
        '[轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 3,
      image: 'https://picsum.photos/200/300?random=3',
      name: '球状闪电',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 4,
      image: 'https://picsum.photos/200/300?random=4',
      name: '超新星纪元',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    }
  ]
}

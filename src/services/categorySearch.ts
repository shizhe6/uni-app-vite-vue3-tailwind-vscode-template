import { BookItem } from '@/types/book'
import { CategorySearchParams } from '@/types/categorySearch'
import { PrimaryRankItem, SecondaryRankItem } from '@/types/rank'
import { HotItem, SearchHistoryItem } from '@/types/search'

/**搜索条件：标签
 * @returns
 */
export const initQueryTagAPI = (): string[] => {
  return [
    '玄幻',
    '奇幻',
    '武侠',
    '仙侠',
    '都市',
    '历史',
    '军事',
    '游戏',
    '科幻',
    '灵异',
    '二次元',
    '其他'
  ]
}

/**
 *初始化查询条件：字数
 */

export const initQueryWordCountDataAPI = (): string[] => {
  return [
    '不限',
    '10万字以内',
    '30万字以内',
    '50万字以内',
    '100万字以内',
    '200万字以内',
    '300万字以内'
  ]
}

/**
 * 初始化查询条件：状态
 */
export const initQueryStatusDataAPI = (): string[] => {
  return [
    '不限',
    '完结',
    '半年内完结',
    '连载中',
    '3个月内完结',
    '6个月内完结',
    '1年内完结',
    '半年内完结',
    '连载中',
    '3个月内完结',
    '6个月内完结'
  ]
}

/**
 * 初始化查询条件：类型
 * @returns
 */

export const initQueryTypeDataAPI = (): string[] => {
  return ['综合', '新书', '高分', '字数']
}

/**
 * 分类查询书籍
 * @param pageNum
 */
export const initBookDataAPI = (params: CategorySearchParams): BookItem[] => {
  return [
    {
      id: 1,
      cover: 'https://picsum.photos/200/300?random=1',
      name: '三体：死神永生三体：死神永生',
      author: '刘慈欣',
      score: 3,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 2,
      cover: 'https://picsum.photos/200/300?random=2',
      name: '流浪地球：之我从宝宝巴士开车-去学校好好学习',
      author: '刘慈欣',
      score: 5,
      description:
        '[轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 3,
      cover: 'https://picsum.photos/200/300?random=3',
      name: '球状闪电',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 4,
      cover: 'https://picsum.photos/200/300?random=4',
      name: '超新星纪元',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      cover: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    }
  ]
}
/**
 * 分类查询书籍
 * @param pageNum
 */
export const querySearchBookAPI = (): BookItem[] => {
  return [
    {
      id: 1,
      cover: 'https://picsum.photos/200/300?random=1',
      name: '三体：死神永生三体：死神永生',
      author: '刘慈欣',
      score: 3,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 2,
      cover: 'https://picsum.photos/200/300?random=2',
      name: '流浪地球：之我从宝宝巴士开车-去学校好好学习',
      author: '刘慈欣',
      score: 5,
      description:
        '[轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 3,
      cover: 'https://picsum.photos/200/300?random=3',
      name: '球状闪电',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 4,
      cover: 'https://picsum.photos/200/300?random=4',
      name: '超新星纪元',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      cover: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      score: 5,
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    }
  ]
}

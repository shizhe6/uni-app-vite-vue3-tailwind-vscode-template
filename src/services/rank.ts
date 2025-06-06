import { BookItem } from '@/types/book'
import { PageParams, PageResult } from '@/types/global'
import { PrimaryRankItem, SearchParams } from '@/types/rank'

/**
 *查询一级分类列表和二级分类列表
 * @returns 一级分类列表和二级分类列表
 */
export const initPrimaryListAPI = (): PrimaryRankItem[] => {
  return [
    {
      id: 1,
      name: '全部',
      subItems: [
        { id: 1, name: '推荐棒' },
        { id: 2, name: '新书榜' },
        { id: 3, name: '畅销榜' }
      ]
    },
    {
      id: 2,
      name: '玄幻',
      subItems: [
        { id: 1, name: '战力榜' },
        { id: 2, name: '更新榜' },
        { id: 3, name: '完本榜' }
      ]
    },
    {
      id: 3,
      name: '言情',
      subItems: [
        { id: 1, name: '人气榜' },
        { id: 2, name: '完结榜' },
        { id: 3, name: '新书榜' }
      ]
    },
    {
      id: 4,
      name: '历史',
      subItems: [
        { id: 1, name: '古风榜' },
        { id: 2, name: '穿越榜' },
        { id: 3, name: '架空榜' }
      ]
    },
    {
      id: 5,
      name: '悬疑',
      subItems: [
        { id: 1, name: '悬疑榜' },
        { id: 2, name: '推理榜' },
        { id: 3, name: '推理榜' }
      ]
    },
    {
      id: 6,
      name: '科幻',
      subItems: [
        { id: 1, name: '科幻榜' },
        { id: 2, name: '科幻榜' },
        { id: 3, name: '科幻榜' }
      ]
    },
    {
      id: 7,
      name: '都市',
      subItems: [
        { id: 1, name: '都市榜' },
        { id: 2, name: '都市榜' },
        { id: 3, name: '都市榜' }
      ]
    },
    {
      id: 8,
      name: '职场',
      subItems: [
        { id: 1, name: '职场榜' },
        { id: 2, name: '职场榜' },
        { id: 3, name: '职场榜' }
      ]
    },
    {
      id: 9,
      name: '玄幻',
      subItems: [
        { id: 1, name: '玄幻榜' },
        { id: 2, name: '玄幻榜' },
        { id: 3, name: '玄幻榜' }
      ]
    }
  ]
}

/**
 *  查询排行榜列表
 * @param primaryId 一级分类id
 * @param secondaryId  二级分类id
 * @returns 排行榜列表，只有30条数据
 */
export const pageQueryBookListByRankAPI = (
  params: SearchParams,
  pageParams: PageParams
): PageResult<BookItem> => {
  const records = [
    {
      id: 1,
      image: 'https://picsum.photos/200/300?random=1',
      name: '三体：死神永生三体：死神永生',
      author: '刘慈欣',
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      hot: '1345.5万',
      score: 5,
      status: '完本',
      tagOne: '诸天万界',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300?random=2',
      name: '流浪地球：之我从宝宝巴士开车-去学校好好学习',
      author: '刘慈欣',
      hot: '1144.5万',
      score: 5,
      status: '连载',
      tagOne: '玄幻脑洞',
      description:
        '[轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主][轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 3,
      image: 'https://picsum.photos/200/300?random=3',
      name: '球状闪电',
      author: '刘慈欣',
      hot: '3256.5万',
      score: 5,
      status: '完本',
      tagOne: '玄幻脑洞',
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 4,
      image: 'https://picsum.photos/200/300?random=4',
      name: '超新星纪元',
      author: '刘慈欣',
      hot: '1000.5万',
      score: 5,
      status: '连载',
      tagOne: '玄幻',
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      hot: '1.5万',
      status: '连载',
      score: 5,
      tagOne: '穿越',
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    },
    {
      id: 6,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      status: '连载',
      hot: '1.5万',
      score: 5,
      tagOne: '系统',
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      tagList: ['玄幻脑洞', '玄幻', '穿越', '系统', '天才', '诸天万界']
    }
  ]

  return {
    records,
    total: records.length,
    current: pageParams.current + 1,
    pages: 100,
    size: pageParams.size
  }
}

/**
 *  初始化推荐榜单数据
 * @param ranktTitle 榜单标题
 * @returns 推荐榜单数据
 */
export const queryRecommendRankListAPI = (ranktTitle: string): BookItem[] => {
  return Array(16)
    .fill({})
    .map((_, i) => ({
      id: i + 1,
      rank: i + 1,
      image: `https://picsum.photos/200/300?random=${i + 1}`,
      name: ranktTitle + `${+i + 1}`,
      author: '刘慈欣',
      description: '[轮回转世]+[平行宇宙]+[无固定女主]',
      hot: '1345.5万',
      score: 5,
      status: '完本',
      tagOne: '玄幻脑洞',
      tagList: ['都市', '言情', '科幻'],
      popularity: (300 + i * 10).toFixed(1)
    }))
}

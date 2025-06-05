import { BookItem } from '@/types/book'
import { PrimaryRankItem } from '@/types/rank'

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
export const initBookListAPI = (
  primaryId: number,
  secondaryId: number
): BookItem[] => {
  // 预定义随机书名池（扩展了更多不同类型的书名）
  const bookNames = [
    // 玄幻类
    '九界独尊：我的玄铁剑',
    '玄幻世界的穿越者',
    '仙途问道：千年剑修',
    '万族争霸：我为帝',
    '九霄之上：逆天成神',
    // 都市类
    '放下个人素质，享无敌人生',
    '都市修仙：从送外卖开始',
    '职场风云：我是金牌总监',
    '都市异能：觉醒读心术',
    '重生之都市巨贾',
    // 历史类
    '历史演义：盛唐风华',
    '王朝争霸：大明崛起',
    '架空穿越：回到贞观',
    '清史迷踪：探秘紫禁城',
    '宋末风云：抗元奇侠',
    // 言情类
    '现代言情：先婚后爱',
    '都市甜宠：总裁的小娇妻',
    '职场婚姻：双向奔赴的幸福',
    '校园初恋：那年樱花雨',
    '暗恋成真：藏了十年的秘密',
    // 科幻类
    '星际冒险：未知星域',
    '未来科技：机械飞升',
    '太空殖民：火星新家园',
    '平行宇宙：另一个我',
    '星际战争：银河守护者'
  ]

  return Array.from({ length: 30 }, (_, i) => ({
    id: primaryId * 1000 + secondaryId * 100 + i, // 生成唯一ID
    sortNumber: i + 1, // 排序号从1开始
    cover: `https://picsum.photos/200/300?n=${i + primaryId * 100 + secondaryId}`,
    name: bookNames[Math.floor(Math.random() * bookNames.length)], // 随机书名（使用扩展后的书名池）
    type: [
      '玄幻',
      '言情',
      '历史' // 根据一级分类显示类型
    ][primaryId % 3],
    status: [
      ['连载', '完本'], // 二级分类0-1对应不同状态比例
      ['热更', '完结'],
      ['更新', '全本']
    ][secondaryId % 3][i % 2],
    hot: `${Math.floor(Math.random() * (10000 + secondaryId * 500))}万热度`
  }))
}


/**
 *  初始化推荐榜单数据
 * @param ranktTitle 榜单标题
 * @returns 推荐榜单数据
 */
 export const queryRecommendRankListAPI = (ranktTitle: string): BookItem[] => {
  return  Array(16)
  .fill({})
  .map((_, i) => ({
    id: i + 1,
    rank: i + 1,
    cover: `https://picsum.photos/200/300?random=${i + 1}`,
    name: ranktTitle+`${+i + 1}`,
    genre: ['都市', '言情', '科幻'][i % 3],
    popularity: (300 + i * 10).toFixed(1)
  }))
}
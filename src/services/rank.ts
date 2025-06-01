import { BookItem } from '@/types/book'
import {  PrimaryRankItem, SecondaryRankItem } from '@/types/rank'

/**
 *
 * @returns 书签列表
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

export const initSecondaryListAPI = (id: number): SecondaryRankItem[] => {
  return [
    { id: 1, name: '推荐棒' },
    { id: 2, name: '新书榜' },
    { id: 3, name: '畅销榜' }
  ]
}

export const initBookListAPI = (
  primaryId: number,
  secondaryId: number
): BookItem[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: primaryId * 1000 + secondaryId * 100 + i, // 生成唯一ID
    sortNumber: i + 1, // 排序号从1开始
    cover: `https://picsum.photos/200/300?n=${i + primaryId * 100 + secondaryId}`,
    name: `${
      // 根据一级分类显示不同书名系列
      [
        ['玄幻经典', '武侠风云', '仙侠奇缘'],
        ['现代言情', '都市甜宠', '职场婚姻'],
        ['历史演义', '王朝争霸', '架空穿越']
      ][primaryId % 3][i % 3]
    }`,
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

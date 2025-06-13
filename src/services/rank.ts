import { BookItem } from '@/types/book'

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
      name: ranktTitle + `${+i + 1}` + '你是一个小可爱,我是你的小秘密',
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

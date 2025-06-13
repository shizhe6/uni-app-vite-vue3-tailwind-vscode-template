import { BookItem } from '@/types/book'
import { PageParams, PageResult } from '@/types/global'
// 预定义随机书名池
const bookNames = [
  '放下个人素质，享无敌人生',
  '九界独尊：我的玄铁剑',
  '都市修仙：从送外卖开始',
  '玄幻世界的穿越者',
  '星际冒险：未知星域',
  '都市生活的魔法世界',
  '穿越时空：探索未知世界',
  '魔法世界的探索者',
  '都市生活的魔法世界',
  '穿越时空：探索未知世界',
  '魔法世界的探索者'
]
/**
 *
 * @param sourceType 来源类型： 推荐  经典  知识
 * @returns 推荐列表
 *
 */
export const pageQueryRecommendListAPI = (
  sourceType: string,
  pageParams: PageParams
): PageResult<BookItem> => {
  // 生成12条随机数据（原数组长度为12）
  const records = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1, // 唯一ID（原代码中id重复，现修正）
    image: `https://picsum.photos/200/300?random=${i + Math.random().toFixed(2)}`, // 随机封面（添加随机数避免重复）
    name:
      pageParams.current +
      bookNames[Math.floor(Math.random() * bookNames.length)], // 随机书名
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来'
  }))

  return {
    records,
    total: records.length,
    current: pageParams.current + 1,
    pages: 100,
    size: pageParams.size
  }
}

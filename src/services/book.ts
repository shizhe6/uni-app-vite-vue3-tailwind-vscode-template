import {
  BookItem,
  BookMarkItem,
  ChapterItem,
  ParagraphItem,
  RankListItem
} from '@/types/book'

/**
 *
 * @param bookId 书籍id
 * @returns 书签列表
 */
export const initBookMarkItemListAPI = (
  currentBookId: number
): BookMarkItem[] => {
  return [
    { id: 1, title: '第1章 初入九界', page: 1 },
    { id: 2, title: '第2章 玄铁认主', page: 2 },
    { id: 5, title: '第5章 初入九界', page: 5 },
    { id: 14, title: '第14章 智破迷局', page: 14 },
    { id: 16, title: '第16章 生死一战', page: 16 },
    { id: 17, title: '第17章 绝境反击', page: 17 },
    { id: 19, title: '第19章 九界秘辛', page: 19 },
    { id: 20, title: '第20章 独尊之路', page: 20 }
  ]
}
/**
 *
 * @param currentChapterId  当前章节id
 * @returns 当前章节内容
 */

export const initParagraphItemListAPI = (
  currentChapterId: number
): ParagraphItem[] => {
  return [
    {
      id: 1,
      name: '第1章 浮游',
      content: '大商联邦。',
      charts: [
        {
          id: 1,
          userName: '小飞飞',
          content: '你小子是争不知道啥叫嫩头青啊',
          time: '2024-03-16 12:00:00',
          likeCount: 10,
          unLikeCount: 2,
          isLike: true
        },
        {
          id: 2,
          userName: '小飞飞',
          content: '你小子是争不知道啥叫嫩头青啊',
          time: '2024-03-16 12:00:00',
          likeCount: 10,
          unLikeCount: 2,
          isLike: true
        }
      ]
    },
    {
      id: 2,
      name: '第1章 浮游',
      content: '楚州，星光市，和谐苑小区。',
      charts: [
        {
          id: 1,
          userName: '小飞飞',
          content: '你小子是争不知道啥叫嫩头青啊',
          time: '2024-03-16 12:00:00',
          likeCount: 10,
          unLikeCount: 2,
          isLike: true
        }
      ]
    },
    {
      id: 3,
      name: '第1章 浮游',
      content: '“叮铃铃！”  一阵电话声将床上的季浮游惊醒。',
      charts: []
    },

    {
      id: 4,
      name: '第1章 浮游',
      content: '“差一点！这次，差一点就反杀了！”  他眼中有尚未消散的凌厉。',
      charts: []
    },
    {
      id: 5,
      name: '第1章 浮游',
      content:
        '他眼中有尚未消散的凌厉。  随着电话声持续响起，似乎将他唤回现实，这种凌厉亦渐渐散去。',
      charts: [
        {
          id: 1,
          userName: '小飞飞',
          content: '你小子是争不知道啥叫嫩头青啊',
          time: '2024-03-16 12:00:00',
          likeCount: 10,
          unLikeCount: 2,
          isLike: true
        }
      ]
    },

    {
      id: 6,
      name: '第1章 浮游',
      content:
        '“我想做一个能让大家都喜欢的角色，所以我会努力让大家都喜欢我。”  季浮游的话中，他似乎对自己的选择充满了期待。',
      charts: []
    },
    {
      id: 7,
      name: '第1章 浮游',
      content:
        '“我会努力让大家都喜欢我。”  季浮游的话中，他似乎对自己的选择充满了期待。',
      charts: []
    },
    {
      id: 8,
      name: '第1章 浮游',
      content:
        '穿到和以前差不多的时代背景，偏向未来，却又不多，尤其是阶级更加固化，资本垄断几乎所有行业，封锁了所有上升通道。 ',
      charts: []
    },
    {
      id: 9,
      name: '第1章 浮游',
      content: ' 流量为王，ai盛行的时代，这种能力，早就落时了。 ',
      charts: []
    },
    {
      id: 10,
      name: '第1章 浮游',
      content:
        '收拾好自己，季浮游出了这间租金600的老房子，在楼下骑上新买一个月的电动车朝姐姐季清清发来的地址而去。 ',
      charts: []
    },
    {
      id: 11,
      name: '第1章 浮游',
      content:
        '季浮游抬头，只见足足十几架武装直升机呈先后战术编队，带着一阵轰鸣自城市上空掠过，杀气腾腾朝城外飞去。 ',
      charts: []
    },
    {
      id: 12,
      name: '第1章 浮游',
      content:
        '同时有些意外：“星光市又不是沿海城市、边境城市，这种十几架直升机的场面可不常见。” ',
      charts: []
    },
    {
      id: 13,
      name: '第1章 浮游',
      content: '只要能赚到钱，人人无所不用其极。 ',
      charts: []
    },
    {
      id: 14,
      name: '第1章 浮游',
      content:
        '娱乐大众的网红算是普通人最有希望翻身改命的赛道，涌入者不计其数。 ',
      charts: []
    },
    {
      id: 15,
      name: '第1章 浮游',
      content:
        '妆容未卸，戴着银色圆圈耳环，看上去充满精致都市丽人气质的季清清摇下车窗，头一晃：“后面上车。” ',
      charts: []
    }
  ]
}
/**
 *
 * @param id  书籍id
 * @returns  {ChapterItem[]} 章节列表
 */
export const initChapterItemListAPI = (): ChapterItem[] => {
  return [
    { id: 1, title: '第1章 初入九界' },
    { id: 2, title: '第2章 玄铁认主' },
    { id: 3, title: '第3章 秘境试炼' },
    { id: 4, title: '第4章 九界传闻' },
    { id: 5, title: '第5章 初入九界' },
    { id: 6, title: '第6章 宗门之争' },
    { id: 7, title: '第7章 剑鸣九霄' },
    { id: 8, title: '第8章 惊变突生' },
    { id: 9, title: '第9章 意外收获' },
    { id: 10, title: '第10章 闭关突破' },
    { id: 11, title: '第11章 重出江湖' },
    { id: 12, title: '第12章 故人重逢' },
    { id: 13, title: '第13章 阴谋浮现' },
    { id: 14, title: '第14章 智破迷局' },
    { id: 15, title: '第15章 强敌来袭' },
    { id: 16, title: '第16章 生死一战' },
    { id: 17, title: '第17章 绝境反击' },
    { id: 18, title: '第18章 玄铁剑鸣' },
    { id: 19, title: '第19章 九界秘辛' },
    { id: 20, title: '第20章 独尊之路' }
  ]
}

/**
 *
 * @returns 榜单数据
 *
 */
export const initRankListAPI = (): RankListItem[] => {
  return [
    {
      title: '畅销榜',
      books: Array(16)
        .fill({})
        .map((_, i) => ({
          id: i + 1,
          rank: i + 1,
          cover: `https://picsum.photos/200/300?random=${i + 1}`,
          name: `畅销书籍 ${i + 1}`,
          genre: ['都市', '言情', '科幻'][i % 3],
          popularity: (300 + i * 10).toFixed(1)
        }))
    },
    {
      title: '新书榜',
      books: Array(16)
        .fill({})
        .map((_, i) => ({
          id: i + 1,
          rank: i + 1,
          cover: `https://picsum.photos/200/300?n=${i + 100}`,
          name: `新书推荐 ${i + 1}`,
          genre: ['悬疑', '历史', '奇幻'][i % 3],
          popularity: (200 + i * 15).toFixed(1)
        }))
    },
    {
      title: '人气榜',
      books: Array(16)
        .fill({})
        .map((_, i) => ({
          id: i + 1,
          rank: i + 1,
          cover: `https://picsum.photos/200/300?p=${i + 200}`,
          name: `人气作品 ${i + 1}`,
          genre: ['武侠', '职场', '玄幻'][i % 3],
          popularity: (400 + i * 20).toFixed(1)
        }))
    }
  ]
}
/**
 *
 * @returns 推荐列表
 *
 */
export const initRecommendListAPI = (): BookItem[] => {
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

  // 生成12条随机数据（原数组长度为12）
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1, // 唯一ID（原代码中id重复，现修正）
    cover: `https://picsum.photos/200/300?random=${i + Math.random().toFixed(2)}`, // 随机封面（添加随机数避免重复）
    name: bookNames[Math.floor(Math.random() * bookNames.length)], // 随机书名
    description:
      '帮我写一个html+css的代码，实现20本书，分为5列，4行，左右滑动，切换不同的列，书的排序从第1列到5列，从上到下，你用数字表示，帮我把整体的样式写出来'
  }))
}

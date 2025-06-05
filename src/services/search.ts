import { BookItem } from '@/types/book'
import { PrimaryRankItem, SecondaryRankItem } from '@/types/rank'
import { HotItem, SearchHistoryItem } from '@/types/search'

/**
 * @returns
 */
export const initHotSearchListsAPI = (): HotItem[] => {
  return [
    {
      id: 1,
      title: '番茄热搜榜',
      subItems: [
        { order: 1, name: '重生之逆袭人生', heat: '256万' },
        { order: 2, name: '霸道总裁爱上我', heat: '198万' },
        { order: 3, name: '神医弃妃要逆天', heat: '187万' },
        { order: 4, name: '末世重生之涅槃', heat: '175万' },
        { order: 5, name: '王爷的替嫁医妃', heat: '168万' },
        { order: 6, name: '团宠小公主驾到', heat: '155万' },
        { order: 7, name: '影帝的隐婚娇妻', heat: '142万' },
        { order: 8, name: '穿书后我成团宠', heat: '135万' },
        { order: 9, name: '学霸的科技帝国', heat: '128万' },
        { order: 10, name: '风水相师在都市', heat: '118万' }
      ]
    },
    {
      id: 2,
      title: '热搜短剧榜',
      subItems: [
        { order: 1, name: '王妃今天又跑了', heat: '189万' },
        { order: 2, name: '校花的贴身高手', heat: '176万' },
        { order: 3, name: '总裁的替身前妻', heat: '165万' },
        { order: 4, name: '萌宝来袭爹地快跑', heat: '158万' },
        { order: 5, name: '神医毒妃狠嚣张', heat: '149万' },
        { order: 6, name: '摄政王的心尖宠', heat: '137万' },
        { order: 7, name: '将军夫人要翻身', heat: '129万' },
        { order: 8, name: '腹黑世子俏医妃', heat: '122万' },
        { order: 9, name: '冷王盛宠医妃狂', heat: '115万' },
        { order: 10, name: '穿书后我成了反派', heat: '108万' }
      ]
    },
    {
      id: 3,
      title: '热搜漫画榜',
      subItems: [
        { order: 1, name: '斗破苍穹', heat: '342万' },
        { order: 2, name: '一人之下', heat: '289万' },
        { order: 3, name: '全职高手', heat: '275万' },
        { order: 4, name: '狐妖小红娘', heat: '262万' },
        { order: 5, name: '镇魂街', heat: '248万' },
        { order: 6, name: '偷星九月天', heat: '235万' },
        { order: 7, name: '斗罗大陆', heat: '221万' },
        { order: 8, name: '火凤燎原', heat: '208万' },
        { order: 9, name: '天行九歌', heat: '195万' },
        { order: 10, name: '秦时明月', heat: '182万' }
      ]
    }
  ]
}

// initSearchHistoryAPI
export const initSearchHistoryAPI = (): SearchHistoryItem[] => {
  return [
    { id: 1, name: '重生之逆袭人生' },
    { id: 2, name: '霸道总裁爱上我' },
    { id: 3, name: '神医弃妃要逆天' },
    { id: 4, name: '末世重生之涅槃' },
    { id: 5, name: '王爷的替嫁医妃' },
    { id: 6, name: '团宠小公主驾到' },
    { id: 7, name: '影帝的隐婚娇妻' },
    { id: 8, name: '穿书后我成团宠' },
    { id: 9, name: '学霸的科技帝国' },
    { id: 10, name: '风水相师在都市' },
    { id: 11, name: '王妃今天又跑了' },
    { id: 12, name: '校花的贴身高手' },
    { id: 13, name: '总裁的替身前妻' },
    { id: 14, name: '萌宝来袭爹地快跑' },
    { id: 15, name: '神医毒妃狠嚣张' }
  ]
}

// queryRecommendSearchNameAPI
export const queryRecommendSearchNameAPI = (searchKeyword:string): string[] => {
  return [
    '财务自由，从大学开始',
    '爱上你，就别想离开',
    '我的理想是……',
    '我要成为一个什么样的人',
    '我叫小林，我是谁',
    '我要成为一个什么样的人',
    '我叫小林，我是谁',
    '我的理想是……',
    '我要成为一个什么样的人',
    '我叫小林，我是谁',
    '我要成为一个什么样的人'
  ]
}

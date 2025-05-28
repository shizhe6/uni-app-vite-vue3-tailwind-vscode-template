import { BookMarkItem, ChapterItem, ChapterNodesItem } from '@/types/book'

export const initBookMarkListAPI = (id: number): BookMarkItem[] => {
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

export const initChapterNodesAPI = (id: number): ChapterNodesItem[] => {
  return [
    { type: 'text', text: '  第142章 冲突  跟上他们的身形。', name: '' },
    { name: 'br' },
    { type: 'text', text: '  还偷偷摸摸，故意遮掩气息。' },
    { type: 'text', text: '  他身上携带的恶意，已经昭然若揭！' },
    { name: 'br' },
    { type: 'text', text: '  季浮游thoughts流转。' },
    { type: 'text', text: '  心中瞬间有了决断。' },
    { name: 'br' },
    { type: 'text', text: '  他不想节外生枝得罪周忘川，可现在的问题是……' },
    { type: 'text', text: '  对方已经将主意打到他们身上了！' },
    { name: 'br' },
    { type: 'text', text: '  目的……' },
    { type: 'text', text: '  想渔翁得利？' },
    { type: 'text', text: '  还是其他原因？' },
    { type: 'text', text: '  都不重要了！' },
    { name: 'br' },
    {
      type: 'text',
      text: '  就在这人潜至离季浮游所属雕像不远时，季浮游动了。'
    },
    {
      type: 'text',
      text: '  本就保持着半蹲状态下的他，劲力爆发，浑身气血犹如烘炉运转，提供源源不断的能量灌注全身。'
    },
    { name: 'br' },
    { type: 'text', text: '  与此同时，他长剑刺出，剑意勃发！' },
    {
      type: 'text',
      text: '  大成境界的守真剑意仿佛能撕裂灵魂，瞬间让这位意识到自己暴露的男子脸上涌现出遏制不住的惊恐。'
    },
    { name: 'br' },
    { type: 'text', text: '  “住手……”' },
    { type: 'text', text: '  他张口就要大叫。' },
    { name: 'br' },
    { type: 'text', text: '  可季浮游这一剑来的太快。' },
    { type: 'text', text: '  以幻真无影术藏在一侧，再暴起出手，且剑意勃发。' },
    {
      type: 'text',
      text: '  这种迅如惊雷的一剑，如何是这个体魄估计只有23、24左右的武者所能抵挡？'
    },
    { name: 'br' },
    { type: 'text', text: '  他甚至只能堪堪做出横刀身前的动作……' },
    {
      type: 'text',
      text: '  没等来得及封锁住冷钢剑的进攻轨迹，冷冽的剑锋已经贯穿了他的喉咙，将他接下来的惨叫声全部堵了回去。'
    },
    { name: 'br' },
    { type: 'text', text: '  “嗤！”' },
    { type: 'text', text: '  刺剑、拔剑！' },
    { name: 'br' },
    {
      type: 'text',
      text: '  动作完成的前一秒，季浮游更是左手一击，狠狠打在他心脏位置。'
    },
    { type: 'text', text: '  伤口处即将喷涌而出的鲜血竟是被生生凝滞。' },
    { type: 'text', text: '  仿佛所有血液失去了输送、运转之力，冻结在体内。' },
    { type: 'text', text: '' },
    {
      type: 'text',
      text: '  而后，季浮游抓起这道男子的身躯，一步虚跨，瞬间进入了不远处的祷告室。'
    },
    {
      type: 'text',
      text: '  这个时候，杨开泰亦是听到了外面传来的动静，迅速迎了上来。'
    },
    { name: 'br' },
    { type: 'text', text: '  “队长……”' },
    {
      type: 'text',
      text: '  当看到他手上提来的那道已经化为尸体的身影，眼瞳猛然一缩：“周忘川的人！？”'
    },
    { name: 'br' },
    {
      type: 'text',
      text: '  “偷偷摸摸的跟上来，还特意隐藏气息，你的精神都没感知到吧？般鬼鬼祟祟，目的不用我多说了。”'
    },
    { type: 'text', text: '  季浮游简短的道了一声。' },
    { name: 'br' },
    {
      type: 'text',
      text: '  杨开泰眼尖：“周忘川，好大的胆子，当真以为我们好欺负不成！”'
    },
    { type: 'text', text: '  他看一眼祷告室内那些怪物和人类尸体……' },
    { type: 'text', text: '  这一两公里路上他们就遇到周忘川一行人。' },
    { name: 'br' },
    { type: 'text', text: '  十有八九……' },
    { type: 'text', text: '  那以严松为首的九位狩猎者就是死在他们手上。' },
    { name: 'br' },
    { type: 'text', text: '  季浮游将尸体往里面一丢：“准备一下！”' },
    { type: 'text', text: '  “周忘川那些人……”' },
    {
      type: 'text',
      text: '  “他们敢打我们的主意，就得做好被我们反杀的准备！”'
    },
    { type: 'text', text: '  季浮游直接道：“迎上去！”' },
    { name: 'br' },
    { type: 'text', text: '  “和他们动手？”' },
    { type: 'text', text: '  杨开泰微微一怔。' },
    { type: 'text', text: '  周忘川那一行人可不是弱者。' },
    { type: 'text', text: '  实力怕是丝毫不在他们之下。' },
    { type: 'text', text: '' },
    { type: 'text', text: '  不对！' },
    { type: 'text', text: '  他们有季浮游！' },
    { type: 'text', text: '  季浮游的实力比之他们来高出一个层次！' },
    { type: 'text', text: '' },
    {
      type: 'text',
      text: '  再加上此刻他们已经减员一人，真打起来，他们一方的胜率至少有七八成。'
    },
    { type: 'text', text: '  七八成胜率，那还有什么好怕的？' },
    { type: 'text', text: '' },
    { type: 'text', text: '  “就依队长所说。”' },
    {
      type: 'text',
      text: '  杨开泰重重一点头：“他们中，最厉害的是周忘川和秦舟！其中，秦舟应该有不逊色于小雪的实力，至于周忘川……我可以牵制他一段时间！”'
    },
    { type: 'text', text: '' },
    { type: 'text', text: '  “可以！”' },
    {
      type: 'text',
      text: '  季浮游点了点头：“秦舟我解决，你们四个，对付他们三个，不要求你们战胜他们，至少得确保将他们牵制住，有没有问题？”'
    },
    { type: 'text', text: '' },
    { type: 'text', text: '  “好！”' },
    { type: 'text', text: '  “秦舟和我差不多？要么我去对付？”' },
    { type: 'text', text: '  “听从队长安排。”' },
    { type: 'text', text: '  方栖云、萧寒雪、柳依人纷纷表态。' },
    { type: 'text', text: '' },
    { type: 'text', text: '  当下，六人迅速出了祷告室。' },
    { type: 'text', text: '  直奔那道身影潜伏而来的方向而去。' },
    { type: 'text', text: '' },
    {
      type: 'text',
      text: '  很快，杨开泰、季浮游两人已经感应到了一道探查而来的精神力。'
    },
    { type: 'text', text: '  “在那边！”' },
    { type: 'text', text: '  杨开泰道。' },
    { type: 'text', text: '' },
    {
      type: 'text',
      text: '  不过，似乎是季浮游一行人表现的太过气势汹汹，这种明显有恃无恐的姿态让他们心生忌惮。'
    },
    {
      type: 'text',
      text: '  精神力一接触，周忘川竟是带人转身就走，丝毫没有为自家队员报仇的意思。'
    },
    { type: 'text', text: '' },
    { type: 'text', text: '  “追！”' },
    { type: 'text', text: '  季浮游当即下令，大步流星。' },
    { type: 'text', text: '' },
    { type: 'text', text: '  而一追击，双方的距离渐渐拉开。' },
    { type: 'text', text: '  季浮游、萧寒雪是第一梯队。' },
    { type: 'text', text: '  方栖云、关越是第二梯队。' },
    { type: 'text', text: '  柳依人和杨开泰自然就落入第三梯队了。' },
    { type: 'text', text: '' },
    {
      type: 'text',
      text: '  不过，这种追击持续了数百米后，杨开泰却仿佛意识到了什么：“不对！”'
    },
    {
      type: 'text',
      text: '  他突然道：“如果他们要逃，按理说应该朝反方向逃，可现在……他们逃跑的方向……似乎在将我们往里面引……”'
    },
    { type: 'text', text: '<br>' },
    {
      type: 'br',
      text: '  几乎在杨开泰察觉到这一点的同时，周忘川身上的精神波动猛然积蓄到了极致。'
    },
    {
      type: 'text',
      text: '  下一刻，这些精神力量凝聚一股，仿佛一道划过迷雾的长箭，直往离他们仅百余米的一个大门紧锁的房间射去。'
    }
  ]
}

export const initChapterListAPI = (id: number): ChapterItem[] => {
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

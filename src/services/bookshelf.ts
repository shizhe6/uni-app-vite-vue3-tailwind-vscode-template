import { BookItem } from '@/types/book'

/**
 *
 * @returns 书架中收藏的书籍
 */
export const queryBookShelfAPI = (): BookItem[] => {
  return [
    {
      id: 1,
      image: 'https://picsum.photos/200/300?random=1',
      name: '三体：死神永生三体：死神永生',
      author: '刘慈欣',
      unread: 3,
      lastUpdate: '2天3小时',
      latestChapter: '第201章 二向箔降临',
      totalChapters: 256,
      description: ''
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300?random=2',
      name: '流浪地球',
      author: '刘慈欣',
      unread: 5,
      lastUpdate: '3天2小时',
      latestChapter: '第105章 地球启航',
      totalChapters: 150,
      description: ''
    },
    {
      id: 3,
      image: 'https://picsum.photos/200/300?random=3',
      name: '球状闪电',
      author: '刘慈欣',
      unread: 2,
      lastUpdate: '1天5小时',
      latestChapter: '第87章 宏原子核',
      totalChapters: 120,
      description: ''
    },
    {
      id: 4,
      image: 'https://picsum.photos/200/300?random=4',
      name: '超新星纪元',
      author: '刘慈欣',
      unread: 4,
      lastUpdate: '4天1小时',
      latestChapter: '第130章 新纪元开始',
      totalChapters: 180,
      description: ''
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300?random=7',
      name: '乡村教师',
      author: '刘慈欣',
      unread: 1,
      lastUpdate: '5小时前',
      latestChapter: '第35章 知识的传承',
      totalChapters: 50,
      description: ''
    },
    {
      id: 6,
      image: 'https://picsum.photos/200/300?random=5',
      name: '赡养人类',
      author: '刘慈欣',
      unread: 6,
      lastUpdate: '5天3小时',
      latestChapter: '第98章 文明的碰撞',
      totalChapters: 140,
      description: ''
    },
    {
      id: 7,
      image: 'https://picsum.photos/200/300?random=6',
      name: '诗云',
      author: '刘慈欣',
      unread: 3,
      lastUpdate: '2天4小时',
      latestChapter: '第76章 用诗征服宇宙',
      totalChapters: 110,
      description: ''
    },
    {
      id: 8,
      image: 'https://picsum.photos/200/300?random=7',
      name: '朝闻道',
      author: '刘慈欣',
      unread: 2,
      lastUpdate: '1天6小时',
      latestChapter: '第62章 真理祭坛',
      totalChapters: 90,
      description: ''
    }
  ]
}

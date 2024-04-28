import { IBlogTitleItem } from '../../interfaces/blogSidebar';
import dayjs from 'dayjs';

export const localBlogList: (IBlogTitleItem & {
  content: string;
  author: string;
  create_time: string;
  update_time: string;
})[] = [
  {
    blogId: 'local-1',
    title: '开篇',
    from: 'local',
    create_time: dayjs(1698298863077).format('YYYY-MM-DD HH:mm:ss'),
    update_time: dayjs(1698299863077).format('YYYY-MM-DD HH:mm:ss'),
    author: 'Mint',
    content:
      '从这里开始第一篇吧，以前习惯把个人心得、学习笔记记录到印象笔记中，没有想过自己整一个个人博客，这次趁着空闲，就自己实现一个吧，由于时间问题，这次用的是静态数据，未来将使用nodejs搭建后端服务。23年经历了很多事，尤其是最近，遇到了一件糟心事，心态也发生了一些变化，也成熟起来了，现在的想法除了希望家人健康平安，就是搞钱了，努力赚钱！后续会持续更新本网站，加入更多元素。',
  },
];

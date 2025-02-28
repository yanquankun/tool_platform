import { IBlogItem, BlogFrom } from './blog';
import dayjs from 'dayjs';

export const localBlogList: IBlogItem[] = [
  {
    id: 'local-1',
    title: '开篇',
    timestamp: dayjs(1698298863077).format('YYYY-MM-DD HH:mm:ss'),
    author: 'Mint',
    from: BlogFrom.LOCAL,
    bread: ['写在前面', '开篇'],
    content: [
      'hello,我是闫全堃[Mint]，一个对前端技术充满热情的工程师',
      '欢迎来到我的技术博客！在这里，我将与大家分享我的技术见解、学习心得和项目经验。',
      '我开设这个博客的目的是为了与广大技术爱好者分享我的所思所学。无论你是初学者还是经验丰富的专业人士，我都希望我的博客能为你提供有价值的信息和启发',
      '在这个博客中，我将涵盖前端开发的各个方面，包括但不限于HTML、CSS、JavaScript、框架等。我会发布一些技术教程、项目实践和对行业趋势的分析，希望能够给大家带来启发和帮助。',
      '我非常欢迎大家在阅读过程中提出任何问题、建议或意见。你们的反馈对我来说非常重要，将帮助我改进博客内容，为大家提供更好的阅读体验。',
      '最后，我要衷心感谢每一位阅读这篇文章的你。谢谢你的支持和关注！让我们一起在这个技术的世界里探索、学习、成长！',
      '欢迎加入我的技术分享之旅！',
    ],
  },
];

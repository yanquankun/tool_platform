enum BlogFrom {
  LOCAL = 'local',
  GITHUB = 'github',
  WX = 'wx',
  UNKONE = 'unknow',
}

enum FileType {
  JS = 'js',
  MD = 'md',
  UNKONE = 'unknow',
}

interface IBlogItem {
  id: string;
  title: string;
  from: BlogFrom;
  /** 副标题 */
  subTitle?: string;
  /** 面包屑 */
  bread?: string[];
  /** 原文链接 */
  url?: string;
  /** 引用链接 */
  quoteUrl?: string;
  author?: string;
  /** 文章内容 */
  content?: string | string[];
  /** 发布时间 */
  timestamp?: string;
  fileSuffixName?: FileType;
  thumb_url?: string;
  // github、wx返回文章内容字段补充
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IBlogCategory {
  title: string;
  expand: boolean;
  id: string;
  from: BlogFrom;
  children: IBlogItem[];
}

/** 统一二级标题id */
const SECOND_TITLE_ID = 'second-title';

export { BlogFrom, IBlogItem, IBlogCategory, SECOND_TITLE_ID, FileType };

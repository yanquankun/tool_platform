enum BlogFrom {
  LOCAL = 'local',
  GITHUB = 'github',
  WX = 'wx',
}

enum FileType {
  JS = 'js',
  MD = 'md',
  UNKONE = 'unknow',
}

interface IBlogItem {
  title: string;
  id: string;
  /** 原文链接 */
  url?: string;
  /** 引用链接 */
  quoteUrl?: string;
  author?: string;
  /** 文章内容 */
  content?: string | string[];
  from: BlogFrom;
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
  children: IBlogItem[];
}

/** 统一二级标题id */
const SECOND_TITLE_ID = 'second-title';

export { BlogFrom, IBlogItem, IBlogCategory, SECOND_TITLE_ID, FileType };

enum BlogFrom {
  LOCAL = 'local',
  GITHUB = 'github',
  WX = 'wx',
}

interface IBlogItem {
  title: string;
  id: string;
  author?: string;
  create_time?: string;
  update_time?: string;
  content?: string | string[];
  from: BlogFrom;
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

export { BlogFrom, IBlogItem, IBlogCategory, SECOND_TITLE_ID };

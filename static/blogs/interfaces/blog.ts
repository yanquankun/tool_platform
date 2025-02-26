interface IBlogItem {
  title: string;
  id: string;
}

interface IBlogCategory {
  title: string;
  expand: boolean;
  id: string;
  children: IBlogItem[];
}

/** 统一二级标题id */
const SECOND_TITLE_ID = 'second-title';

export { IBlogItem, IBlogCategory, SECOND_TITLE_ID };

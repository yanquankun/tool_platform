export interface IBlogSideItem {
  blogId: number;
  title: string;
  description: string;
  icon: JSX.Element | null;
}

export interface IBlogArticleItem {
  blogId: number;
  timestamp: string;
  title: string;
  subtitle?: string;
  content: string | number | JSX.Element;
}

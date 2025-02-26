interface IBlogItem {
  title: string;
  id: number;
}

interface IBlogCategory {
  title: string;
  expand: boolean;
  children: IBlogItem[];
}

export { IBlogItem, IBlogCategory };

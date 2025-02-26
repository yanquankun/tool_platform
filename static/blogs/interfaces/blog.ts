interface IBlogItem {
  title: string;
  id: string;
}

interface IBlogCategory {
  title: string;
  expand: boolean;
  children: IBlogItem[];
}

export { IBlogItem, IBlogCategory };

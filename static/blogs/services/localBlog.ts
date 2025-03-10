import { getLocalBlog } from '~shared/apis/static';
import { localBlogList } from '../interfaces/localBlog';
import { IBlogItem } from '../interfaces/blog';

const getLocalBlogList = async (): Promise<IBlogItem[]> => {
  let res;
  try {
    res = await getLocalBlog();
    if (!res?.data?.blog?.length) return localBlogList;
    return res.data.blog;
  } catch (error) {
    return localBlogList;
  }
};

export { getLocalBlogList };

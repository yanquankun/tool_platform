export interface IBlogSideItem {
  blogId: string;
  title: string;
  description: string;
  icon: JSX.Element | null;
}

export interface IWxArticleItem {
  /** 图文消息的标题 */
  title: string;
  /** 图文消息的封面图片素材id（必须是永久mediaID） */
  thumb_media_id?: string;
  /** 是否显示封面，0为false，即不显示，1为true，即显示 */
  show_cover_pic?: 0 | 1;
  /** 作者 */
  author?: string;
  /** 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空 */
  digest?: string;
  /** 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS */
  content?: string | number | JSX.Element;
  /** 图文页的URL，或者，当获取的列表是图片素材列表时，该字段是图片的URL */
  url?: string;
  /** 图文消息的原文地址，即点击“阅读原文”后的URL */
  content_source_url?: string;
  /** 这篇图文消息素材的最后更新时间 */
  update_time?: number | string;
  /** 文件名称 */
  name?: string;
  /** 微信公众号文章id 作为blogId */
  media_id?: string;
  /** 封面图片 */
  thumb_url?: string;
}

export interface IBlogArticleItem extends IWxArticleItem {
  blogId: string;
  from?: 'github' | 'wx';
  path?: string;
  htmlUrl?: string;
  create_time?: number | string;
  subtitle?: string;
  icon?: JSX.Element | null;
  /** 文章分类 group：文章大分类 */
  type?: 'group';
}

export interface IBlogListMap {
  blogList: Array<IBlogArticleItem>;
  /** 该类型的素材的总数 */
  total_count?: number;
  /** 本次调用获取的素材的数量 */
  item_count?: number;
}

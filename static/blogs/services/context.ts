/**
 * 2025-02-27 17:56:40
 * @author Mint.Yan
 * @description context instance pool
 */
import React, { createContext } from 'react';
import { IBlogItem } from '../interfaces/blog';

/** 博客文章内容 */
let BlogContext: React.Context<IBlogItem | null>;

export const getBlogContext = (initial: IBlogItem | null) => {
  if (!BlogContext) BlogContext = createContext(initial);
  return BlogContext;
};

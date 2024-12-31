import { FC, Fragment, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { Image } from 'antd';

const style = {
  p: css`
    color: rgba(0, 0, 0, 0.88);
    font-size: 16px;
  `,
  svg: css`
    vertical-align: text-top,
    margin: 0px 3px;
    `,
  highlight: css`
    background-color: antiquewhite;
  `,
};

export const IntroduceContainer: FC = (): JSX.Element => {
  return (
    <Fragment>
      <h3>个人介绍</h3>
      <p className={style.p}>hi，everybody，这是我的个人网站，未来我将持续迭代该网站。</p>
      <p className={style.p}>
        目前划分了个人介绍、博客板块以及个人github外链地址，同时
        <span className={style.highlight}>
          通过导航栏左上角
          <svg
            className={style.svg}
            width="1em"
            height="1em"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 0h3v3H0V0zm4.5 0h3v3h-3V0zM9 0h3v3H9V0zM0 4.5h3v3H0v-3zm4.503 0h3v3h-3v-3zM9 4.5h3v3H9v-3zM0 9h3v3H0V9zm4.503 0h3v3h-3V9zM9 9h3v3H9V9z"></path>
          </svg>
          按钮可查看我个人的一些项目
        </span>
        ，未来计划是将本站作为一个整合网站，为个人微信、公众号、个人ios|android
        App「Flutter」、个人鸿蒙App「学习harmony中~」导流。
      </p>
      <p className={style.p}>
        在博客板块，将以微信公众号文章和github
        <a href="https://github.com/yanquankun/learn" target="_blank">
          learn仓库
        </a>
        中的代码积累为文章主要来源。
      </p>
      <h3>架构图</h3>
      <Image
        className={css`
          width: 100%;
        `}
        src="https://www.yanquankun.cn/cdn/%E6%9E%B6%E6%9E%84.png"
      />
    </Fragment>
  );
};

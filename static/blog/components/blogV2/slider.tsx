import React, { FC } from 'react';
import { render } from 'react-dom';
import { css } from '@emotion/css';

const commonStyle = {
  firstTitle: css`
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.35rem 1.5rem 0.35rem 1.25rem;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    border-left: 0.25rem solid transparent;
  `,
  li: css`
    font-size: 1em;
    font-weight: 400;
    display: inline-block;
    color: #2c3e50;
    border-left: 0.25rem solid transparent;
    padding: 0.35rem 1rem 0.35rem 2rem;
    line-height: 1.4;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  `,
};

export const Slider: FC = function (): JSX.Element {
  return (
    <div
      className={css`
        font-size: 16px;
        background-color: #fff;
        width: 20rem;
        position: fixed;
        z-index: 10;
        margin: 0;
        top: 3.6rem;
        left: 0;
        bottom: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-right: 1px solid #eaecef;
        overflow-y: auto;
      `}
    >
      <ul
        className={css`
          padding: 1.5rem 0;
          margin: 0;
          list-style-type: none;
          line-height: 1.7;
        `}
      >
        <li className={commonStyle.firstTitle}>微信公众号文章</li>
        <li className={commonStyle.li}>1</li>
        <li className={commonStyle.li}>2</li>
        <li className={commonStyle.li}>3</li>
        <li className={commonStyle.firstTitle}>GitHub文章</li>
        <li className={commonStyle.li}>1</li>
        <li className={commonStyle.li}>2</li>
        <li className={commonStyle.li}>3</li>
      </ul>
    </div>
  );
};

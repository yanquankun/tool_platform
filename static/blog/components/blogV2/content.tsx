import { FC } from 'react';
import { css } from '@emotion/css';
import { Watermark } from 'antd';

const commonStyle = {
  content: css`
    padding: 5rem 5rem 3rem 23rem;
    overflow-y: auto;
    min-height: calc(100vh - 10rem);
  `,
};

export const Content: FC = function (): JSX.Element {
  return (
    <Watermark content="堃堃Blog">
      <div className={commonStyle.content}>123</div>
    </Watermark>
  );
};

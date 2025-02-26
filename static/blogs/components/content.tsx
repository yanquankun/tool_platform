import { FC } from 'react';
import { css } from '@emotion/css';

const styled = {
  container: css`
    flex: 1;
    height: 100%;
  `,
};

const Content: FC = () => {
  return <div className={styled.container}>Content</div>;
};

export default Content;

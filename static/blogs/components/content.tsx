import { FC } from 'react';
import { css } from '@emotion/css';

const styled = {
  contentWrap: css`
    flex: 1;
    padding: 1rem 1.9rem 1.5rem 1.9rem;
  `,
};

const Content: FC = () => {
  return <div className={styled.contentWrap}>Content</div>;
};

export default Content;

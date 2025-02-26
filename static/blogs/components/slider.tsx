import { FC } from 'react';
import { css } from '@emotion/css';

const styled = {
  sliderWrap: css`
    width: 15rem;
    min-width: 150px;
    border-right: 1px solid #e5e7eb;
    box-sizing: border-box;
    padding: 1.5rem 0.95rem;
    font-size: 1rem;
    font-weight: 400;
  `,
  slider: css`
    overflow-y: auto;
  `,
};

const Slider: FC = () => {
  return <div className={styled.sliderWrap}>123</div>;
};

export default Slider;

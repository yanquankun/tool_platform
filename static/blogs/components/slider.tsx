import { FC } from 'react';
import { css } from '@emotion/css';

const styled = {
  sliderWrap: css`
    width: 15rem;
    min-width: 150px;
    height: 100vh;
    border-right: 1px solid #e5e7eb;
    box-sizing: border-box;
  `,
  slider: css`
    height: 100vh;
    overflow-y: auto;
  `,
};

const Slider: FC = () => {
  return <div className={styled.sliderWrap}>123</div>;
};

export default Slider;

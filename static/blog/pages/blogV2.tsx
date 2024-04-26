import { FC, useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { Header } from '../components/blogV2/header';
import { Slider } from '../components/blogV2/slider';
import { Content } from '../components/blogV2/content';

export const App: FC = () => {
  return (
    <Fragment>
      <Header />
      <Slider />
      <Content />
    </Fragment>
  );
};

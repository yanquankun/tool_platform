import { FC } from 'react';
import { Button } from 'antd';

export const App: FC = function () {
  return (
    <div style={{ color: 'red', border: '1px' }}>
      home page
      <Button type="primary">Button</Button>
    </div>
  );
};

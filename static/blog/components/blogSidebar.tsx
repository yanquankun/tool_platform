import { FC, useState } from 'react';
import { Steps, Row, Col } from 'antd';

export const BlogSidebar: FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', current);
    setCurrent(value);
  };
  const description = 'This is a description.';

  return (
    <Steps
      current={current}
      onChange={onChange}
      direction="vertical"
      items={[
        {
          title: 'Step 1',
          description,
        },
        {
          title: 'Step 2',
          description,
        },
        {
          title: 'Step 3',
          description,
        },
      ]}
    />
  );
};

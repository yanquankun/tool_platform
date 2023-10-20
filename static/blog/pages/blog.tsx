import { FC, useState } from 'react';
import Container from '~shared/components/container';
import { Steps, Row, Col } from 'antd';
import { WaterMark } from '@ant-design/pro-components';

export const App: FC = function () {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', current);
    setCurrent(value);
  };
  const description = 'This is a description.';

  return (
    <Container>
      <WaterMark content={['闫全堃', '17600610907@164.com']}>
        <Row gutter={16}>
          <Col span={4}>
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
          </Col>
          <Col span={19} offset={1}>
            123
          </Col>
        </Row>
      </WaterMark>
    </Container>
  );
};

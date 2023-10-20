import { FC } from 'react';
import { Row, Col } from 'antd';
import { BlogSidebar } from '../components/blogSidebar';
import { WaterMark } from '@ant-design/pro-components';

export const App: FC = function () {
  return (
    <WaterMark content={['闫全堃', '17600610907@164.com']}>
      <Row gutter={16}>
        <Col span={4}>
          <BlogSidebar />
        </Col>
        <Col span={19} offset={1}>
          123
        </Col>
      </Row>
    </WaterMark>
  );
};

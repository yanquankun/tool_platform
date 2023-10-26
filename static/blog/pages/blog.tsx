import { FC, useState } from 'react';
import { Row, Col } from 'antd';
import { BlogSidebar } from '../components/blogSidebar';
import { BlogArticle } from '../components/blogArticle';
import { WaterMark } from '@ant-design/pro-components';

export const App: FC = function () {
  const [blogId, setBlogId] = useState<number>();

  const blogChange = (blogId: number) => {
    setBlogId(blogId);
  };

  return (
    <WaterMark content={['闫全堃', '17600610907@164.com']}>
      <Row gutter={16}>
        <Col span={4}>
          <BlogSidebar blogChange={blogChange} />
        </Col>
        <Col span={19} offset={1}>
          <BlogArticle blogId={blogId as number}></BlogArticle>
        </Col>
      </Row>
    </WaterMark>
  );
};

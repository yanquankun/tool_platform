import { FC } from 'react';
import { Card, Avatar, Row, Col, Tooltip, message, Space } from 'antd';
import { SketchOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';
import { copy } from '~shared/utils/util';
import { css } from '@emotion/css';

const { Meta } = Card;

export const App: FC = function () {
  return (
    <>
      <Row gutter={16}>
        <Col span={4}>
          <Card
            style={{ borderRadius: '20% 20% 0 0' }}
            cover={
              <img
                css={{
                  borderRadius: '20%!important',
                }}
                alt="Geek"
                src="data:image/png;base64,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"
              />
            }
            actions={[
              <Tooltip title="点击跳转个人网站~">
                <Space
                  onClick={() => {
                    window.open('http://www.yanquankun.com/myself/index.html', '_blank');
                  }}
                >
                  <HomeOutlined key="selfWebsite" />
                  个人网站
                </Space>
              </Tooltip>,
              <Tooltip title="点击跳转个人AngularUI库~">
                <Space
                  onClick={() => {
                    window.open('http://www.yanquankun.com/ng-mui/#/start', '_blank');
                  }}
                >
                  <SketchOutlined key="angularUi" />
                  AngularUI
                </Space>
              </Tooltip>,
              <Tooltip title="点击图标复制邮箱地址~">
                <Space
                  className="emailCopy"
                  onClick={() => {
                    copy('.emailCopy', '邮箱地址复制成功', '邮箱地址复制失败，请重试~');
                  }}
                >
                  <MailOutlined key="ellipsis" />
                  Mail
                </Space>
              </Tooltip>,
            ]}
          >
            <Meta
              avatar={<Avatar src="http://www.yanquankun.com:9300/cdn/self-icon.jpg" />}
              title="闫全堃(Mint)"
              description="一个喜欢折腾的coder"
            />
          </Card>
        </Col>
        <Col offset={1} span={19}>
          12321
        </Col>
      </Row>
      {/* <Image width={200} src="http://www.yanquankun.com:9300/cdn/%E6%9E%B6%E6%9E%84.png" /> */}
    </>
  );
};

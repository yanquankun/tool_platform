import { FC } from 'react';
import { Button } from 'antd';
import { ProCard, ProFormGroup, ProFormSwitch } from '@ant-design/pro-components';
import Blog from './Blog';

export const App: FC = function () {
  return (
    <>
      <Blog></Blog>
      <div style={{ color: 'red', border: '1px' }}>
        home page
        <ProCard
          title="默认尺寸"
          bordered
          extra={
            <ProFormGroup>
              <ProFormSwitch name="Enable" noStyle checkedChildren={'启用'} unCheckedChildren={'禁用'} />
            </ProFormGroup>
          }
          tooltip="这是提示"
          style={{ maxWidth: 300 }}
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </ProCard>
        <ProCard
          title="小尺寸卡片"
          extra="extra"
          tooltip="这是提示"
          style={{ maxWidth: 300, marginBlockStart: 24 }}
          size="small"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </ProCard>
        <Button type="primary">Button</Button>
      </div>
    </>
  );
};

import { FC } from 'react';
import Container from '../components/container';
import { Image, List, Typography } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
export const App: FC = function () {
  return (
    <Container>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
      {/* <Image width={200} src="http://www.yanquankun.com:9300/cdn/%E6%9E%B6%E6%9E%84.png" /> */}
    </Container>
  );
};

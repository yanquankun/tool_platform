import { FC, useState } from 'react';
import { Row, Divider, Form, Input } from 'antd';
import { css } from '@emotion/css';
import dayjs from 'dayjs';
import { timeStamp } from 'console';

export const ToolContainer: FC = (): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form layout="inline" form={form}>
      <Form.Item label="时间戳转时间" extra="单位为毫秒时间戳，小于13位的将转换为13位时间戳">
        <Input
          type="number"
          onChange={(event) => {
            const val = event.target.value.length < 13 ? Number(event.target.value) * 1000 : Number(event.target.value);
            form.setFieldValue('time', dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
          }}
        />
      </Form.Item>
      <Form.Item name="time">
        <Input disabled />
      </Form.Item>
      <Divider />
      <Form.Item label="时间转时间戳" extra="将自动转换为13位时间戳">
        <Input
          onChange={(event) => {
            const val = event.target.value;
            form.setFieldValue('timeStamp', dayjs(val).unix() * 1000);
          }}
        />
      </Form.Item>
      <Form.Item name="timeStamp">
        <Input disabled />
      </Form.Item>
    </Form>
  );
};

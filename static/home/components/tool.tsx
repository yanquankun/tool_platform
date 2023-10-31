import { FC, useState } from 'react';
import { Row, Divider, Form, Input, Select } from 'antd';
import { css } from '@emotion/css';
import dayjs from 'dayjs';

const { Option } = Select;

export const ToolContainer: FC = (): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="inline"
      form={form}
      initialValues={{
        timeUnit: 'second',
        timeStampUnit: 'second',
      }}
    >
      <Form.Item name="time" label="时间戳转时间">
        <Input
          type="number"
          onChange={(event) => {
            const unit = form.getFieldValue('timeUnit');
            const val = unit == 'second' ? Number(event.target.value) * 1000 : Number(event.target.value);
            form.setFieldValue('timeTF', dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
          }}
        />
      </Form.Item>
      <Form.Item name="timeUnit">
        <Select
          className={css`
            width: 80px !important;
          `}
          onChange={(event) => {
            const time = form.getFieldValue('time');
            if (time) {
              const val = event == 'second' ? Number(time) * 1000 : Number(time);
              form.setFieldValue('timeTF', dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
            }
          }}
        >
          <Option value="second">秒</Option>
          <Option value="millSecond">毫秒</Option>
        </Select>
      </Form.Item>
      <Form.Item name="timeTF">
        <Input disabled />
      </Form.Item>
      <Divider />
      <Form.Item name="timeStamp" label="时间转时间戳">
        <Input
          onChange={(event) => {
            const unit = form.getFieldValue('timeUnit');
            const val = event.target.value;
            form.setFieldValue('timeStampTF', unit == 'second' ? dayjs(val).unix() : dayjs(val).unix() * 1000);
          }}
        />
      </Form.Item>
      <Form.Item name="timeStampUnit">
        <Select
          className={css`
            width: 80px !important;
          `}
          onChange={(event) => {
            const val = form.getFieldValue('timeStamp');
            if (val) {
              form.setFieldValue('timeStampTF', event == 'second' ? dayjs(val).unix() : dayjs(val).unix() * 1000);
            }
          }}
        >
          <Option value="second">秒</Option>
          <Option value="millSecond">毫秒</Option>
        </Select>
      </Form.Item>
      <Form.Item name="timeStampTF">
        <Input disabled />
      </Form.Item>
    </Form>
  );
};

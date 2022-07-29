import { Space, Spin } from 'antd';
import React from 'react';

const Loader = () => (
  <Space size="large" className='loader'>
    <Spin size="large" />
  </Space>
);

export default Loader;
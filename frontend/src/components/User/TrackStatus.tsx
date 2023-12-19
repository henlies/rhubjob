import React from 'react';
import { Layout, Typography } from 'antd';

const TrackStatus: React.FC = () => {

  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 12, background: '#fff', minHeight: 360 }}>
          <Title level={3}>Track Status</Title>
          <p>This is a simple homepage using Ant Design, React, and TypeScript.</p>
        </div>
      </Content>
    </Layout>
  );
};

export default TrackStatus;
import React from 'react';
import { Layout, Typography } from 'antd';

const Petinfo: React.FC = () => {

  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ marginTop: '64px', padding: 12, background: '#fff', minHeight: 360 }}>
          <Title level={3}>Pet Info</Title>
          <p>This is a simple homepage using Ant Design, React, and TypeScript.</p>
        </div>
      </Content>
    </Layout>
  );
};

export default Petinfo;
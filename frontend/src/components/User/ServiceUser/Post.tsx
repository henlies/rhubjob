import React from 'react';
import { Layout } from 'antd';

const Post: React.FC = () => {
  const { Content } = Layout;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>

      </Content>
    </Layout>
  );
};
export default Post;
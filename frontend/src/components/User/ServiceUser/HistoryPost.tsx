import React, { useEffect, } from 'react';
import { Col, Layout, Typography } from 'antd';



const HistoryPost: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;


  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ประวัติการดูแล</Title>
              </div>
            </Col>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HistoryPost;
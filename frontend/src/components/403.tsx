import React from 'react';
import { Button, Layout, Result } from 'antd';
import { useNavigate } from 'react-router-dom';


const Error403: React.FC = () => {
  const { Content } = Layout;
  const navigate = useNavigate();

  const Back = async () => {
    navigate('/');
  };

  return (
    <Layout>
      <Content style={{ marginTop: '20vh', height: '80vh', overflowY: 'auto', padding: '24px'}}>
        <Result
          status="403"
          title="การเข้าถึงผิดพลาด"
          subTitle="ขอโทษด้วย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้!"
          extra={<Button onClick={Back} type="primary">กลับหน้าหลัก</Button>}
        />
      </Content>
    </Layout>
  );
};

export default Error403;
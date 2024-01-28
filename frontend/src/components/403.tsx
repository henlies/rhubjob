import React from 'react';
import { Button, Layout, Result } from 'antd';
import { useNavigate } from 'react-router-dom';


const Error403: React.FC = () => {
  const { Content } = Layout;
  const navigate = useNavigate();

  const petid = localStorage.getItem("petid")
  const addressid = localStorage.getItem("addressid")

  const Back = async () => {
    navigate('/');
  };

  const BacktoProfile = async () => {
    navigate('/profile');
  };

  return (
    <Layout>
      <Content style={{ marginTop: '20vh', height: '80vh', overflowY: 'auto', padding: '24px' }}>
        {(petid !== "0" || addressid !== "0") ? (
          <Result
            status="403"
            title="การเข้าถึงผิดพลาด"
            subTitle="ขอโทษด้วย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้!"
            extra={<Button onClick={Back} type="primary">กลับหน้าหลัก</Button>}
          />
        ) : (
          <Result
            status="warning"
            title="กรุณาเพิ่มข้อมูลสัตว์เลี้ยงและที่อยู่"
            subTitle="ขอโทษด้วย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้!"
            extra={<Button onClick={BacktoProfile} type="primary">เพิ่มข้อมูล</Button>}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Error403;
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Row, Col, Image } from 'antd';
import { UserInterface } from '../models/User';
import { PetInterface } from '../models/Pet';
import { AllofCat, AllofDog, AllofUser } from '../services/HttpServices';

const { Content } = Layout;
const { Title } = Typography;

const featureData = [
  {
    title: "ตรวจสอบคะแนนการรับเลี้ยง",
    description: "หลังจากผู้รับเลี้ยงจบงาน ทางลูกค้าสามารถให้คะแนนความพึงพอใจกับผู้รับเลี้ยงได้ และ สามารถตรวจสอบคะแนนได้ เพื่อความสบายใจของลูกค้า",
    imageUrl: "https://plus.unsplash.com/premium_photo-1682309674226-fa47fc54568e?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "หารายได้กับสิ่งที่รัก",
    description: "หากคุณอยากหารายได้เสริม เว็บของเราก็เป็นอีกหนึ่งทางออก ในเมื่อคุณรักสัตว์ แล้วทำไมไม่มาลองรับเลี้ยงสัตว์เลี้ยงสุดน่ารักกันหล่ะ ?",
    imageUrl: "https://plus.unsplash.com/premium_photo-1663126547017-5c16e69a10f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "ติดตามความเปลี่ยนแปลง",
    description: "ในเมื่อคุณอาจจะไปธุระหลายวันทำให้เกิดความคิดถึง หรือไม่ได้รักษาความสะอาดของสัตว์เลี้ยงของคุณ ยกโอกาสนี้ให้ผู้รับเลี้ยงกันเถอะ :)",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683147680351-f241a5856dce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Home: React.FC = () => {
  const [user, setUser] = useState<UserInterface[]>([]);
  const [dog, setDog] = useState<PetInterface[]>([]);
  const [cat, setCat] = useState<PetInterface[]>([]);

  const getuser = async () => {
    let res = await AllofUser();
    if (res) {
      setUser(res);
    }
  };

  const getdog = async () => {
    let res = await AllofDog();
    if (res) {
      setDog(res);
    }
  };

  const getcat = async () => {
    let res = await AllofCat();
    if (res) {
      setCat(res);
    }
  };

  useEffect(() => {
    getuser();
    getdog();
    getcat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px', backgroundSize: 'cover', padding: '64px' }}>
        <div style={{ padding: 12, background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', minHeight: 360 }}>
          <Title level={2} style={{ textAlign: 'center' }}>Ur.Pet ยินดีต้อนรับ !</Title>
          <p style={{ textAlign: 'center', fontSize: '16px' }}>
            ในวันที่คุณไม่ว่าง ต้องไปทำธุระแล้วไม่อยากปล่อยสัตว์เลี้ยงไว้อยู่ตามลำพัง ทำไมไม่ลองมาใช้ Ur.Pet เพื่อหาคนรักสัตว์เลี้ยงล่ะ
          </p>
          <p style={{ textAlign: 'center', fontSize: '16px' }}>
            เพื่อที่เราจะได้สบายใจในวันที่เราต้องไปทำธุระเป็นเวลานาน ซึ่งเรามีการรายงานทุกวัน และ สามารถติดต่อสอบถามกับผู้รับเลี้ยงได้ ฉะนั้น เราขอเป็นสื่อกลางแห่งความเป็นห่วง
          </p>
          <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} title="จำนวนผู้ใช้งานระบบ" bordered={false}>
                  <p style={{ fontSize: '24px', textAlign: 'center', margin: 0 }}>{user.length}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} title="จำนวนสุนัข" bordered={false}>
                  <p style={{ fontSize: '24px', textAlign: 'center', margin: 0 }}>{dog.length}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} title="จำนวนแมว" bordered={false}>
                  <p style={{ fontSize: '24px', textAlign: 'center', margin: 0 }}>{cat.length}</p>
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Row gutter={16}>
              {featureData.map((feature, index) => (
                <Col span={8} key={index}>
                  <Card bordered={false}>
                    <Image
                      src={feature.imageUrl}
                      style={{ marginBottom: '16px', borderRadius: '10px', width: '100%', height: 300 }}
                      preview={false}
                    />
                    <Card title={feature.title} bordered={false}>
                      {feature.description}
                    </Card>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

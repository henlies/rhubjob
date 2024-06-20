import React from 'react';
import { Card, Col, Layout, Row, Typography } from 'antd';

const Petinfo: React.FC = () => {

  const { Content } = Layout;
  const { Title } = Typography;

  const petData = [
    {
      name: 'สุนัข',
      description: 'สุนัขเป็นสัตว์ที่ซื่อสัตย์และเป็นมิตร ซึ่งมักถูกมองว่าเป็นเพื่อนที่ดีที่สุดของมนุษย์ มีหลากหลายสายพันธุ์และขนาด',
      imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://www.purina.co.th/find-a-pet/dog-breeds?gad_source=1&gclid=CjwKCAjwg8qzBhAoEiwAWagLrP6rPcEqtiCjhFwETIeOSuVb1esoX06SvBx5InAYxHET209GEP5O9BoC-l8QAvD_BwE'
    },
    {
      name: 'แมว',
      description: 'แมวเป็นสัตว์เลี้ยงที่รักอิสระและขี้เล่น พวกเขามีชื่อเสียงในด้านความคล่องตัวและความสามารถในการส่งเสียงฟี้อย่างแมว',
      imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://www.purina.co.th/find-a-pet/cat-breeds?gad_source=1&gclid=CjwKCAjwg8qzBhAoEiwAWagLrOf2a9O01XijcTq6xjC7ntHg-LyEwsymV84H5lZChUQOZoLi_mdCqhoCiFIQAvD_BwE'
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px', padding: '32px', background: '#f0f2f5', borderRadius: '10px' }}>
        <Title level={2} style={{ textAlign: 'center', marginTop: 60, marginBottom: 60, paddingBottom: 10, borderBottom: '2px solid #e8e8e8' }}>
          ข้อมูลสัตว์เลี้ยง
        </Title>
        <Row gutter={[24, 24]} style={{ marginTop: '26px' }}>
          {petData.map(pet => (
            <Col span={8} key={pet.name} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                hoverable
                cover={<img alt={pet.name} src={pet.imageUrl} style={{ height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />}
                onClick={() => window.open(pet.link, '_blank')}
                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}
              >
                <Card.Meta title={pet.name} description={pet.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>

  );
};

export default Petinfo;
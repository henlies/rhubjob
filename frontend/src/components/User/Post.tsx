import React, { useEffect, useState } from 'react';
import { Card, Avatar, Layout, Button, Modal, Col, Form, Input, Typography, DatePicker } from 'antd';
import { UserInterface } from '../../models/User';
import { GetUser } from '../../services/HttpServices';
import { PostInterface } from '../../models/Post';
import MapComponent from './etc/Map';
import personImage from './etc/person.jpg';

const Post: React.FC = ({ }) => {
  const { Content } = Layout;
  const { Title } = Typography;
  const id = localStorage.getItem("id")
  const [user, setUser] = useState<UserInterface>();
  const [post, setPost] = useState<Partial<PostInterface>>({});
  const [postopen, setPostopen] = useState(false);

  const getuser = async () => {
    let res = await GetUser(id);
    if (res) {
      setUser(res);
    }
  };

  const handleDateStartChange = (date: any) => {
    setPost({ ...post, Start: date });
  };

  const handleDateEndChange = (date: any) => {
    setPost({ ...post, End: date });
  };

  const handleMapClick = (lat?: number, lng?: number) => {
    setPost(prevPost => {
      return { ...prevPost, Lati: lat, Long: lng };
    });
  };

  useEffect(() => {
    getuser();
  }, []);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '24px', marginTop: '16px', alignItems: 'start' }}>
          <Button onClick={() => setPostopen(true)}>
            สร้างโพส
          </Button>
        </div>
        <Card>
          <Avatar size="large" src={personImage}/>
          <span style={{ marginLeft: 16 }}>{user?.Firstname} {user?.Lastname}</span>
          <div style={{ marginTop: 16 }}>{user?.Descript}</div>
        </Card>

        <Modal
          centered
          open={postopen}
          onCancel={() => {
            setPostopen(false);
          }}
          footer={null}
        >
          <Col>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>สร้างโพส</Title>
            </div>
            <Form
              initialValues={{ remember: true }}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Input
                placeholder="ข้อมูล"
                onChange={(e) => {
                  setPost({ ...post, Descript: e.target.value });
                }}
              />
              <div style={{ marginTop: '10px' }}>
                <DatePicker
                  placeholder="วันที่เริ่มต้น"
                  onChange={handleDateStartChange}
                />
                <DatePicker
                  placeholder="วันที่สิ้นสุด"
                  onChange={handleDateEndChange}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <MapComponent onMapClick={handleMapClick} />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: '10px' }}>
                <Input
                  disabled
                  placeholder="latitude"
                  value={post.Lati} />
                <Input
                  disabled
                  placeholder="longtitude"
                  value={post.Long} />
              </div>
              <Input
                style={{ marginTop: '10px' }}
                placeholder="ราคา"
                onChange={(e) => {
                  const price = parseInt(e.target.value);
                  setPost({ ...post, Price: price });
                }}
              />
              <Button
                style={{ marginTop: '10px', width: '100%' }}
                type="primary"
                htmlType="submit"
              // onClick={handleSignin}
              >
                โพส
              </Button>
            </Form>
          </Col>
        </Modal>

      </Content>
    </Layout>
  );
};

export default Post;
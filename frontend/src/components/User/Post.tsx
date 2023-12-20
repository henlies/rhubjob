import React, { useEffect, useState } from 'react';
import { Card, Avatar, Layout, Button, Modal, Col, Form, Input, Typography, DatePicker } from 'antd';
import { CreatePost, GetPostStart } from '../../services/HttpServices';
import { PostInterface, PostsInterface } from '../../models/Post';
import { Dayjs } from 'dayjs';
import MapComponent from './etc/Map';
import personImage from './etc/person.jpg';
import { RangeValue } from 'rc-picker/lib/interface';

const Post: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;
  const role = localStorage.getItem("role")
  const [post, setPost] = useState<PostInterface[]>([]);
  const [posts, setPosts] = useState<Partial<PostsInterface>>({});
  const [postopen, setPostopen] = useState(false);

  const getpoststart = async () => {
    let res = await GetPostStart();
    if (res) {
      setPost(res);
    }
  };

  const handleMapClick = (lat?: number, lng?: number) => {
    setPosts(prevPost => {
      return { ...prevPost, Lati: lat, Long: lng };
    });
  };

  const handleRangeDateChange = (dates: RangeValue<Dayjs> | null) => {
    if (dates) {
      const startFormatted = dates[0]?.toDate();
      const endFormatted = dates[1]?.toDate();
      setPosts(prevPost => {
        return { ...prevPost, Start: startFormatted, End: endFormatted };
      });
    }
  };

  useEffect(() => {
    getpoststart();
  }, []);

  const submit = async () => {
    let data = {
      Descript: posts.Descript,
      Lati: posts.Lati,
      Long: posts.Long,
      Start: posts.Start,
      End: posts.End,
      Price: posts.Price,
      User1ID: numId
    };
    let res = await CreatePost(data);
    if (res) {
      setPostopen(!postopen)
      getpoststart();
    }
  };

  if (role === "ผู้ใช้บริการ") {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '16px' }}>
          <div style={{ display: 'flex', marginBottom: '24px', marginTop: '16px', marginLeft: '24px', alignItems: 'start' }}>
            <Button onClick={() => setPostopen(true)}>
              สร้างโพส
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', margin: '32px' }}>
            {post.map((post) => (
              <Card key={post.ID}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                  <Avatar size={64} src={personImage} />
                  <p>{post.ID}</p>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <p>{post.Descript}</p>
                    <div>
                      <p>{post.Price}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
                    setPosts({ ...posts, Descript: e.target.value });
                  }}
                />
                <div style={{ marginTop: '10px' }}>
                  <RangePicker
                    placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                    onChange={(date) => handleRangeDateChange(date)}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <MapComponent onMapClick={handleMapClick} />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: '10px' }}>
                  <Input
                    disabled
                    placeholder="latitude"
                    value={posts.Lati} />
                  <Input
                    disabled
                    placeholder="longtitude"
                    value={posts.Long} />
                </div>
                <Input
                  style={{ marginTop: '10px' }}
                  placeholder="ราคา"
                  onChange={(e) => {
                    const price = parseInt(e.target.value);
                    setPosts({ ...posts, Price: price });
                  }}
                />
                <Button
                  style={{ marginTop: '10px', width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  onClick={submit}
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
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', margin: '80px 32px 32px 32px' }}>
          {post.map((post) => (
            <Card key={post.ID}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                <Avatar size={64} src={personImage} />
                <p>{post.ID}</p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                  <p>{post.Descript}</p>
                  <div>
                    <p>{post.Price}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default Post;
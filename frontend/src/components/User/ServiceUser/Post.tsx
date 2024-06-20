import React, { useEffect, useState } from 'react';
import {
  Col,
  Modal,
  Input,
  Layout,
  Typography,
  Card,
  Avatar,
  Tooltip,
} from 'antd';
import { PostSInterface } from '../../../models/Post';
import { GetPostShowIDstatus1, SelectPost } from '../../../services/HttpServices';
import { SelectOutlined } from '@ant-design/icons';
import './Post.css';

const DashboardUser: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;

  const [posts, setPosts] = useState<PostSInterface[]>([]);

  const getpost = async () => {
    let res = await GetPostShowIDstatus1(numId);
    if (res) {
      setPosts(res);
    }
  };

  const handleSelect = async (id?: number) => {
    Modal.confirm({
      title: 'ยืนยัน',
      content: 'คุณแน่ใจหรือไม่ที่จะยืนยัน ?',
      onOk: async () => {
        await SelectPost(id, numId);
        getpost();
      },
    });
  }

  useEffect(() => {
    getpost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8 }}>
            <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <Col>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>เลือกผู้รับเลี้ยงให้สัตว์เลี้ยงของคุณ</Title>
              </div>
            </Col>
          </div>
        </div>

        {posts.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {posts.map((post) => {
              const startDate = new Date(post.Start);
              const start = startDate.toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              const endDate = new Date(post.End);
              const end = endDate.toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <Card
                  key={post.ID}
                  style={{ marginTop: '8px', borderRadius: '8px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                  bordered={false}
                  actions={[
                    <Tooltip title="เลือกผู้รับเลี้ยง" placement="bottom">
                      <SelectOutlined style={{ color: 'green' }} onClick={() => handleSelect(post.ID)} />
                    </Tooltip>,
                  ]}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Avatar size={75} src={post.ServiceProvider?.Pic} style={{ margin: '12px' }} />
                    <Input readOnly addonBefore="ชื่อผู้รับเลี้ยง" value={`${post.ServiceProvider?.Firstname} ${post.ServiceProvider?.Lastname}`} style={{ flex: 1 }} />
                  </div>
                  <Col span={24}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Input value="รายละเอียดผู้รับเลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                      <Input readOnly addonBefore="คำแนะนำ" value={`${post.Descript}`} />
                      <Input readOnly addonBefore="ตั้งแต่วันที่" value={`${start} ถึงวันที่ ${end}`} />
                      <Input readOnly addonBefore="ราคา" value={`${post.Price} บาท/วัน`} />
                      <Input readOnly addonBefore="รับเลี้ยง" value={post.Type?.Name} />
                    </div>
                  </Col>
                </Card>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <Title level={4}>ขณะนี้ยังไม่มีผู้รับเลี้ยง</Title>
              </div>
            </Col>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default DashboardUser;
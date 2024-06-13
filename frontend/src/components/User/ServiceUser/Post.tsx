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
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>เลือกผู้ให้บริการ</Title>
              </div>
            </Col>
          </div>
        </div>

        {posts.length > 0 ? (
          posts.map((posts) => {
            const startDate = new Date(posts.Start);
            const start = startDate.toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            const endDate = new Date(posts.End);
            const end = endDate.toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <Card style={{ marginTop: '8px' }} bordered={false} actions={[
                  <Tooltip title="เลือกผู้ให้บริการ" placement="bottom">
                    <SelectOutlined style={{ color: 'green' }} onClick={() => handleSelect(posts.ID)} />,
                  </Tooltip>,
                ]}>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                    <div style={{ margin: '12px' }}>
                      <Avatar size={'large'} src={posts.ServiceProvider?.Pic} />
                    </div>
                    <div style={{ marginRight: '20px' }}>
                      <Input addonBefore="ชื่อผู้ให้บริการ" value={`${posts.ServiceProvider?.Firstname} ${posts.ServiceProvider?.Lastname}`} />
                    </div>
                    <div>
                      <Input addonBefore="สถานะ" value={`${posts.Status?.Name}`} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                    <Col span={12}>
                      <div style={{ margin: '24px' }}>
                        <Input value="รายละเอียดการใช้บริการ" />
                        <div>
                          <Input addonBefore="คำแนะนำ" value={`${posts.Descript}`} />
                          <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                          <Input addonBefore="ราคา" value={`${posts.Price} / วัน`} />
                          <Input addonBefore="รับเลี้ยง" value={posts.Type?.Name} />
                        </div>
                      </div>
                    </Col>
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          <div style={{ display: 'flex', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <Title level={4}>ยังไม่มีโพสสำหรับการให้บริการ</Title>
              </div>
            </Col>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default DashboardUser;
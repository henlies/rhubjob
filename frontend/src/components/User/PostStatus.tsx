import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Input, Layout } from 'antd';
import personImage from './etc/person.jpg';
import MapDisplayComponent from './etc/MapDisplay';
import { PostInterface } from '../../models/Post';
import { GetPostIdStatus } from '../../services/HttpServices';

const Poststatus: React.FC = () => {
  const { Content } = Layout;
  const [post, setPost] = useState<PostInterface[]>([]);
  const id = localStorage.getItem("id")

  const getpoststart = async () => {
    let res = await GetPostIdStatus(id);
    if (res) {
      setPost(res);
    }
  };

  useEffect(() => {
    getpoststart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        {post.length > 0 ? (
          post.map((post) => {
            const startDate = post.Start instanceof Date ? post.Start : new Date();
            const starts: string = startDate.toLocaleDateString(undefined, {
              day: 'numeric',
              month: '2-digit',
              year: 'numeric',
            }).replace(/\//g, '-');

            const part = starts.split('-');
            const start = part[1] + '-' + part[0] + '-' + part[2];

            const endDate = post.End instanceof Date ? post.End : new Date();
            const ends: string = endDate.toLocaleDateString(undefined, {
              day: 'numeric',
              month: '2-digit',
              year: 'numeric',
            }).replace(/\//g, '-');
            const parts = ends.split('-');
            const end = parts[1] + '-' + parts[0] + '-' + parts[2];

            return (
              <Card style={{ marginTop: '72px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                  <div style={{ margin: '12px' }}>
                    <Avatar size={'large'} src={personImage} />
                  </div>
                  <div style={{ marginRight: '20px' }}>
                    <Input addonBefore="ชื่อผู้ใช้" value={`${post.User1?.Firstname} ${post.User1?.Lastname}`} />
                  </div>
                  <div>
                    <Input addonBefore="สถานะ" value={`${post.Status?.Name}`} />
                  </div>
                  <div>
                    <Input addonBefore="ผู้รับงาน" value={`${post.User2?.Firstname} ${post.User2?.Lastname}`} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                  <Col span={12}>
                    <div style={{ margin: '24px' }}>
                      <Input value="รายละเอียดการใช้บริการ" />
                      <div style={{ marginBottom: '12px', marginTop: '12px' }}>
                        <MapDisplayComponent initialLat={post.Lati} initialLng={post.Long} imageUrl="https://e7.pngegg.com/pngimages/457/630/png-clipart-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-thumbnail.png" />
                      </div>
                      <div>
                        <Input addonBefore="คำแนะนำ" value={`${post.Descript}`} />
                        <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                        <Input addonBefore="ราคา" value={`${post.Price}`} />
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ margin: '24px' }}>
                      <Input value="รายละเอียดสัตว์เลี้ยง" />
                      <div style={{ marginBottom: '12px', marginTop: '12px' }}>
                        <Avatar shape="square" size={250}>{post.User1?.Pet?.Pic}</Avatar>
                      </div>
                      <div>
                        <Input addonBefore="ชื่อ" value={post.User1?.Pet?.Name} />
                        <Input addonBefore="คำแนะนำ" value={post.User1?.Pet?.Descript} />
                        <Input addonBefore="ชนิด" value={post.User1?.Pet?.Gene?.Type?.Name} />
                        <Input addonBefore="สายพันธุ์" value={post.User1?.Pet?.Gene?.Name} />
                        <Input addonBefore="อาหาร" value={post.User1?.Pet?.Food} />
                        <Input addonBefore="นิสัย" value={post.User1?.Pet?.Habit} />
                        <Input addonBefore="ยา" value={post.User1?.Pet?.Pill} />
                      </div>
                    </div>
                  </Col>
                </div>
              </Card>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>คุณยังไม่ได้รับงาน
            </h2>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Poststatus;
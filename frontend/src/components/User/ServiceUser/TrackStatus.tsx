import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Input, Layout } from 'antd';
import personImage from './etc/person.jpg';
// import MapDisplayComponent from './etc/MapDisplay';
// import { PostInterface } from '../../models/Post';
// import { GetPostIdTrack } from '../../services/HttpServices';

const TrackStatus: React.FC = () => {
  const { Content } = Layout;
  // const [post, setPost] = useState<PostInterface[]>([]);
  const id = localStorage.getItem("id");

  // const getpoststart = async () => {
  //   let res = await GetPostIdTrack(id);
  //   if (res) {
  //     setPost(res);
  //   }
  // };

  useEffect(() => {
    // getpoststart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        {/* {post.length > 0 ? (
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
                  <div>
                    <Input addonBefore="สถานะ" value={`${post.Status?.Name}`} />
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
                    </div>
                  </Col>
                </div>
              </Card>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>ยังไม่มีคนรับงานของคุณ</h2>
          </div>
        )} */}
      </Content>
    </Layout>
  );
};

export default TrackStatus;
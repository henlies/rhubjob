import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Layout, Typography } from 'antd';
import { PostSInterface } from '../../../models/Post';
import { GetPostbyPId } from '../../../services/HttpServices';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'antd';

const Poststatus: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const [post, setPost] = useState<PostSInterface[]>([]);
  const { postId } = useParams();
  const postIDparams: number | undefined = postId ? parseInt(postId, 10) : undefined;

  const getpost = async () => {
    let res = await GetPostbyPId(postIDparams);
    if (res) {
      setPost(res);
    }
  };

  useEffect(() => {
    getpost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '24px', alignItems: 'center', justifyContent: 'center' }}>
          <Col span={2}>
            <div style={{ textAlign: 'center' }}>
              <Link to={`/post`}>
                <Button>
                  กลับ
                </Button>
              </Link>
            </div>
          </Col>
          <Col span={20}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3}>แจ้งสถานะความคืบหน้า</Title>
            </div>
          </Col>
          <Col span={2}>
          </Col>
        </div>
        {post.length > 0 ? (
          post.map((post) => {
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

            const birthDate = new Date(post.ServiceUser?.Birth);
            const birth = birthDate.toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }}>
                  <Card style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                      <div style={{ margin: '12px' }}>
                        <Image style={{ borderRadius: '50%' }} width={50} src={post.ServiceProvider?.Pic}/>
                      </div>
                      <div style={{ marginRight: '20px' }}>
                        <Input addonBefore="ชื่อผู้ให้บริการ" value={`${post.ServiceProvider?.Prefix?.Name} ${post.ServiceProvider?.Firstname} ${post.ServiceProvider?.Lastname}`} />
                      </div>
                      <div>
                        <Input addonBefore="สถานะ" value={`${post.Status?.Name}`} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ margin: '24px' }}>
                          <Input value="รายละเอียดการให้บริการ" />
                          <div>
                            <Input addonBefore="คำแนะนำ" value={`${post.Descript}`} />
                            <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                            <Input addonBefore="ราคา" value={`${post.Price} / วัน`} />
                            <Input addonBefore="รับเลี้ยง" value={post.Type?.Name} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '6px' }}>
                  <Card style={{ flex: 1, marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
                      <Title level={4}>ข้อมูลผู้ใช้บริการ</Title>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ marginBottom: '16px' }}>
                            <Image style={{ borderRadius: '50%' }} width={95} src={post.ServiceUser?.Pic}/>
                          </div>
                          <Input addonBefore="ชื่อผู้ใช้บริการ" value={`${post.ServiceUser?.Prefix?.Name} ${post.ServiceUser?.Firstname} ${post.ServiceUser?.Lastname}`} />
                          <Input addonBefore="เจ้าของ" value={`${post.ServiceUser?.Pet?.Name}`} />
                          <Input addonBefore="วันเกิด" value={`${birth}`} />
                          <Input addonBefore="สถานะ" value={`${post.ServiceUser?.Descript}`} />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                          <div>
                            <div style={{ marginBottom: "16px" }}>
                              <Input value="ช่องทางการติดต่อ" />
                            </div>
                            <Input addonBefore="ที่อยู่" value={`${post.ServiceUser?.Address?.Descript} ต.  ${post.ServiceUser?.Address?.District?.Name} จ.${post.ServiceUser?.Address?.District?.Province?.Name} รหัสไปรษณี ${post.ServiceUser?.Address?.District?.Zipcode}`} />
                            <Input addonBefore="อีเมล" value={`${post.ServiceUser?.Email}`} />
                            <Input addonBefore="ไลน์" value={`${post.ServiceUser?.Line}`} />
                            <Input addonBefore="เบอร์โทรศัพท์" value={`${post.ServiceUser?.Phone}`} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                  <Card style={{ flex: 1, marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
                      <Title level={4}>ข้อมูลสัตว์เลี้ยง</Title>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                      <Col span={12}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                          <div>
                            <Input addonBefore="ชื่อ" value={`${post.ServiceUser?.Pet?.Name}`} />
                          </div>
                          <div>
                            <Image width={100} src={post.ServiceUser?.Pet?.Pic}/>
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                          <div>
                            <div style={{ marginBottom: "16px" }}>
                              <Input value="รายละเอียดสัตว์เลี้ยง" />
                            </div>
                            <Input addonBefore="รายละเอียด" value={`${post.ServiceUser?.Pet?.Descript}`} />
                            <Input addonBefore="ชนิด" value={`${post.ServiceUser?.Pet?.Gene?.Type?.Name}`} />
                            <Input addonBefore="สายพันธุ์" value={`${post.ServiceUser?.Pet?.Gene?.Name}`} />
                            <Input addonBefore="อาหาร" value={`${post.ServiceUser?.Pet?.Food}`} />
                            <Input addonBefore="นิสัย" value={`${post.ServiceUser?.Pet?.Habit}`} />
                            <Input addonBefore="ยา" value={`${post.ServiceUser?.Pet?.Pill}`} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Title level={4}>ยังไม่มีโพสสำหรับการรอรับเลี้ยง</Title>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Poststatus;
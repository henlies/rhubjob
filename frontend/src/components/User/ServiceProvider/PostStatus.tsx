import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Layout, Row, Typography } from 'antd';
import { PostSInterface } from '../../../models/Post';
import { CreateNotify, GetPostbyPId } from '../../../services/HttpServices';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'antd';
import { NotifyInterface } from '../../../models/Notify';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const Poststatus: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const [post, setPost] = useState<PostSInterface[]>([]);
  const { postId } = useParams();
  const postIDparams: number | undefined = postId ? parseInt(postId, 10) : undefined;
  const [notify, setNotify] = useState<Partial<NotifyInterface>>({});
  const date = new Date();
  const [health, setHealth] = useState(1);
  const [clean, setClean] = useState(1);

  const getpost = async () => {
    let res = await GetPostbyPId(postIDparams);
    if (res) {
      setNotify({ ...notify, Health: 'สุขภาพดี', Clean: 'สะอาด', Text: 'ไม่มีข้อความอื่น' });
      setPost(res);
    }
  };

  const onChangeHealth = (e: RadioChangeEvent) => {
    setHealth(e.target.value);
    if (e.target.value === 1) {
      setNotify({ ...notify, Health: 'สุขภาพดี' });
    } else {
      setNotify({ ...notify, Health: '' });
    }
  };

  const onChangeClean = (e: RadioChangeEvent) => {
    setClean(e.target.value);
    if (e.target.value === 1) {
      setNotify({ ...notify, Clean: 'สะอาด' });
    } else if (e.target.value === 2) {
      setNotify({ ...notify, Clean: 'ปกติ' });
    } else {
      setNotify({ ...notify, Clean: 'สกปรก' });
    }
  };

  const submit = async () => {
    let data = {
      Text: notify.Text,
      Date: date,
      Health: notify.Health,
      Clean: notify.Clean,
      Post_ID: postIDparams,
    };

    let res = await CreateNotify(data);
    if (res) {
      window.location.reload();
    }
  }

  useEffect(() => {
    getpost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginRight: '60px', marginBottom: '24px', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col span={4}>
              <div style={{ textAlign: 'center' }}>
                <Link to={`/post`}>
                  <Button style={{ background: '#999999', color: 'white' }}>
                    กลับ
                  </Button>
                </Link>
              </div>
            </Col>
            <Col span={18}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>แจ้งสถานะความคืบหน้า</Title>
              </div>
            </Col>
            <Col span={4}>
              <div style={{ textAlign: 'center' }}>
                <Link to={`/history-post/${postIDparams}`}>
                  <Button style={{ background: 'orange', color: 'white' }}>
                    ประวัติความคืบหน้า
                  </Button>
                </Link>
              </div>
            </Col>
          </div>
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
                  <Row gutter={[16, 16]}>
                    <Col span={13}>
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <Card bordered={false} style={{ marginTop: '8px', minHeight: '36vh' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
                            <Title level={4}>แจ้งความคืบหน้า</Title>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                              <Form
                                initialValues={{ remember: true }}
                                style={{ maxWidth: '300px', margin: 'auto' }}
                              >
                                <Radio.Group style={{ marginBottom: '8px' }} onChange={onChangeClean} value={clean}>
                                  <Radio value={1}>สะอาด</Radio>
                                  <Radio value={2}>ปกติ</Radio>
                                  <Radio value={3}>สกปรก</Radio>
                                </Radio.Group>
                                <Radio.Group style={{ marginBottom: '8px' }} onChange={onChangeHealth} value={health}>
                                  <Radio value={1}>สุขภาพดี</Radio>
                                  <Radio value={2}>สุขภาพไม่ดี</Radio>
                                </Radio.Group>
                                {health === 2 && (
                                  <Input
                                    style={{ marginBottom: '8px' }}
                                    placeholder="โปรดระบุปัญหาสุขภาพ"
                                    disabled={false}
                                    onChange={(e) => {
                                      setNotify({ ...notify, Health: e.target.value });
                                    }}
                                  />
                                )}
                                <Input
                                  style={{ marginBottom: '8px' }}
                                  placeholder="ข้อความอื่นๆ"
                                  onChange={(e) => {
                                    setNotify({ ...notify, Text: e.target.value });
                                  }}
                                />
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  onClick={submit}
                                  style={{}}
                                >
                                  ยืนยัน
                                </Button>
                              </Form>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </Col>
                    <Col span={11}>
                      <Card bordered={false} style={{ marginTop: '8px', minHeight: '36vh' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                          <div style={{ margin: '12px' }}>
                            <Image style={{ borderRadius: '50%' }} width={50} src={post.ServiceProvider?.Pic} />
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
                                <Input addonBefore="วันที่" value={`${start} ถึง วันที่ ${end}`} />
                                <Input addonBefore="ราคา" value={`${post.Price} / วัน`} />
                                <Input addonBefore="รับเลี้ยง" value={post.Type?.Name} />
                              </div>
                            </div>
                          </Col>
                        </div>
                      </Card>
                    </Col>
                    <Col span={13}>
                      <Card bordered={false} style={{ marginTop: '8px', minHeight: '36vh' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
                          <Title level={4}>ข้อมูลผู้ใช้บริการ</Title>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                          <Col span={12}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Input addonBefore="ชื่อผู้ใช้บริการ" value={`${post.ServiceUser?.Prefix?.Name} ${post.ServiceUser?.Firstname} ${post.ServiceUser?.Lastname}`} />
                              <div style={{ marginBottom: '8px', marginTop: '8px' }}>
                                <Image style={{ borderRadius: '50%' }} width={95} src={post.ServiceUser?.Pic} />
                              </div>
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
                                <Input addonBefore="ที่อยู่" value={`${post.ServiceUser?.Address?.Descript} ต.${post.ServiceUser?.Address?.District?.Name} จ.${post.ServiceUser?.Address?.District?.Province?.Name} รหัสไปรษณี ${post.ServiceUser?.Address?.District?.Zipcode}`} />
                                <Input addonBefore="อีเมล" value={`${post.ServiceUser?.Email}`} />
                                <Input addonBefore="ไลน์" value={`${post.ServiceUser?.Line}`} />
                                <Input addonBefore="เบอร์โทรศัพท์" value={`${post.ServiceUser?.Phone}`} />
                              </div>
                            </div>
                          </Col>
                        </div>
                      </Card>
                    </Col>
                    <Col span={11}>
                      <Card bordered={false} style={{ marginTop: '8px', minHeight: '36vh', paddingBottom: '10px' }}>
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
                                <Image width={100} src={post.ServiceUser?.Pet?.Pic} />
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
                    </Col>
                  </Row>
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
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Layout, Modal, Row, Typography, message } from 'antd';
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
  const [api, Holder] = message.useMessage();

  const openAlert = (type: 'success' | 'error', content: string) => {
    api.open({
      type,
      content,
      duration: 5,
    });
  };

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
      Modal.confirm({
        title: 'ยืนยันการแจ้งสถานะความคืบหน้า',
        content: 'คุณแน่ใจหรือไม่ที่ต้องการจะแจ้งสถานะความคืบหน้า ?',
        onOk: async () => {
          openAlert('success', 'แจ้งสถานะความคืบหน้าเรียบร้อยแล้ว');
        },
      });
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
          <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
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
              <div style={{ textAlign: 'left' }}>
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

            return (
              <div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }}>
                  <Row gutter={[16, 16]}>

                    <Col span={12}>
                      {Holder}
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <Card bordered={false} style={{ marginTop: '8px', borderRadius: '8px', width: '100%', height: 375, maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
                            <Title style={{ marginBottom: 24 }} level={4}>แจ้งสถานะความคืบหน้า</Title>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                              <Form
                                initialValues={{ remember: true }}
                                style={{ maxWidth: '300px', margin: 'auto' }}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '12px' }}>
                                  <Radio.Group style={{ marginBottom: '4px' }} onChange={onChangeClean} value={clean}>
                                    <Radio value={1}>สะอาด</Radio>
                                    <Radio value={2}>ปกติ</Radio>
                                    <Radio value={3}>สกปรก</Radio>
                                  </Radio.Group>
                                  <Radio.Group style={{ marginBottom: '4px' }} onChange={onChangeHealth} value={health}>
                                    <Radio value={1}>สุขภาพดี</Radio>
                                    <Radio value={2}>สุขภาพไม่ดี</Radio>
                                  </Radio.Group>
                                </div>
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
                                  style={{ marginTop: '54px', width: '100%' }}
                                >
                                  ยืนยัน
                                </Button>
                              </Form>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <Card bordered={false} style={{ marginTop: '8px', borderRadius: '8px', width: '100%', height: 375, maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Image style={{ borderRadius: '50%' }} width={75} src={post.ServiceProvider?.Pic} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                              <Input readOnly addonBefore="ชื่อผู้รับเลี้ยง" value={`${post.ServiceProvider?.Firstname} ${post.ServiceProvider?.Lastname}`} style={{ flex: 1 }} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                            <Col span={24}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Input value="รายละเอียดผู้รับเลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                                <Input readOnly addonBefore="คำแนะนำ" value={`${post.Descript}`} />
                                <Input readOnly addonBefore="ตั้งแต่วันที่" value={`${start} ถึงวันที่ ${end}`} />
                                <Input readOnly addonBefore="ราคา" value={`${post.Price} บาท/วัน`} />
                                <Input readOnly addonBefore="รับเลี้ยง" value={post.Type?.Name} />
                              </div>
                            </Col>
                          </div>
                        </Card>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <Card bordered={false} style={{ marginTop: '8px', borderRadius: '8px', width: '100%', height: 375, maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Image style={{ borderRadius: '50%' }} width={95} src={post.ServiceUser?.Pic} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                              <Input readOnly addonBefore="ชื่อลูกค้า" value={`${post.ServiceUser?.Prefix?.Name}${post.ServiceUser?.Firstname} ${post.ServiceUser?.Lastname}`} style={{ flex: 1 }} />
                              <Input readOnly addonBefore="สถานะ" value={`${post.ServiceUser?.Descript}`} style={{ flex: 1 }} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                            <Col span={24}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Input value="ช่องทางการติดต่อ" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                                <Input readOnly addonBefore="ที่อยู่" value={`${post.ServiceUser?.Address?.Descript} ต.${post.ServiceUser?.Address?.District?.Name} จ.${post.ServiceUser?.Address?.District?.Province?.Name} รหัสไปรษณี ${post.ServiceUser?.Address?.District?.Zipcode}`} />
                                <Input readOnly addonBefore="อีเมล" value={`${post.ServiceUser?.Email}`} />
                                <Input readOnly addonBefore="ไลน์" value={`${post.ServiceUser?.Line}`} />
                                <Input readOnly addonBefore="เบอร์โทรศัพท์" value={`${post.ServiceUser?.Phone}`} />
                              </div>
                            </Col>
                          </div>
                        </Card>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <Card bordered={false} style={{ marginTop: '8px', borderRadius: '8px', width: '100%', height: 375, maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                            <Col span={12}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                                <div>
                                  <Input readOnly addonBefore="ชื่อสัตว์เลี้ยง" value={`${post.ServiceUser?.Pet?.Name}`} style={{ flex: 1 }} />
                                </div>
                                <div>
                                  <Image style={{ marginTop: 32 }} width={100} src={post.ServiceUser?.Pet?.Pic} />
                                </div>
                              </div>
                            </Col>
                            <Col span={12}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Input value="รายละเอียดสัตว์เลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                                <Input readOnly addonBefore="รายละเอียด" value={`${post.ServiceUser?.Pet?.Descript}`} />
                                <Input readOnly addonBefore="ชนิด" value={`${post.ServiceUser?.Pet?.Gene?.Type?.Name}`} />
                                <Input readOnly addonBefore="สายพันธุ์" value={`${post.ServiceUser?.Pet?.Gene?.Name}`} />
                                <Input readOnly addonBefore="อาหาร" value={`${post.ServiceUser?.Pet?.Food}`} />
                                <Input readOnly addonBefore="นิสัย" value={`${post.ServiceUser?.Pet?.Habit}`} />
                              </div>
                            </Col>
                          </div>
                        </Card>
                      </div>
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
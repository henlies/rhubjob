import React, { useEffect, useState } from 'react';
import { Card, Layout, Button, Modal, Col, Form, Input, Typography, DatePicker, Select, Avatar, Tabs, Menu, Dropdown, Space } from 'antd';

import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { Content } from 'antd/es/layout/layout';
import { PostCInterface, PostEInterface, PostSInterface } from '../../models/Post';
import { AcceptPost, CanclePost, CreatePost, DeletePost, GetPostShowIDstatus1, GetPostShowIDstatus2, GetPostShowIDstatus3, GetPostShowIDstatus4, GetPostShowIDstatus5, GetPostbyId, GetType, NonAcceptPost, UpdatePost } from '../../services/HttpServices';
import { TypeInterface } from '../../models/Type';
import TabPane from 'antd/es/tabs/TabPane';
import { DashOutlined } from '@ant-design/icons';

const Postpro: React.FC = () => {
  const { Option } = Select;
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;

  const [posts1, setPosts1] = useState<PostSInterface[]>([]);
  const [posts2, setPosts2] = useState<PostSInterface[]>([]);
  const [posts3, setPosts3] = useState<PostSInterface[]>([]);
  const [posts4, setPosts4] = useState<PostSInterface[]>([]);
  const [posts5, setPosts5] = useState<PostSInterface[]>([]);
  const [postc, setPostc] = useState<Partial<PostCInterface>>({});
  const [poste, setPoste] = useState<Partial<PostEInterface>>({});

  const [type, setType] = useState<TypeInterface[]>([]);

  const [postopen, setPostopen] = useState(false);
  const [postedit, setPostedit] = useState(false);
  const [postcancle, setPostCancle] = useState(false);


  const getpostshow = async () => {
    let res1 = await GetPostShowIDstatus1(numId);
    if (res1) {
      setPosts1(res1);
    }
    let res2 = await GetPostShowIDstatus2(numId);
    if (res2) {
      setPosts2(res2);
    }
    let res3 = await GetPostShowIDstatus3(numId);
    if (res3) {
      setPosts3(res3);
    }
    let res4 = await GetPostShowIDstatus4(numId);
    if (res4) {
      setPosts4(res4);
    }
    let res5 = await GetPostShowIDstatus5(numId);
    if (res5) {
      setPosts5(res5);
    }
  };

  const gettype = async () => {
    let res = await GetType();
    if (res) {
      setType(res);
    }
  };

  const handleSelectChangeCreate = (value?: number) => {
    setPostc({ ...postc, TypeID: value });
  };

  const handleSelectChangeEdit = (value?: number) => {
    setPoste({ ...poste, TypeID: value });
  };

  const handleRangeDateChangeCreate = (dates: RangeValue<Dayjs> | null) => {
    if (dates) {
      const [startFormatted, endFormatted] = dates.map((date) => date?.toDate());
      setPostc((prevPost) => ({ ...prevPost, Start: startFormatted, End: endFormatted }));
    }
  };

  const handleRangeDateChangEedit = (dates: RangeValue<Dayjs> | null) => {
    if (dates) {
      const [startFormatted, endFormatted] = dates.map((date) => date?.toDate());
      setPoste((prevPost) => ({ ...prevPost, Start: startFormatted, End: endFormatted }));
    }
  };

  const MenuOptions1 = (id?: number) => (
    <Menu>
      <Menu.Item key="update" onClick={() => openEdit(id)}>
        อัพเดท
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(id)}>
        ลบ
      </Menu.Item>
    </Menu>
  );
  const MenuOptions2 = (id?: number) => (
    <Menu>
      <Menu.Item key="update" onClick={() => handleAccept(id)}>
        รับงาน
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleNonAccept(id)}>
        ไม่รับงาน
      </Menu.Item>
    </Menu>
  );
  const MenuOptions3 = (id?: number) => (
    <Menu>
      {/* <Menu.Item key="update" onClick={() => openReport(id)}>
        รายงานความคืบหน้า
      </Menu.Item> */}
      <Menu.Item key="delete" onClick={() => openCancle(id)}>
        ยกเลิกงาน
      </Menu.Item>
    </Menu>
  );

  const openEdit = async (id?: number) => {
    let res = await GetPostbyId(id);
    if (res) {
      setPoste(res);
    }
    setPostedit(true);
  }

  const handleEdit = async () => {
    let data = {
      ID: poste.ID,
      Descript: poste.Descript,
      Start: poste.Start,
      End: poste.End,
      Price: poste.Price,
      TypeID: poste.TypeID,
    };
    let res = await UpdatePost(data);
    if (res) {
      setPostedit(!postedit)
      getpostshow();
    }
  }

  const handleCancle = async () => {
    if (postedit === true) {
      setPostedit(!postedit)
    } else {
      setPostCancle(!postcancle)
    }
    getpostshow();
  }

  const handleDelete = async (id?: number) => {
    await DeletePost(id);
    getpostshow();
  }

  const handleAccept = async (id?: number) => {
    await AcceptPost(id);
    getpostshow();
  }

  const handleNonAccept = async (id?: number) => {
    await NonAcceptPost(id);
    getpostshow();
  }

  const openCancle = async (id?: number) => {
    let res = await GetPostbyId(id);
    if (res) {
      setPoste(res);
    }
    setPostCancle(true);
  }

  const handleCanclePost = async () => {
    let note: string | undefined
    if (poste.Note === '') {
      note = 'ไม่สามารถรับงานได้ เนื่องจากเหตุฉุกเฉิน!';
    } else {
      note = poste.Note;
    }
    let data = {
      ID: poste.ID,
      Note: note,
    };
    let res = await CanclePost(data);
    if (res) {
      setPostCancle(!postcancle)
      getpostshow();
    }
  }

  const submit = async () => {
    let data = {
      Descript: postc.Descript,
      Start: postc.Start,
      End: postc.End,
      Price: postc.Price,
      TypeID: postc.TypeID,
      Service_ProviderID: numId,
      StatusID: 1,
    };
    let res = await CreatePost(data);
    if (res) {
      setPostopen(!postopen)
      getpostshow();
    }
  };

  console.log(postc);

  useEffect(() => {
    getpostshow();
    gettype();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '24px', alignItems: 'start' }}>
          <Col span={2}>
          </Col>
          <Col span={20}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3}>รายการรับเลี้ยงของคุณ</Title>
            </div>
          </Col>
          <Col span={2}>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => setPostopen(true)}>
                สร้างโพส
              </Button>
            </div>
          </Col>
        </div>
        <Tabs defaultActiveKey="1" tabPosition="right">
          <TabPane tab="รอเริ่มงาน" key="1">
            {posts1.length > 0 ? (
              posts1.map((posts1) => {
                const startDate = new Date(posts1.Start);
                const start = startDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                const endDate = new Date(posts1.End);
                const end = endDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <Card style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                      <div style={{ margin: '12px' }}>
                        <Avatar size={'large'} src={posts1.ServiceProvider?.Pic} />
                      </div>
                      <div style={{ marginRight: '20px' }}>
                        <Input addonBefore="ชื่อผู้ให้บริการ" value={`${posts1.ServiceProvider?.Firstname} ${posts1.ServiceProvider?.Lastname}`} />
                      </div>
                      <div>
                        <Input addonBefore="สถานะ" value={`${posts1.Status?.Name}`} />
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <Dropdown overlay={() => MenuOptions1(posts1.ID)} trigger={['click']}>
                          <Space>
                            <DashOutlined />
                          </Space>
                        </Dropdown>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ margin: '24px' }}>
                          <Input value="รายละเอียดการใช้บริการ" />
                          <div>
                            <Input addonBefore="คำแนะนำ" value={`${posts1.Descript}`} />
                            <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                            <Input addonBefore="ราคา" value={`${posts1.Price} / วัน`} />
                            <Input addonBefore="รับเลี้ยง" value={posts1.Type?.Name} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Title level={4}>ยังไม่มีโพสสำหรับการรอรับเลี้ยง</Title>
              </div>
            )}
          </TabPane>

          <TabPane tab="รอการยืนยัน" key="2">
            {posts2.length > 0 ? (
              posts2.map((posts2) => {
                const startDate = new Date(posts2.Start);
                const start = startDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                const endDate = new Date(posts2.End);
                const end = endDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <Card style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                      <div style={{ margin: '12px' }}>
                        <Avatar size={'large'} src={posts2.ServiceProvider?.Pic} />
                      </div>
                      <div style={{ marginRight: '20px' }}>
                        <Input addonBefore="ชื่อผู้ให้บริการ" value={`${posts2.ServiceProvider?.Firstname} ${posts2.ServiceProvider?.Lastname}`} />
                      </div>
                      <div>
                        <Input addonBefore="สถานะ" value={`${posts2.Status?.Name}`} />
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <Dropdown overlay={() => MenuOptions2(posts2.ID)} trigger={['click']}>
                          <Space>
                            <DashOutlined />
                          </Space>
                        </Dropdown>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ margin: '24px' }}>
                          <Input value="รายละเอียดการใช้บริการ" />
                          <div>
                            <Input addonBefore="คำแนะนำ" value={`${posts2.Descript}`} />
                            <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                            <Input addonBefore="ราคา" value={`${posts2.Price} / วัน`} />
                            <Input addonBefore="รับเลี้ยง" value={posts2.Type?.Name} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Title level={4}>ยังไม่มีโพสสำหรับการรอการยืนยัน</Title>
              </div>
            )}
          </TabPane>

          <TabPane tab="ดำเนินงาน" key="3">
            {posts3.length > 0 ? (
              posts3.map((posts3) => {
                const startDate = new Date(posts3.Start);
                const start = startDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                const endDate = new Date(posts3.End);
                const end = endDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <Card style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                      <div style={{ margin: '12px' }}>
                        <Avatar size={'large'} src={posts3.ServiceProvider?.Pic} />
                      </div>
                      <div style={{ marginRight: '20px' }}>
                        <Input addonBefore="ชื่อผู้ให้บริการ" value={`${posts3.ServiceProvider?.Firstname} ${posts3.ServiceProvider?.Lastname}`} />
                      </div>
                      <div>
                        <Input addonBefore="สถานะ" value={`${posts3.Status?.Name}`} />
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <Dropdown overlay={() => MenuOptions3(posts3.ID)} trigger={['click']}>
                          <Space>
                            <DashOutlined />
                          </Space>
                        </Dropdown>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ margin: '24px' }}>
                          <Input value="รายละเอียดการใช้บริการ" />
                          <div>
                            <Input addonBefore="คำแนะนำ" value={`${posts3.Descript}`} />
                            <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                            <Input addonBefore="ราคา" value={`${posts3.Price} / วัน`} />
                            <Input addonBefore="รับเลี้ยง" value={posts3.Type?.Name} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Title level={4}>ยังไม่มีโพสสำหรับการดำเนินงาน</Title>
              </div>
            )}
          </TabPane>

          <TabPane tab="งานสิ้นสุด" key="4">
            {posts4.length > 0 ? (
              posts4.map((posts4) => {
                const startDate = new Date(posts4.Start);
                const start = startDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                const endDate = new Date(posts4.End);
                const end = endDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <Card style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                      <div style={{ margin: '12px' }}>
                        <Avatar size={'large'} src={posts4.ServiceProvider?.Pic} />
                      </div>
                      <div style={{ marginRight: '20px' }}>
                        <Input addonBefore="ชื่อผู้ให้บริการ" value={`${posts4.ServiceProvider?.Firstname} ${posts4.ServiceProvider?.Lastname}`} />
                      </div>
                      <div>
                        <Input addonBefore="สถานะ" value={`${posts4.Status?.Name}`} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ margin: '24px' }}>
                          <Input value="รายละเอียดการใช้บริการ" />
                          <div>
                            <Input addonBefore="คำแนะนำ" value={`${posts4.Descript}`} />
                            <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                            <Input addonBefore="ราคา" value={`${posts4.Price} / วัน`} />
                            <Input addonBefore="รับเลี้ยง" value={posts4.Type?.Name} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Title level={4}>ยังไม่มีโพสสำหรับงานที่สิ้นสุด</Title>
              </div>
            )}
          </TabPane>

          <TabPane tab="ยกเลิกงาน" key="5">
            {posts5.length > 0 ? (
              posts5.map((posts5) => {
                const startDate = new Date(posts5.Start);
                const start = startDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                const endDate = new Date(posts5.End);
                const end = endDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <Card style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                      <div style={{ margin: '12px' }}>
                        <Avatar size={'large'} src={posts5.ServiceProvider?.Pic} />
                      </div>
                      <div style={{ marginRight: '20px' }}>
                        <Input addonBefore="ชื่อผู้ให้บริการ" value={`${posts5.ServiceProvider?.Firstname} ${posts5.ServiceProvider?.Lastname}`} />
                      </div>
                      <div>
                        <Input addonBefore="สถานะ" value={`${posts5.Status?.Name}`} />
                      </div>
                      <div>
                        <Input addonBefore="หมายเหตุ" value={`${posts5.Note}`} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                      <Col span={12}>
                        <div style={{ margin: '24px' }}>
                          <Input value="รายละเอียดการใช้บริการ" />
                          <div>
                            <Input addonBefore="คำแนะนำ" value={`${posts5.Descript}`} />
                            <Input addonBefore="วันที่" value={`${start} ถึงวันที่ ${end}`} />
                            <Input addonBefore="ราคา" value={`${posts5.Price} / วัน`} />
                            <Input addonBefore="รับเลี้ยง" value={posts5.Type?.Name} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <Title level={4}>ยังไม่มีโพสสำหรับการยกเลิกงาน</Title>
              </div>
            )}
          </TabPane>
        </Tabs>

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
                placeholder="คำอธิบาย"
                onChange={(e) => {
                  setPostc({ ...postc, Descript: e.target.value });
                }}
              />
              <div style={{ marginTop: '10px' }}>
                <RangePicker
                  placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                  onChange={(date) => handleRangeDateChangeCreate(date)}
                />
              </div>
              <Input
                style={{ marginTop: '10px' }}
                placeholder="ราคา"
                onChange={(e) => {
                  const price = parseInt(e.target.value);
                  setPostc({ ...postc, Price: price });
                }}
              />
              <Select
                style={{ marginTop: '10px' }}
                placeholder="พันธุ์สัตว์เลี้ยง"
                onChange={(handleSelectChangeCreate)}
              >
                {type.map((item: TypeInterface) => (
                  <Option value={item.ID}>{item.Name}</Option>
                ))}
              </Select>
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

        <Modal
          centered
          open={postedit}
          onCancel={() => {
            setPostedit(false);
          }}
          footer={null}
        >
          <Col>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>แก้ไขงาน</Title>
            </div>
            <Form
              initialValues={{ remember: true }}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Input
                placeholder="คำอธิบาย"
                value={poste.Descript}
                onChange={(e) => {
                  setPoste({ ...poste, Descript: e.target.value });
                }}
              />
              <div style={{ marginTop: '10px' }}>
                <RangePicker
                  placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                  value={[
                    poste.Start ? dayjs(poste.Start) : null,
                    poste.End ? dayjs(poste.End) : null,
                  ]}
                  onChange={(date) => handleRangeDateChangEedit(date)}
                />
              </div>
              <Input
                style={{ marginTop: '10px' }}
                placeholder="ราคา"
                value={poste.Price}
                onChange={(e) => {
                  const price = parseInt(e.target.value);
                  setPoste({ ...poste, Price: price });
                }}
              />
              <Select
                style={{ marginTop: '10px' }}
                placeholder="พันธุ์สัตว์เลี้ยง"
                value={poste.TypeID}
                onChange={(handleSelectChangeEdit)}
              >
                {type.map((item: TypeInterface) => (
                  <Option value={item.ID}>{item.Name}</Option>
                ))}
              </Select>
              <div>
                <Button
                  style={{ marginTop: '10px', width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleEdit}
                >
                  ยืนยัน
                </Button>
                <Button
                  style={{ marginTop: '10px', width: '100%' }}
                  type="primary" danger
                  htmlType="submit"
                  onClick={handleCancle}
                >
                  ยกเลิก
                </Button>
              </div>
            </Form>
          </Col>
        </Modal>

        <Modal
          centered
          open={postcancle}
          onCancel={() => {
            setPostCancle(false);
          }}
          footer={null}
        >
          <Col>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>ยกเลิกงาน</Title>
            </div>
            <Form
              initialValues={{ remember: true }}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Input
                placeholder="คำอธิบาย"
                disabled
                value={poste.Descript}
              />
              <div style={{ marginTop: '10px' }}>
                <RangePicker
                  placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                  disabled
                  value={[
                    poste.Start ? dayjs(poste.Start) : null,
                    poste.End ? dayjs(poste.End) : null,
                  ]}
                />
              </div>
              <Input
                style={{ marginTop: '10px' }}
                placeholder="ราคา"
                disabled
                value={poste.Price}
              />
              <Select
                style={{ marginTop: '10px' }}
                placeholder="พันธุ์สัตว์เลี้ยง"
                disabled
                value={poste.TypeID}
                onChange={(handleSelectChangeEdit)}
              >
                {type.map((item: TypeInterface) => (
                  <Option value={item.ID}>{item.Name}</Option>
                ))}
              </Select>
              <Input
                style={{ marginTop: '10px' }}
                placeholder="หมายเหตุ"
                defaultValue="ไม่สามารถรับงานได้ เนื่องจากเหตุฉุกเฉิน!"
                onChange={(e) => {
                  setPoste({ ...poste, Note: e.target.value });
                }}
              />
              <div>
                <Button
                  style={{ marginTop: '10px', width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleCanclePost}
                >
                  ยืนยัน
                </Button>
                <Button
                  style={{ marginTop: '10px', width: '100%' }}
                  type="primary" danger
                  htmlType="submit"
                  onClick={handleCancle}
                >
                  ยกเลิก
                </Button>
              </div>
            </Form>
          </Col>
        </Modal>

      </Content>
    </Layout >
  );
}

export default Postpro;
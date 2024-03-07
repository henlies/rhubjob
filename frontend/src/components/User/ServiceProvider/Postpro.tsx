import React, {
  useEffect,
  useState
} from 'react';
import {
  Col,
  Card,
  Form,
  Tabs,
  Modal,
  Input,
  Layout,
  Button,
  Select,
  Avatar,
  Tooltip,
  Typography,
  DatePicker,
} from 'antd';
import {
  PostEInterface,
  PostSInterface
} from '../../../models/Post';
import {
  GetType,
  UpdatePost,
  AcceptPost,
  CanclePost,
  FinishPost,
  GetPostbyId,
  NonAcceptPost,
  GetPostShowIDstatus2,
  GetPostShowIDstatus3,
  GetPostShowIDstatus4,
} from '../../../services/HttpServices';
import {
  StopOutlined,
  FileAddOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';
import { TypeInterface } from '../../../models/Type';
import { useNavigate } from 'react-router-dom';
import TabPane from 'antd/es/tabs/TabPane';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { Content } from 'antd/es/layout/layout';

const Postpro: React.FC = () => {
  const { Option } = Select;
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;

  const navigate = useNavigate();

  const [posts2, setPosts2] = useState<PostSInterface[]>([]);
  const [posts3, setPosts3] = useState<PostSInterface[]>([]);
  const [posts4, setPosts4] = useState<PostSInterface[]>([]);
  const [poste, setPoste] = useState<Partial<PostEInterface>>({});

  const [type, setType] = useState<TypeInterface[]>([]);

  const [postedit, setPostedit] = useState(false);
  const [postcancle, setPostCancle] = useState(false);


  const getpostshow = async () => {
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
  };

  const gettype = async () => {
    let res = await GetType();
    if (res) {
      setType(res);
    }
  };

  const handleSelectChangeEdit = (value?: number) => {
    setPoste({ ...poste, TypeID: value });
  };

  const handleRangeDateChangEedit = (dates: RangeValue<Dayjs> | null) => {
    if (dates) {
      const [startFormatted, endFormatted] = dates.map((date) => date?.toDate());
      setPoste((prevPost) => ({ ...prevPost, Start: startFormatted, End: endFormatted }));
    }
  };

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

  const handleAccept = async (id?: number) => {
    Modal.confirm({
      title: 'ยืนยันการรับงาน',
      content: 'คุณแน่ใจหรือไม่ที่จะรับงานนี้ ?',
      onOk: async () => {
        await AcceptPost(id);
        getpostshow();
      },
    });
  }

  const handleNonAccept = async (id?: number) => {
    Modal.confirm({
      title: 'ยกเลิกการยืนยัน',
      content: 'คุณแน่ใจหรือไม่ที่จะยกเลิกการรับงานนี้ ?',
      onOk: async () => {
        await NonAcceptPost(id);
        getpostshow();
      },
    });
  }

  const Finish = async (id?: number) => {
    Modal.confirm({
      title: 'ยืนยันการสำเร็จงาน',
      content: 'งานนี้สำเร็จแล้วใช่หรือไม่ ?',
      onOk: async () => {
        await FinishPost(id);
        getpostshow();
      },
    });
  }

  const openCancle = async (id?: number) => {
    let res = await GetPostbyId(id);
    if (res) {
      setPoste(res);
    }
    setPostCancle(true);
  }

  const gotostatuspage = (id?: number) => {
    navigate(`/post-status/${id}`);
  };

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

  useEffect(() => {
    getpostshow();
    gettype();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '24px', alignItems: 'center', justifyContent: 'center' }}>
          <Col span={20}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3}>รายการรับเลี้ยงของคุณ</Title>
            </div>
          </Col>
          <Col span={4}>
          </Col>
        </div>
        <Tabs defaultActiveKey="2" tabPosition="right">

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
                  <Card style={{ marginTop: '8px' }} actions={[
                    <Tooltip title="รับงาน" placement="bottom">
                      <CheckSquareOutlined style={{ color: 'green' }} onClick={() => handleAccept(posts2.ID)} />,
                    </Tooltip>,
                    <Tooltip title="ไม่รับงาน" placement="bottom">
                      <CloseSquareOutlined style={{ color: 'red' }} onClick={() => handleNonAccept(posts2.ID)} />,
                    </Tooltip>,
                  ]}>
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
                  <Card style={{ marginTop: '8px' }} actions={[
                    <Tooltip title="เสร็จสิ้นงาน" placement="bottom">
                      <CheckSquareOutlined style={{ color: 'green' }} onClick={() => Finish(posts3.ID)} />
                    </Tooltip>,
                    <Tooltip title="อัพเดทสเตตัส" placement="bottom">
                      <FileAddOutlined style={{ color: 'orange' }} onClick={() => gotostatuspage(posts3.ID)} />,
                    </Tooltip>,
                    <Tooltip title="ยกเลิกงาน" placement="bottom">
                      <StopOutlined style={{ color: 'red' }} onClick={() => openCancle(posts3.ID)} />,
                    </Tooltip>,
                  ]}>
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

          <TabPane tab="งานที่สิ้นสุดแล้ว" key="4">
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
        </Tabs>

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
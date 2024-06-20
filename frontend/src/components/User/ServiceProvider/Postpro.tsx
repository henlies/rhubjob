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
  Image,
  Select,
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
  HistoryOutlined,
} from '@ant-design/icons';
import { TypeInterface } from '../../../models/Type';
import { useNavigate } from 'react-router-dom';
import TabPane from 'antd/es/tabs/TabPane';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { Content } from 'antd/es/layout/layout';
import './Postpro.css';

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

  const date = new Date();

  // const [isDisabled, setIsDisabled] = useState(false);

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

  const history = async (id?: number) => {
    navigate(`/history-post/${id}`);
  };

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
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <Col>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>รายการรับเลี้ยงของคุณ</Title>
              </div>
            </Col>
          </div>
        </div>
        <Tabs defaultActiveKey="2" tabPosition="right">

          <TabPane tab="รอการยืนยัน" key="2">
            {posts2.length > 0 ? (
              posts2.map((posts2) => {

                return (
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <Card style={{ marginTop: '8px', borderRadius: '8px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false} actions={[
                      <Tooltip title="รับงาน" placement="bottom">
                        <CheckSquareOutlined style={{ color: 'green' }} onClick={() => handleAccept(posts2.ID)} />,
                      </Tooltip>,
                      <Tooltip title="ไม่รับงาน" placement="bottom">
                        <CloseSquareOutlined style={{ color: 'red' }} onClick={() => handleNonAccept(posts2.ID)} />,
                      </Tooltip>,
                    ]}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Image style={{ borderRadius: '50%' }} width={75} src={posts2.ServiceUser?.Pic} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginLeft: 32 }}>
                          <Input readOnly addonBefore="ชื่อลูกค้า" value={`${posts2.ServiceUser?.Firstname} ${posts2.ServiceUser?.Lastname}`} style={{ flex: 1 }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <Image width={100} src={posts2.ServiceUser?.Pet?.Pic} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                        <Col span={24}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Input value="รายละเอียดสัตว์เลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                            <Input readOnly addonBefore="ชื่อสัตว์เลี้ยง" value={`${posts2.ServiceUser.Pet?.Name}`} />
                            <Input readOnly addonBefore="ลักษณะนิสัย" value={`${posts2.ServiceUser.Pet?.Habit}`} />
                            <Input readOnly addonBefore="สายพันธุ์" value={`${posts2.ServiceUser?.Pet?.Gene?.Name}`} />
                            <Input readOnly addonBefore="คำแนะนำ" value={posts2.ServiceUser.Pet?.Descript} />
                          </div>
                        </Col>
                      </div>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div style={{ display: 'flex', marginTop: '64px', marginLeft: '160px', alignItems: 'center', justifyContent: 'center' }}>
                <Col>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4}>ยังไม่มีลูกค้าเลือกงานของคุณ</Title>
                  </div>
                </Col>
              </div>
            )}
          </TabPane>

          <TabPane tab="ดำเนินงาน" key="3">
            {posts3.length > 0 ? (
              posts3.map((posts3) => {
                const startDate = new Date(posts3.Start);
                const endDate = new Date(posts3.End);

                const monthMapping: { [key: string]: number } = {
                  Jan: 1,
                  Feb: 2,
                  Mar: 3,
                  Apr: 4,
                  May: 5,
                  Jun: 6,
                  Jul: 7,
                  Aug: 8,
                  Sep: 9,
                  Oct: 10,
                  Nov: 11,
                  Dec: 12
                };

                const dateNow = date.toDateString().split(' ');
                const monthNow = dateNow[1]; // Jun
                const dayNow = dateNow[2];   // 11
                const yearNow = dateNow[3];  // 2024
                const monthIntNow = monthMapping[monthNow];
                const dayIntNow = +dayNow;
                const yearIntNow = +yearNow;

                // =========================================================

                const dateEnd = endDate.toDateString().split(' ');
                const monthEnd = dateEnd[1]; // Dec
                const dayEnd = dateEnd[2];   // 07
                const yearEnd = dateEnd[3];  // 2023
                const monthIntEnd = monthMapping[monthEnd];
                const dayIntEnd = +dayEnd;
                const yearIntEnd = +yearEnd;

                let isDisabledFinish = true;
                if (yearIntNow > yearIntEnd) {
                  isDisabledFinish = false;
                } else if (yearIntNow === yearIntEnd) {
                  if (monthIntNow > monthIntEnd) {
                    isDisabledFinish = false;
                  } else if (monthIntNow === monthIntEnd) {
                    if (dayIntNow >= dayIntEnd) {
                      isDisabledFinish = false;
                    }
                  }
                }

                const dateStart = startDate.toDateString().split(' ');
                const monthStart = dateStart[1]; // Dec
                const dayStart = dateStart[2];   // 07
                const yearStart = dateStart[3];  // 2023
                const monthIntStart = monthMapping[monthStart];
                const dayIntStart = +dayStart;
                const yearIntStart = +yearStart;

                let isDisabledCancle = true;
                if (yearIntNow <= yearIntStart) {
                  if (monthIntNow <= monthIntStart) {
                    if (dayIntNow <= dayIntStart) {
                      isDisabledCancle = false;
                    }
                  }
                }

                return (
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <Card style={{ marginTop: '8px', borderRadius: '8px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false} actions={[
                      <Tooltip title="เสร็จสิ้นงาน" placement="bottom">
                        <CheckSquareOutlined
                          style={{ color: isDisabledFinish ? 'grey' : 'green' }}
                          onClick={() => !isDisabledFinish && Finish(posts3.ID)}
                        />
                      </Tooltip>,
                      <Tooltip title="อัพเดทสเตตัส" placement="bottom">
                        <FileAddOutlined style={{ color: 'orange' }} onClick={() => gotostatuspage(posts3.ID)} />,
                      </Tooltip>,
                      <Tooltip title="ยกเลิกงาน" placement="bottom">
                        <StopOutlined
                          style={{ color: isDisabledCancle ? 'grey' : 'red' }}
                          onClick={() => !isDisabledCancle && openCancle(posts3.ID)}
                        />,
                      </Tooltip>,
                    ]}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Image style={{ borderRadius: '50%' }} width={75} src={posts3.ServiceUser?.Pic} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginLeft: 32 }}>
                          <Input readOnly addonBefore="ชื่อลูกค้า" value={`${posts3.ServiceUser?.Firstname} ${posts3.ServiceUser?.Lastname}`} style={{ flex: 1 }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <Image width={100} src={posts3.ServiceUser?.Pet?.Pic} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                        <Col span={24}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Input value="รายละเอียดสัตว์เลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                            <Input readOnly addonBefore="ชื่อสัตว์เลี้ยง" value={`${posts3.ServiceUser.Pet?.Name}`} />
                            <Input readOnly addonBefore="ลักษณะนิสัย" value={`${posts3.ServiceUser.Pet?.Habit}`} />
                            <Input readOnly addonBefore="สายพันธุ์" value={`${posts3.ServiceUser?.Pet?.Gene?.Name}`} />
                            <Input readOnly addonBefore="คำแนะนำ" value={posts3.ServiceUser.Pet?.Descript} />
                          </div>
                        </Col>
                      </div>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '160px', alignItems: 'center', justifyContent: 'center' }}>
                <Col>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4}>ยังไม่มีงานที่กำลังดำเนิน</Title>
                  </div>
                </Col>
              </div>
            )}
          </TabPane>

          <TabPane tab="งานที่สิ้นสุดแล้ว" key="4">
            {posts4.length > 0 ? (
              posts4.map((posts4) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <Card style={{ marginTop: '8px', borderRadius: '8px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false} actions={[
                      <Tooltip title="ดูรายละเอียด" placement="bottom">
                        <HistoryOutlined style={{ color: 'orange' }} onClick={() => history(posts4.ID)} />,
                      </Tooltip>,
                    ]}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Image style={{ borderRadius: '50%' }} width={75} src={posts4.ServiceUser?.Pic} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginLeft: 32 }}>
                          <Input readOnly addonBefore="ชื่อลูกค้า" value={`${posts4.ServiceUser?.Firstname} ${posts4.ServiceUser?.Lastname}`} style={{ flex: 1 }} />
                          <Input readOnly addonBefore="สถานะงาน" value={`${posts4.Status?.Name}`} style={{ flex: 1 }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <Image width={100} src={posts4.ServiceUser?.Pet?.Pic} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '12px' }}>
                        <Col span={24}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Input value="รายละเอียดสัตว์เลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                            <Input readOnly addonBefore="ชื่อสัตว์เลี้ยง" value={`${posts4.ServiceUser.Pet?.Name}`} />
                            <Input readOnly addonBefore="ลักษณะนิสัย" value={`${posts4.ServiceUser.Pet?.Habit}`} />
                            <Input readOnly addonBefore="สายพันธุ์" value={`${posts4.ServiceUser?.Pet?.Gene?.Name}`} />
                            <Input readOnly addonBefore="คำแนะนำ" value={posts4.ServiceUser.Pet?.Descript} />
                          </div>
                        </Col>
                      </div>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div style={{ display: 'flex', marginBottom: '24px', marginTop: '64px', marginLeft: '160px', alignItems: 'center', justifyContent: 'center' }}>
                <Col>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4}>ยังไม่มีงานที่สิ้นสุด</Title>
                  </div>
                </Col>
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
              <Title style={{ marginBottom: 36 }} level={2}>ยกเลิกงาน</Title>
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
                  style={{ marginTop: '24px', width: '100%' }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleCanclePost}
                >
                  ยืนยัน
                </Button>
                <Button
                  style={{ marginTop: '10px', marginBottom: 8, width: '100%' }}
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
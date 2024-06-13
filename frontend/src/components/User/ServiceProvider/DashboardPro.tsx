import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import {
  Button,
  Col,
  Form,
  Modal,
  Input,
  Layout,
  Select,
  DatePicker,
  Typography,
  Card,
  Avatar,
  Tooltip,
  message,
} from 'antd';
import { PostCInterface, PostEInterface, PostSInterface } from '../../../models/Post';
import { CreatePost, DeletePost, GetPostShowIDstatus1, GetPostbyId, GetType, UpdatePost } from '../../../services/HttpServices';
import { TypeInterface } from '../../../models/Type';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const DashboardUser: React.FC = () => {
  const { Option } = Select;
  const { Content } = Layout;
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;

  const [posts, setPosts] = useState<PostSInterface[]>([]);
  const [postc, setPostc] = useState<Partial<PostCInterface>>({});
  const [poste, setPoste] = useState<Partial<PostEInterface>>({});
  const [type, setType] = useState<TypeInterface[]>([]);

  const [postopen, setPostopen] = useState(false);
  const [postedit, setPostedit] = useState(false);
  const [postcancle, setPostCancle] = useState(false);

  const getpost = async () => {
    let res = await GetPostShowIDstatus1(numId);
    if (res) {
      setPosts(res);
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

  const handleRangeDateChangEedit = (dates: RangeValue<Dayjs> | null) => {
    const currentDate = dayjs();

    if (dates) {
      const [startFormatted, endFormatted] = dates.map((date) => date?.toDate());
      const startDate = dayjs(startFormatted);
      const endDate = dayjs(endFormatted);

      if (startDate.isBefore(currentDate)) {
        message.error('วันที่ต้องการเริ่มงานต้องไม่น้อยกว่าปัจจุบัน');
        setPoste((prevPost) => ({ ...prevPost, Start: undefined, End: undefined }));
        return;
      }

      if (endDate.isBefore(currentDate)) {
        message.error('วันที่ต้องการสิ้นสุดงานต้องไม่น้อยกว่าปัจจุบัน');
        setPoste((prevPost) => ({ ...prevPost, Start: undefined, End: undefined }));
        return;
      }

      setPoste((prevPost) => ({ ...prevPost, Start: startFormatted, End: endFormatted }));
    }
  };

  const handleRangeDateChangeCreate = (dates: RangeValue<Dayjs> | null) => {
    const currentDate = dayjs();

    if (dates) {
      const [startFormatted, endFormatted] = dates.map((date) => date?.toDate());
      const startDate = dayjs(startFormatted);
      const endDate = dayjs(endFormatted);

      if (startDate.isBefore(currentDate)) {
        message.error('วันที่ต้องการเริ่มงานต้องไม่น้อยกว่าปัจจุบัน');
        setPostc((prevPost) => ({ ...prevPost, Start: undefined, End: undefined }));
        return;
      }

      if (endDate.isBefore(currentDate)) {
        message.error('วันที่ต้องการสิ้นสุดงานต้องไม่น้อยกว่าปัจจุบัน');
        setPostc((prevPost) => ({ ...prevPost, Start: undefined, End: undefined }));
        return;
      }

      setPostc((prevPost) => ({ ...prevPost, Start: startFormatted, End: endFormatted }));
    }
  };

  const handleDelete = async (id?: number) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ที่ต้องการลบโพสนี้ ?',
      onOk: async () => {
        await DeletePost(id);
        getpost();
      },
    });
  }

  const openEdit = async (id?: number) => {
    let res = await GetPostbyId(id);
    if (res) {
      setPoste(res);
    }
    setPostedit(true);
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

    console.log(data.Price);

    if (data.Start === undefined || data.End === undefined) {
      message.error('วันที่ไม่ถูกต้อง');
    } else if (data.Price === undefined) {
      message.error('กรุณาใส่ราคาต่อวัน');
    } else if (data.TypeID === undefined) {
      message.error('กรุณาเลือกชนิดสัตว์เลี้ยง');
    } else {
      let res = await CreatePost(data);
      if (res) {
        setPostopen(!postopen)
        getpost();
      }
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

    if (data.Start === undefined || data.End === undefined) {
      message.error('วันที่ไม่ถูกต้อง');
    } else {
      let res = await UpdatePost(data);
      if (res) {
        setPostedit(!postedit)
        getpost();
      }
    }
  };

  const handleCancle = async () => {
    if (postedit === true) {
      setPostedit(!postedit)
    } else {
      setPostCancle(!postcancle)
    }
    getpost();
  }

  useEffect(() => {
    getpost();
    gettype();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col span={2}>
              <div style={{ textAlign: 'center', }}>
                <Button onClick={() => setPostopen(true)} style={{ background: '#1677ff', color: 'white' }}>
                  สร้างโพส
                </Button>
              </div>
            </Col>
            <Col span={20}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>หน้าหลัก</Title>
              </div>
            </Col>
            <Col span={2}>
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
                  <Tooltip title="แก้ไขงาน" placement="bottom">
                    <EditOutlined style={{ color: 'orange' }} onClick={() => openEdit(posts.ID)} />,
                  </Tooltip>,
                  <Tooltip title="ลบงาน" placement="bottom">
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(posts.ID)} />,
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
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Title level={4}>ยังไม่มีโพสสำหรับการรอรับเลี้ยง</Title>
          </div>
        )}
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
                type="number"
                placeholder="ราคาต่อวัน"
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
                type="number"
                placeholder="ราคาต่อวัน"
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

      </Content>
    </Layout>
  );
};

export default DashboardUser;
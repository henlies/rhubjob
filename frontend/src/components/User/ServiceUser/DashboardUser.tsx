import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Modal,
  Input,
  Button,
  Layout,
  Select,
  DatePicker,
  Typography,
  DatePickerProps,
  Card,
  Flex,
  Rate,
  Avatar,
  Image,
  Row,
  Upload,
  message,
} from 'antd';
import {
  GetBlood,
  GetPrefix,
  GetGender,
  GetServiceUserByUID,
  UpdateServiceDetail,
  GetServiceProviderByUID,
  listserviceprovider,
  AllofProvider,
  AllofPostDog,
  AllofPostCat,
  RateID,
  CountID,
} from '../../../services/HttpServices';
import { ServiceProviderInterface, UserInterface } from '../../../models/User';
import { BloodInterface } from '../../../models/Blood';
import { GenderInterface } from '../../../models/Gender';
import { PrefixInterface } from '../../../models/Prefix';
import { PetInterface } from '../../../models/Pet';
import { PostSInterface } from '../../../models/Post';
import { UploadOutlined } from '@ant-design/icons';
import './DashboardUser.css'
const DashboardUser: React.FC = () => {

  const { Option } = Select;
  const { Content } = Layout;
  const { Title } = Typography;

  const uid = localStorage.getItem("id")
  const role = localStorage.getItem("role")
  const name = localStorage.getItem("name")

  const [useru, setUseru] = useState<Partial<UserInterface>>({});
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [blood, setBlood] = useState<BloodInterface[]>([]);
  const [provider, setProvider] = useState<ServiceProviderInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaluser, setModalUser] = useState(false);
  const [modalprovider, setModalProvider] = useState(false);

  const [providernum, setProvidernum] = useState<UserInterface[]>([]);
  const [dog, setDog] = useState<PetInterface[]>([]);
  const [cat, setCat] = useState<PetInterface[]>([]);

  const [rate, setRate] = useState(0);
  const [count, setCount] = useState<PostSInterface[]>([]);

  const [api, Holder] = message.useMessage();

  const openAlert = (type: 'success' | 'error', content: string) => {
    api.open({
      type,
      content,
      duration: 5,
    });
  };

  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleUpload = (info: any) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result && typeof event.target.result === 'string') {
        setBase64Image(event.target.result);
      }
    };

    if (info.file.originFileObj) {
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const getuser = async () => {
    let res = await AllofProvider();
    if (res) {
      setProvidernum(res);
    }
  };

  const getdog = async () => {
    let res = await AllofPostDog();
    if (res) {
      setDog(res);
    }
  };

  const getcat = async () => {
    let res = await AllofPostCat();
    if (res) {
      setCat(res);
    }
  };

  const getserviceuserbyuid = async () => {
    let res = await GetServiceUserByUID(uid);
    if (res) {
      setUseru(res);
      getprefix();
      getgender();
      getblood();
    }
  }
  const getserviceproviderbyuid = async () => {
    let res = await GetServiceProviderByUID(uid);
    if (res) {
      setUseru(res);
      getprefix();
      getgender();
      getblood();
    }
  }

  const getprefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefix(res);
    }
  }

  const getgender = async () => {
    let res = await GetGender();
    if (res) {
      setGender(res);
    }
  }

  const getblood = async () => {
    let res = await GetBlood();
    if (res) {
      setBlood(res);
    }
  }

  const getserviceprovider = async () => {
    let res = await listserviceprovider();
    if (res) {
      setProvider(res);
    }
  };

  const handleSelectPrefix = (value?: number) => {
    setUseru({ ...useru, PrefixID: value });
  };

  const handleSelectGender = (value?: number) => {
    setUseru({ ...useru, GenderID: value });
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    const convertedDate: Date | undefined = date ? date.toDate() : undefined;
    setUseru((prevUser) => ({ ...prevUser, Birth: convertedDate }));
  };

  const handleSelectBlood = (value?: number) => {
    setUseru({ ...useru, BloodID: value });
  };

  const showModal = async (id?: number) => {
    setIsModalVisible(true);
    let res1 = await RateID(id);
    if (res1) {
      setRate(res1.total_rate);
    }
    let res2 = await CountID(id);
    if (res2) {
      setCount(res2);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submit = async () => {
    if (
      useru.PersonalID &&
      useru.PrefixID &&
      useru.Firstname &&
      useru.Lastname &&
      useru.Nickname &&
      useru.GenderID &&
      useru.Phone &&
      useru.Email &&
      useru.Line &&
      useru.Birth &&
      useru.BloodID &&
      useru.Descript
    ) {
      let data = {
        ID: useru.ID,
        PersonalID: useru.PersonalID,
        PrefixID: useru.PrefixID,
        Firstname: useru.Firstname,
        Lastname: useru.Lastname,
        Nickname: useru.Nickname,
        GenderID: useru.GenderID,
        Phone: useru.Phone,
        Email: useru.Email,
        Line: useru.Line,
        Birth: useru.Birth,
        BloodID: useru.BloodID,
        Descript: useru.Descript,
        Pic: useru.Pic,
      };
      let res = await UpdateServiceDetail(data);
      if (res) {
        setModalUser(!modaluser)
        window.location.reload();
      }
    } else {
      openAlert('error', 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง!');
    }
  };

  useEffect(() => {
    getuser();
    getdog();
    getcat();
    getserviceprovider();

    if (role === 'ผู้ใช้บริการ') {
      if (name === '') {
        setModalUser(true);
        getserviceuserbyuid();
      }
    } else {
      if (name === '') {
        setModalProvider(true);
        getserviceproviderbyuid();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <Col >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ข้อมูลการรับเลี้ยง</Title>
              </div>
            </Col>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderRadius: '10px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} title="จำนวนผู้รับเลี้ยง" bordered={false}>
                <p style={{ fontSize: '24px', textAlign: 'center', margin: 0 }}>{providernum.length}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} title="จำนวนโพสเกี่ยวกับสุนัข" bordered={false}>
                <p style={{ fontSize: '24px', textAlign: 'center', margin: 0 }}>{dog.length}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} title="จำนวนโพสเกี่ยวกับแมว" bordered={false}>
                <p style={{ fontSize: '24px', textAlign: 'center', margin: 0 }}>{cat.length}</p>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: 24 }}>
          {provider.map((prov) => (
            <Card
              title={`${prov.Prefix?.Name} ${prov.Firstname} ${prov.Lastname}`}
              bordered={false}
              style={{ width: 300, textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              onClick={() => showModal(prov.ID)}
            >
              <Avatar
                size={200}
                src={prov.Pic}
              />
            </Card>
          ))}
        </div>
        <Modal
          title="คะแนนการให้บริการของผู้รับเลี้ยง"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>
              ปิด
            </Button>
          ]}
        >
          <Flex gap="middle" vertical>
            <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 16 }}>
              <Rate disabled value={rate / count.length} />
              <p>คะแนนเฉลี่ย: {rate / count.length}</p>
            </div>
          </Flex>
        </Modal>

        <Modal
          centered
          open={modaluser}
          footer={null}
          closeIcon={null}
        >
          {Holder}
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>เพิ่มข้อมูลของท่านเพื่อเข้าใช้ระบบ</Title>
            <Form
              initialValues={{ remember: true }}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <div style={{ margin: '10px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {base64Image ? (
                  <Image src={base64Image} style={{ width: 100, marginBottom: 8 }} />
                ) : (
                  <div style={{ margin: '10px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image src={useru.Pic} style={{ width: 100, marginBottom: 8 }} />
                  </div>
                )}
                <Upload onChange={handleUpload} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>เลือกรูปภาพ</Button>
                </Upload>
              </div>
              <Form.Item>
                <Input
                  type='number'
                  placeholder="รหัสบัตรประชาชน"
                  onChange={(e) => {
                    const inputPersonalID = e.target.value;
                    const personalID = parseInt(inputPersonalID);
                    if (personalID.toString().length <= 13) {
                      setUseru({ ...useru, PersonalID: personalID });
                    }

                  }}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  placeholder="คำนำหน้าชื่อ"
                  onChange={handleSelectPrefix}
                >
                  {prefix.map((item: PrefixInterface) => (
                    <Option key={item.ID} value={item.ID}>{item.Name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="ชื่อจริง"
                  onChange={(e) => {
                    setUseru({ ...useru, Firstname: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="นามสกุล"
                  onChange={(e) => {
                    setUseru({ ...useru, Lastname: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="ชื่อเล่น"
                  onChange={(e) => {
                    setUseru({ ...useru, Nickname: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  placeholder="เพศ"
                  onChange={handleSelectGender}
                >
                  {gender.map((item: GenderInterface) => (
                    <Option key={item.ID} value={item.ID}>{item.Name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Input
                  type='number'
                  placeholder="เบอร์โทร"
                  onChange={(e) => {
                    const inputPhone = e.target.value;
                    if (inputPhone.length === 10) {
                      setUseru({ ...useru, Phone: inputPhone });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="อีเมล"
                  onChange={(e) => {
                    const inputEmail = e.target.value;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(inputEmail)) {
                      setUseru({ ...useru, Email: inputEmail });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="ไลน์"
                  onChange={(e) => {
                    setUseru({ ...useru, Line: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="วันเกิด"
                  onChange={onChangeDate}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  placeholder="กรุ๊ปเลือด"
                  onChange={handleSelectBlood}
                >
                  {blood.map((item: BloodInterface) => (
                    <Option key={item.ID} value={item.ID}>{item.Name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  placeholder="หมายเหตุ"
                  onChange={(e) => {
                    setUseru({ ...useru, Descript: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  onClick={submit}
                >
                  เพิ่มข้อมูล
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>


        <Modal
          centered
          open={modalprovider}
          footer={null}
          closeIcon={null}
        >
          <Col>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>เพิ่มข้อมูล (ผู้ให้บริการ)</Title>
            </div>
          </Col>
        </Modal>

      </Content>
    </Layout>


  );
};

export default DashboardUser;
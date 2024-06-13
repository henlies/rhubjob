import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Modal,
  Input,
  Button,
  Layout,
  Select,
  Upload,
  message,
  DatePicker,
  Typography,
  DatePickerProps,
  Card,
  Image,
} from 'antd';
import {
  GetBlood,
  GetPrefix,
  GetGender,
  GetServiceUserByUID,
  UpdateServiceDetail,
  GetServiceProviderByUID,
  listserviceprovider,
} from '../../../services/HttpServices';
import { ServiceProviderInterface, UserInterface } from '../../../models/User';
import { BloodInterface } from '../../../models/Blood';
import { GenderInterface } from '../../../models/Gender';
import { PrefixInterface } from '../../../models/Prefix';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

// picture
type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const DashboardUser: React.FC = () => {
  // picture
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submit = async () => {
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
  }

  // picture
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        setUseru({ ...useru, Pic: url });
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
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
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ข้อมูลการรับเลี้ยง</Title>
              </div>
            </Col>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {provider.map((prov) => (
            <Card
              title={`${prov.Prefix?.Name} ${prov.Firstname} ${prov.Lastname}`}
              bordered={false}
              style={{ width: 300, textAlign: 'center', cursor: 'pointer' }}
              onClick={showModal}
            >
              <Image
                width={200}
                src={prov.Pic}
                preview={false}
              />
            </Card>
          ))}
        </div>
        <Modal
          title="รายละเอียดสัตว์เลี้ยง"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>ข้อมูลเพิ่มเติมเกี่ยวกับสัตว์เลี้ยง...</p>
          <p>คุณสามารถเพิ่มรายละเอียดต่างๆ ที่นี่</p>
        </Modal>

        <Modal
          centered
          open={modaluser}
          footer={null}
          closeIcon={null}
        >
          <Col>
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>เพิ่มข้อมูล (ผู้ใช้บริการ)</Title>
              <Col>
                <Form
                  initialValues={{ remember: true }}
                  style={{ maxWidth: '300px', margin: 'auto' }}
                >
                  <Input
                    placeholder="รหัสบัตรประชาชน"
                    onChange={(e) => {
                      const personal = parseInt(e.target.value);
                      setUseru({ ...useru, PersonalID: personal });
                    }}
                  />
                  <Select
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    placeholder="คำนำหน้าชื่อ"
                    onChange={(handleSelectPrefix)}
                  >
                    {prefix.map((item: PrefixInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    placeholder="ชื่อจริง"
                    onChange={(e) => {
                      setUseru({ ...useru, Firstname: e.target.value });
                    }}
                  />
                  <Input
                    placeholder="นามสกุล"
                    onChange={(e) => {
                      setUseru({ ...useru, Lastname: e.target.value });
                    }}
                  />
                  <Input
                    placeholder="ชื่อเล่น"
                    onChange={(e) => {
                      setUseru({ ...useru, Nickname: e.target.value });
                    }}
                  />
                  <Select
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    placeholder="เพศ"
                    onChange={(handleSelectGender)}
                  >
                    {gender.map((item: GenderInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    placeholder="เบอร์โทร"
                    onChange={(e) => {
                      setUseru({ ...useru, Phone: e.target.value });
                    }}
                  />
                  <Input
                    placeholder="อีเมล"
                    onChange={(e) => {
                      setUseru({ ...useru, Email: e.target.value });
                    }}
                  />
                  <Input
                    placeholder="ไลน์"
                    onChange={(e) => {
                      setUseru({ ...useru, Line: e.target.value });
                    }}
                  />
                  <div style={{ marginTop: '10px' }}>
                    <DatePicker
                      placeholder="วันเกิด"
                      onChange={onChangeDate}
                    />
                  </div>
                  <Select
                    style={{ marginTop: '10px' }}
                    placeholder="กรุ๊ปเลือด"
                    onChange={(handleSelectBlood)}
                  >
                    {blood.map((item: BloodInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    placeholder="หมายเหตุ"
                    onChange={(e) => {
                      setUseru({ ...useru, Descript: e.target.value });
                    }}
                  />
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                  <div>
                    <Button
                      style={{ marginTop: '10px', width: '100%' }}
                      type="primary"
                      htmlType="submit"
                      onClick={submit}
                    >
                      เพิ่มข้อมูล
                    </Button>
                  </div>
                </Form>
              </Col>
            </div>
          </Col>
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
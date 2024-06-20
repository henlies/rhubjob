/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
  Form,
  Input,
  Anchor,
  Switch,
  Button,
  Upload,
  Layout,
  Select,
  message,
  DatePicker,
  Typography,
  Card,
  Image,
} from 'antd';
import {
  GetGene,
  GetType,
  GetBlood,
  GetPetID,
  CreatePet,
  GetGender,
  UpdatePet,
  GetPrefix,
  GetProvicne,
  GetDistricts,
  GetAddressID,
  CreateAddress,
  GetZipcodeDID,
  UpdateAddress,
  UpdateServiceDetail,
  GetServiceUserByUID,
} from '../../../services/HttpServices';
import { PetInterface } from '../../../models/Pet';
import { UserInterface } from '../../../models/User';
import { GeneInterface } from '../../../models/Gene';
import { TypeInterface } from '../../../models/Type';
import { BloodInterface } from '../../../models/Blood';
import { GenderInterface } from '../../../models/Gender';
import { PrefixInterface } from '../../../models/Prefix';
import { AddressInterface } from '../../../models/Address';
import { ProvinceInterface } from '../../../models/Province';
import { DistrictInterface } from '../../../models/District';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Content } = Layout;
const { Title } = Typography;

const Profile: React.FC = () => {
  const uid = localStorage.getItem('id');
  const petid = localStorage.getItem('petid');
  const addressid = localStorage.getItem('addressid');

  const [useru, setUseru] = useState<Partial<UserInterface>>({});
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [blood, setBlood] = useState<BloodInterface[]>([]);

  const [petu, setPetu] = useState<Partial<PetInterface>>({});
  const [type, setType] = useState<TypeInterface[]>([]);
  const [gene, setGene] = useState<GeneInterface[]>([]);

  const [addressu, setAddressu] = useState<Partial<AddressInterface>>({});
  const [province, setProvince] = useState<ProvinceInterface[]>([]);
  const [district, setDistricts] = useState<DistrictInterface[]>([]);
  const [zipcode, setZipcode] = useState<string>('');

  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [base64Image2, setBase64Image2] = useState<string | null>(null);

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

  const handleUpload2 = (info: any) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result && typeof event.target.result === 'string') {
        setBase64Image2(event.target.result);
      }
    };

    if (info.file.originFileObj) {
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const fetchInfoAll = async () => {
    if (petid !== '0') {
      if (addressid !== '0') {
        await getAddressID();
        await getPetID();
        await getServiceUserByUID();
      } else {
        await getPetID();
        await getServiceUserByUID();
      }
    } else {
      await getServiceUserByUID();
    }
  };

  const getServiceUserByUID = async () => {
    let res = await GetServiceUserByUID(uid);
    if (res) {
      setUseru(res);
      await getPrefix();
      await getGender();
      await getBlood();
      await getType();
      await getProvince();
      setZipcode(res.Address?.District?.Zipcode || '');
    }
  };

  const getPrefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefix(res);
    }
  };

  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGender(res);
    }
  };

  const getBlood = async () => {
    let res = await GetBlood();
    if (res) {
      setBlood(res);
    }
  };

  const getPetID = async () => {
    let res = await GetPetID(petid);
    if (res) {
      setPetu(res);
      await getGene(res.TypeID);
    }
  };

  const getType = async () => {
    let res = await GetType();
    if (res) {
      setType(res);
    }
  };

  const getGene = async (id?: number) => {
    let res = await GetGene(id);
    if (res) {
      setGene(res);
    }
  };

  const getAddressID = async () => {
    let res = await GetAddressID(addressid);
    if (res) {
      setAddressu(res);
      await getDistrict(res.ProvinceID);
    }
  };

  const getProvince = async () => {
    let res = await GetProvicne();
    if (res) {
      setProvince(res);
    }
  };

  const getDistrict = async (id?: number) => {
    let res = await GetDistricts(id);
    if (res) {
      setDistricts(res);
    }
  };

  const getZipcodeDID = async (id?: number) => {
    let res = await GetZipcodeDID(id);
    if (res) {
      setZipcode(res);
    }
  };

  const onChangeDate = (date: any) => {
    const convertedDate = date ? date.toDate() : undefined;
    setUseru((prevUser) => ({ ...prevUser, Birth: convertedDate }));
  };

  const handleSelectPrefix = (value?: number) => {
    setUseru({ ...useru, PrefixID: value });
  };

  const handleSelectGender = (value?: number) => {
    setUseru({ ...useru, GenderID: value });
  };

  const handleSelectBlood = (value?: number) => {
    setUseru({ ...useru, BloodID: value });
  };

  const handleSelectType = (value?: number) => {
    setPetu({ ...petu, TypeID: value });
    getGene(value);
  };

  const handleSelectGene = (value?: number) => {
    setPetu({ ...petu, GeneID: value });
  };

  const handleSelectProvince = (value?: number) => {
    setAddressu({ ...addressu, ProvinceID: value });
    getDistrict(value);
  };

  const handleSelectDistrict = (value?: number) => {
    setAddressu({ ...addressu, DistrictID: value });
    getZipcodeDID(value);
  };

  const submitDetail = async () => {
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
      Pic: base64Image || useru.Pic,
    };
    let res = await UpdateServiceDetail(data);
    if (res) {
      window.location.reload();
    }
  };

  const submitPet = async () => {
    let data = {
      ID: petu.ID,
      Name: petu.Name,
      TypeID: petu.TypeID,
      GeneID: petu.GeneID,
      Food: petu.Food,
      Habit: petu.Habit,
      Descript: petu.Descript,
      Pill: petu.Pill,
      Pic: base64Image2 || petu.Pic,
    };
    let res = petid === '0' ? await CreatePet(data) : await UpdatePet(data);
    if (res) {
      window.location.reload();
    }
  };

  const submitAddress = async () => {
    let data = {
      ID: addressu.ID,
      Descript: addressu.Descript,
      ProvinceID: addressu.ProvinceID,
      DistrictID: addressu.DistrictID,
    };
    let res = addressid === '0' ? await CreateAddress(data) : await UpdateAddress(data);
    if (res) {
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchInfoAll();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
          <Col span={2}>
            <div style={{ textAlign: 'center' }}>
              <Link
                to="/">
                <Button type="primary">กลับ</Button>
              </Link>
            </div>
          </Col>
          <Col span={20}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3}>จัดการโปรไฟล์</Title>
            </div>
          </Col>
          <Col span={2}>
          </Col>
        </div>

        <Card style={{ marginTop: '8px', borderRadius: '8px', width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false}>
          <Row gutter={24}>
            <Col span={24}>
              <Title level={3}>ข้อมูลส่วนตัว</Title>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col span={8}>
                    <div style={{ margin: '20px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {base64Image ? (
                        <Image src={base64Image} style={{ width: 75, marginBottom: 8 }} />
                      ) : (
                        <div style={{ margin: '20px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <Image src={useru.Pic} style={{ width: 75, marginBottom: 8 }} />
                        </div>
                      )}
                      <Upload onChange={handleUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>เลือกรูปภาพ</Button>
                      </Upload>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="เลขบัตรประชาชน">
                      <Input type='number' value={useru.PersonalID} onChange={(e) => {
                        const inputPersonalID = e.target.value;
                        const personalID = parseInt(inputPersonalID);
                        if (personalID.toString().length <= 13) {
                          setUseru({ ...useru, PersonalID: personalID });
                        }
                      }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="ชื่อเล่น">
                      <Input value={useru.Nickname} onChange={(e) => setUseru({ ...useru, Nickname: e.target.value })} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="คำนำหน้า">
                      <Select value={useru.PrefixID} onChange={handleSelectPrefix} style={{ width: '100%' }}>
                        {prefix.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="ชื่อจริง">
                      <Input value={useru.Firstname} onChange={(e) => setUseru({ ...useru, Firstname: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="นามสกุล">
                      <Input value={useru.Lastname} onChange={(e) => setUseru({ ...useru, Lastname: e.target.value })} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="เบอร์โทร">
                      <Input type='number' value={useru.Phone} onChange={(e) => {
                        const inputPhone = e.target.value;
                        if (inputPhone.length <= 10) {
                          setUseru({ ...useru, Phone: inputPhone });
                        }
                      }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="อีเมล">
                      <Input
                        type="text"
                        value={useru.Email}
                        onChange={(e) => {
                          const inputEmail = e.target.value;
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (emailRegex.test(inputEmail)) {
                            setUseru({ ...useru, Email: inputEmail });
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="ไลน์">
                      <Input value={useru.Line} onChange={(e) => setUseru({ ...useru, Line: e.target.value })} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="วันเกิด">
                      <DatePicker
                        style={{ width: '100%' }}
                        value={useru.Birth ? dayjs(useru.Birth) : undefined}
                        onChange={onChangeDate}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="กรุ๊ปเลือด">
                      <Select value={useru.BloodID} onChange={handleSelectBlood} style={{ width: '100%' }}>
                        {blood.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="เพศ">
                      <Select value={useru.GenderID} onChange={handleSelectGender} style={{ width: '100%' }}>
                        {gender.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="คำอธิบาย">
                      <Input.TextArea value={useru.Descript} onChange={(e) => setUseru({ ...useru, Descript: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Button style={{ marginTop: 32 }} type="primary" onClick={submitDetail}>
                        บันทึก
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: '16px', borderRadius: '8px', width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false}>
          <Row gutter={24}>
            <Col span={24}>
              <Title level={3}>ข้อมูลสัตว์เลี้ยง</Title>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col span={8}>
                    <div style={{ margin: '20px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {base64Image2 ? (
                        <Image src={base64Image2} style={{ width: 75, marginBottom: 8 }} />
                      ) : (
                        <div style={{ margin: '20px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <Image src={petu.Pic} style={{ width: 75, marginBottom: 8 }} />
                        </div>
                      )}
                      <Upload onChange={handleUpload2} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>เลือกรูปภาพ</Button>
                      </Upload>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="ชื่อสัตว์เลี้ยง">
                      <Input value={petu.Name} onChange={(e) => setPetu({ ...petu, Name: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="ลักษณะนิสัย">
                      <Input value={petu.Habit} onChange={(e) => setPetu({ ...petu, Habit: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="ชนิด">
                      <Select value={petu.TypeID} onChange={handleSelectType} style={{ width: '100%' }}>
                        {type.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="พันธุ์">
                      <Select value={petu.GeneID} onChange={handleSelectGene} style={{ width: '100%' }}>
                        {gene.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="อาหาร">
                      <Input value={petu.Food} onChange={(e) => setPetu({ ...petu, Food: e.target.value })} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="ยา">
                      <Input value={petu.Pill} onChange={(e) => setPetu({ ...petu, Pill: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="คำอธิบาย">
                      <Input.TextArea value={petu.Descript} onChange={(e) => setPetu({ ...petu, Descript: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Button style={{ marginTop: 32 }} type="primary" onClick={submitPet}>
                        บันทึก
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: '16px', borderRadius: '8px', width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false}>
          <Row gutter={24}>
            <Col span={24}>
              <Title level={3}>ที่อยู่</Title>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="Description">
                      <Input value={addressu.Descript} onChange={(e) => setAddressu({ ...addressu, Descript: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Province">
                      <Select value={addressu.ProvinceID} onChange={handleSelectProvince} style={{ width: '100%' }}>
                        {province.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="District">
                      <Select value={addressu.DistrictID} onChange={handleSelectDistrict} style={{ width: '100%' }}>
                        {district.map((item) => (
                          <Option key={item.ID} value={item.ID}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="Zipcode">
                      <Input value={zipcode} readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Button style={{ marginTop: 32 }} type="primary" onClick={submitAddress}>
                        บันทึก
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout >
  );
};

export default Profile;

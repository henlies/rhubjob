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
  DatePickerProps,
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
import type { UploadProps } from 'antd';

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

const Profile: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [loadingpet, setLoadingPet] = useState(false);
  const [imageUrlpet, setImageUrlPet] = useState<string>();

  const { Option } = Select;
  const { Content } = Layout;
  const { Title } = Typography;

  const uid = localStorage.getItem("id")
  const petid = localStorage.getItem("petid")
  const addressid = localStorage.getItem("addressid")

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

  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);

  const fetchinfoall = async () => {
    if (petid !== "0") {
      if (addressid !== "0") {
        getaddressid();
        getpetid();
        getserviceuserbyuid();
      } else {
        getpetid();
        getserviceuserbyuid();
      }
    } else {
      getserviceuserbyuid();
    }
  }

  const getserviceuserbyuid = async () => {
    let res = await GetServiceUserByUID(uid);
    if (res) {
      setUseru(res);
      getprefix();
      getgender();
      getblood();
      gettype();
      getprovince();
      setZipcode(res.Address.District.Zipcode);
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

  const getpetid = async () => {
    let res = await GetPetID(petid);
    if (res) {
      setPetu(res);
      getgene(res.TypeID)
    }
  }

  const gettype = async () => {
    let res = await GetType();
    if (res) {
      setType(res);
    }
  }

  const getgene = async (id?: number) => {
    let res = await GetGene(id);
    if (res) {
      setGene(res);
    }
  }

  const getaddressid = async () => {
    let res = await GetAddressID(addressid);
    if (res) {
      setAddressu(res);
      getdistrict(res.ProvinceID);
    }
  }

  const getprovince = async () => {
    let res = await GetProvicne();
    if (res) {
      setProvince(res);
    }
  }

  const getdistrict = async (id?: number) => {
    let res = await GetDistricts(id);
    if (res) {
      setDistricts(res);
    }
  }

  const getzipcodedid = async (id?: number) => {
    let res = await GetZipcodeDID(id)
    if (res) {
      setZipcode(res)
    }
  }

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    const convertedDate: Date | undefined = date ? date.toDate() : undefined;
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
    getgene(value);
  };

  const handleSelectGene = (value?: number) => {
    setPetu({ ...petu, GeneID: value });
  };

  const handleSelectProvince = (value?: number) => {
    setAddressu({ ...addressu, ProvinceID: value });
    getdistrict(value);
  };

  const handleSelectDistrict = (value?: number) => {
    setAddressu({ ...addressu, DistrictID: value });
    getzipcodedid(value)
  };

  const submitdetail = async () => {
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
      window.location.reload();
    }
  }

  const submitpet = async () => {
    if (petid === '0') {
      let data = {
        ID: useru.ID,
        Name: petu.Name,
        TypeID: petu.TypeID,
        GeneID: petu.GeneID,
        Food: petu.Food,
        Habit: petu.Habit,
        Descript: petu.Descript,
        Pill: petu.Pill,
        Pic: petu.Pic,
      };
      let res = await CreatePet(data);
      if (res) {
        window.location.reload();
      }
    } else {
      let data = {
        ID: petu.ID,
        Name: petu.Name,
        TypeID: petu.TypeID,
        GeneID: petu.GeneID,
        Food: petu.Food,
        Habit: petu.Habit,
        Descript: petu.Descript,
        Pill: petu.Pill,
        Pic: petu.Pic,
      };
      let res = await UpdatePet(data);
      if (res) {
        window.location.reload();
      }
    }
  }

  const submitaddress = async () => {
    if (addressid === '0') {
      let data = {
        ID: useru.ID,
        Descript: addressu.Descript,
        ProvinceID: addressu.ProvinceID,
        DistrictID: addressu.DistrictID,
      };
      let res = await CreateAddress(data);
      if (res) {
        window.location.reload();
      }
    } else {
      let data = {
        ID: addressu.ID,
        Descript: addressu.Descript,
        ProvinceID: addressu.ProvinceID,
        DistrictID: addressu.DistrictID,
      };
      let res = await UpdateAddress(data);
      if (res) {
        window.location.reload();
      }
    }
  }

  const handleChangeServiceUser: UploadProps['onChange'] = (info) => {
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

  const handleChangePet: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingPet(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoadingPet(false);
        setImageUrlPet(url);
        setPetu({ ...petu, Pic: url });
      });
    }
  };

  const ChangeDisabled1 = () => {
    setDisabled1(!disabled1)
  };

  const ChangeDisabled2 = () => {
    setDisabled2(!disabled2)
  };

  const ChangeDisabled3 = () => {
    setDisabled3(!disabled3)
  };

  useEffect(() => {
    fetchinfoall();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ display: 'flex', marginBottom: '32px', marginTop: '32px', marginLeft: '24px', alignItems: 'center', justifyContent: 'center' }}>
          <Col span={2}>
            <div style={{ textAlign: 'center' }}>
              <Link to={`/`}>
                <Button style={{ background: '#999999', color: 'white' }}>
                  กลับ
                </Button>
              </Link>
            </div>
          </Col>
          <Col span={20}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3}>แก้ไขข้อมูลส่วนตัว</Title>
            </div>
          </Col>
          <Col span={2}>
          </Col>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={8}>
              <Content style={{ margin: '16px' }}>
                <Row>
                  <Col span={12} offset={6}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '4px' }}>
                      <Title level={3}>ข้อมูลส่วนตัว</Title>
                      <Switch onChange={ChangeDisabled1} />
                    </div>
                  </Col>
                </Row>
                <Form
                  initialValues={{ remember: true }}
                  style={{ maxWidth: '300px', margin: 'auto' }}
                  disabled={disabled1}
                >
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.PersonalID}
                    placeholder="รหัสบัตรประชาชน"
                    onChange={(e) => {
                      const personal = parseInt(e.target.value);
                      setUseru({ ...useru, PersonalID: personal });
                    }}
                  />
                  <Select
                    style={{ margin: '4px' }}
                    value={useru.PrefixID}
                    placeholder="คำนำหน้าชื่อ"
                    onChange={(handleSelectPrefix)}
                  >
                    {prefix.map((item: PrefixInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Firstname}
                    placeholder="ชื่อจริง"
                    onChange={(e) => {
                      setUseru({ ...useru, Firstname: e.target.value });
                    }}
                  />
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Lastname}
                    placeholder="นามสกุล"
                    onChange={(e) => {
                      setUseru({ ...useru, Lastname: e.target.value });
                    }}
                  />
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Nickname}
                    placeholder="ชื่อเล่น"
                    onChange={(e) => {
                      setUseru({ ...useru, Nickname: e.target.value });
                    }}
                  />
                  <Select
                    style={{ margin: '4px' }}
                    value={useru.GenderID}
                    placeholder="เพศ"
                    onChange={(handleSelectGender)}
                  >
                    {gender.map((item: GenderInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Phone}
                    placeholder="เบอร์โทร"
                    onChange={(e) => {
                      setUseru({ ...useru, Phone: e.target.value });
                    }}
                  />
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Email}
                    placeholder="อีเมล"
                    onChange={(e) => {
                      setUseru({ ...useru, Email: e.target.value });
                    }}
                  />
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Line}
                    placeholder="ไลน์"
                    onChange={(e) => {
                      setUseru({ ...useru, Line: e.target.value });
                    }}
                  />
                  <div style={{ margin: '4px' }}>
                    <DatePicker
                      value={useru.Birth ? dayjs(useru.Birth) : null}
                      placeholder="วันเกิด"
                      onChange={onChangeDate}
                    />
                  </div>
                  <Select
                    style={{ margin: '4px' }}
                    value={useru.BloodID}
                    placeholder="กรุ๊ปเลือด"
                    onChange={(handleSelectBlood)}
                  >
                    {blood.map((item: BloodInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    style={{ margin: '4px' }}
                    value={useru.Descript}
                    placeholder="หมายเหตุ"
                    onChange={(e) => {
                      setUseru({ ...useru, Descript: e.target.value });
                    }}
                  />
                  <div style={{ margin: '20px 4px' }}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/fbff9f74-4608-4cc3-b380-3cb87ac32806"
                      beforeUpload={beforeUpload}
                      onChange={handleChangeServiceUser}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} style={{ width: '100%' }} />
                      ) : (
                        <div>
                          <img src={useru.Pic} style={{ width: '100%' }} />
                        </div>
                      )}
                    </Upload>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={submitdetail}
                  >
                    ยืนยัน
                  </Button>
                </Form>
              </Content>
            </Col>
            <Col span={8}>
              <Content style={{ margin: '16px' }}>
                <Row>
                  <Col span={12} offset={6}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '4px' }}>
                      <Title level={3}>ข้อมูลสัตว์เลี้ยง</Title>
                      <Switch onChange={ChangeDisabled2} />
                    </div>
                  </Col>
                </Row>
                <Form
                  initialValues={{ remember: true }}
                  style={{ maxWidth: '300px', margin: 'auto' }}
                  disabled={disabled2}
                >
                  <Input
                    style={{ margin: '4px' }}
                    value={petu.Name}
                    placeholder="ชื่อ"
                    onChange={(e) => {
                      setPetu({ ...petu, Name: e.target.value });
                    }}
                  />
                  <Select
                    style={{ margin: '4px' }}
                    value={petu.TypeID}
                    placeholder="ชนิด"
                    onChange={(handleSelectType)}
                  >
                    {type.map((item: TypeInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Select
                    style={{ margin: '4px' }}
                    value={petu.GeneID}
                    placeholder="สายพันธุ์"
                    onChange={(handleSelectGene)}
                  >
                    {gene.map((item: GeneInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    style={{ margin: '4px' }}
                    value={petu.Food}
                    placeholder="อาหาร"
                    onChange={(e) => {
                      setPetu({ ...petu, Food: e.target.value });
                    }}
                  />
                  <Input
                    style={{ margin: '4px' }}
                    value={petu.Habit}
                    placeholder="นิสัย"
                    onChange={(e) => {
                      setPetu({ ...petu, Habit: e.target.value });
                    }}
                  />
                  <Input
                    style={{ margin: '4px' }}
                    value={petu.Descript}
                    placeholder="คำแนะนำ"
                    onChange={(e) => {
                      setPetu({ ...petu, Descript: e.target.value });
                    }}
                  />
                  <div style={{ margin: '40px 4px' }}>
                    <Upload
                      // name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      beforeUpload={beforeUpload}
                      onChange={handleChangePet}
                    >
                      {imageUrlpet ? (
                        <img src={imageUrlpet} style={{ width: '100%' }} />
                      ) : (
                        <div>
                          <img src={petu.Pic} style={{ width: '100%' }} />
                        </div>
                      )}
                    </Upload>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={submitpet}
                  >
                    ยืนยัน
                  </Button>
                </Form>
              </Content>
            </Col>
            <Col span={8}>
              <Content style={{ margin: '16px' }}>
                <Row>
                  <Col span={12} offset={6}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '4px' }}>
                      <Title level={3}>ข้อมูลที่อยู่</Title>
                      <Switch onChange={ChangeDisabled3} />
                    </div>
                  </Col>
                </Row>
                <Form
                  initialValues={{ remember: true }}
                  style={{ maxWidth: '300px', margin: 'auto' }}
                  disabled={disabled3}
                >
                  <Input
                    style={{ margin: '4px' }}
                    value={addressu.Descript}
                    placeholder="บ้านเลขที่ หมู่บ้าน ชื่อบ้าน"
                    onChange={(e) => {
                      setAddressu({ ...addressu, Descript: e.target.value });
                    }}
                  />
                  <Select
                    style={{ margin: '4px' }}
                    value={addressu.ProvinceID}
                    placeholder="จังหวัด"
                    onChange={(handleSelectProvince)}
                  >
                    {province.map((item: ProvinceInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Select
                    style={{ margin: '4px' }}
                    value={addressu.DistrictID}
                    placeholder="อำเภอ"
                    onChange={(handleSelectDistrict)}
                  >
                    {district.map((item: DistrictInterface) => (
                      <Option value={item.ID}>{item.Name}</Option>
                    ))}
                  </Select>
                  <Input
                    style={{ margin: '4px' }}
                    value={zipcode}
                    placeholder="รหัสไปรษณี"
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={submitaddress}
                  >
                    ยืนยัน
                  </Button>
                </Form>
              </Content>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Profile;
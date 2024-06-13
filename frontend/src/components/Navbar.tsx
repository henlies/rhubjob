import React, { useState } from 'react';
import { MenuItem, SigninInterface } from '../models/Signin';
import { Link, useLocation } from 'react-router-dom';
import { CreateUserSigninJob, CreateUserSigninUse, GetSignin } from '../services/HttpServices';
import { UserSigninJobInterface, UserSigninUseInterface } from '../models/UserSignin';
import {
    Button, Col, Form, Input, Menu, Modal,
    Typography, Layout, message, Radio, RadioChangeEvent
} from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    LockOutlined,
    LoginOutlined,
    UserAddOutlined,
    InfoCircleOutlined,
    ToolOutlined,
    PhoneOutlined,
    GoogleOutlined,
    EditOutlined
} from '@ant-design/icons';

const Navbar: React.FC = () => {
    const { Header } = Layout;
    const { Title } = Typography;
    const location = useLocation();
    const [signin, setSignin] = useState<Partial<SigninInterface>>({});
    const [signinopen, setSigninopen] = useState(false);
    const [signupopen, setSignupopen] = useState(false);
    const [checkpass, setCheckpass] = useState<string | undefined>('');
    const [signinuseruse, setSigninUserUse] = useState<Partial<UserSigninUseInterface>>({});
    const [signinuserjob, setSigninUserJob] = useState<Partial<UserSigninJobInterface>>({});
    const [role, setRole] = useState<number>(2);
    const [userType, setUserType] = useState(1);
    const [api, Holder] = message.useMessage();

    const openAlert = (type: 'success' | 'error', content: string) => {
        api.open({
            type,
            content,
            duration: 5,
        });
    };

    const onChange = (e: RadioChangeEvent) => {
        setRole(e.target.value + 1);
        setUserType(e.target.value);
    };

    const handleSignin = async () => {
        if ((signin.User === '' || !signin.User) && (signin.Pass === '' || !signin.Pass)) {
            openAlert('error', 'กรุณาใส่ชื่อผู้ใช้ และ รหัสผ่าน');
            return;
        } else if (signin.User === '' || !signin.User) {
            openAlert('error', 'กรุณาใส่ชื่อผู้ใช้');
            return;
        } else if (signin.Pass === '' || !signin.Pass) {
            openAlert('error', 'กรุณาใส่รหัสผ่าน');
            return;
        } else {
            let res = await GetSignin(signin);
            if (res) {
                openAlert('success', 'เข้าสู่ระบบสำเร็จ!');
                setTimeout(() => {
                    window.location.reload();
                    window.location.href = '/';
                }, 1000);
            } else {
                openAlert('error', 'ชื่อผู้ใช้หรือรหัสผ่านผิด หรือ รอเจ้าหน้าที่ตรวจสอบ หรือ บัญชีอาจถูกลบ!');
            }
        }
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phoneNumber: string): boolean => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const isValidUserPass = (userpass: string): boolean => {
        const userpassRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{7,}$/;
        return userpassRegex.test(userpass);
    };

    const handleSignoutuse = async () => {
        if ((signinuseruse.User && !isValidUserPass(signinuseruse.User)) || (!signinuseruse.User || signinuseruse.User === '')) {
            openAlert('error', 'กรุณาใส่ชื่อผู้ใช้ ให้มีตัวอักษรและตัวเลข 7 ตัวขึ้นไป');
        } else if ((signinuseruse.Pass && !isValidUserPass(signinuseruse.Pass)) || (!signinuseruse.Pass || signinuseruse.Pass === '')) {
            openAlert('error', 'กรุณาใส่รหัสผ่าน ให้มีตัวอักษรและตัวเลข 7 ตัวขึ้นไป');
        } else if (signinuseruse.Pass !== checkpass) {
            openAlert('error', 'รหัสผ่านไม่ตรงกัน');
        } else {
            let data = {
                User: signinuseruse.User,
                Pass: signinuseruse.Pass,
                RoleID: role,
            };
            let res = await CreateUserSigninUse(data);
            if (res) {
                openAlert('success', 'สมัครสมาชิกสำเร็จแล้ว เข้าสู่ระบบเลย!');
                setSignupopen(false);
                setSigninopen(true);
            }
        }
    };
    
    const handleSignoutjob = async () => {
        if ((signinuserjob.User && !isValidUserPass(signinuserjob.User)) || (!signinuserjob.User || signinuserjob.User === '')) {
            openAlert('error', 'กรุณาใส่ชื่อผู้ใช้ ให้มีตัวอักษรและตัวเลข 7 ตัวขึ้นไป');
        } else if ((signinuserjob.Pass && !isValidUserPass(signinuserjob.Pass)) || (!signinuserjob.Pass || signinuserjob.Pass === '')) {
            openAlert('error', 'กรุณาใส่รหัสผ่าน ให้มีตัวอักษรและตัวเลข 7 ตัวขึ้นไป');
        } else if (signinuserjob.Pass !== checkpass) {
            openAlert('error', 'รหัสผ่านไม่ตรงกัน');
        } else if ((signinuserjob.Phone && !isValidPhone(signinuserjob.Phone)) || (!signinuserjob.Phone || signinuserjob.Phone === '')) {
            openAlert('error', 'กรุณาใส่เบอร์โทรศัพท์ 10 ตัว');
        } else if ((signinuserjob.Email && !isValidEmail(signinuserjob.Email)) || (!signinuserjob.Email || signinuserjob.Email === '')) {
            openAlert('error', 'กรุณาใส่อีเมลที่ถูกต้อง');
        } else {
            let data = {
                User: signinuserjob.User,
                Pass: signinuserjob.Pass,
                RoleID: role,
                Email: signinuserjob.Email,
                Phone: signinuserjob.Phone,

            };
            let res = await CreateUserSigninJob(data);
            if (res && role === 3) {
                openAlert('success', 'สมัครสมาชิกสำเร็จแล้ว กรุณารอเจ้าหน้าที่ตรวจสอบ!');
                setSignupopen(false);
                setSigninopen(true);
            }
        }
    };

    const menuItemsSignin: MenuItem[] = [
        { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
        { key: '2', icon: <InfoCircleOutlined />, label: 'ข้อมูลสัตว์เลี้ยง', link: '/petinfo' },
        { key: '3', icon: <ToolOutlined />, label: 'คู่มือการใช้งาน', link: '/manual' },
    ];

    const renderMenuItems = (items: MenuItem[]) => {
        return items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
        ));
    };

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" selectedKeys={[location.pathname]} defaultSelectedKeys={['1']} mode="horizontal">
                <div style={{ flex: 1 }}>
                    <>
                        {renderMenuItems(menuItemsSignin)}
                    </>
                </div>
                <div>
                    <Menu.Item key='4' onClick={() => setSigninopen(true)} icon={<LoginOutlined />}>
                        เข้าสู่ระบบ
                    </Menu.Item>
                    <Menu.Item key='5' onClick={() => setSignupopen(true)} icon={<UserAddOutlined />}>
                        สมัครสมาชิก
                    </Menu.Item>
                </div>
            </Menu>

            <Modal
                centered
                open={signinopen}
                onCancel={() => {
                    setSigninopen(false);
                }}
                footer={null}
            >
                <Col>
                    {Holder}
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>ลงชื่อเข้าใช้</Title>
                    </div>
                    <Form
                        initialValues={{ remember: true }}
                        style={{ maxWidth: '300px', margin: 'auto' }}
                    >
                        <Form.Item>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="ชื่อผู้ใช้"
                                onChange={(e) => {
                                    setSignin({ ...signin, User: e.target.value });
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="รหัสผ่าน"
                                onChange={(e) => {
                                    setSignin({ ...signin, Pass: e.target.value });
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                icon={<LoginOutlined />}
                                onClick={handleSignin}
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}
                            >
                                เข้าสู่ระบบ
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="#" onClick={() => { setSigninopen(false); setSignupopen(true); }}>
                            ยังไม่มีบัญชี ?
                        </Link>
                    </div>
                </Col>
            </Modal>

            <Modal
                centered
                open={signupopen}
                onCancel={() => setSignupopen(false)}
                footer={null}
            >
                <Col>
                    {Holder}
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>สมัครสมาชิก</Title>
                    </div>
                    <Form
                        initialValues={{ remember: true }}
                        style={{ maxWidth: '300px', margin: 'auto' }}
                    >
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Radio.Group onChange={onChange} defaultValue={1}>
                                <Radio value={1}>ผู้ใช้บริการ</Radio>
                                <Radio value={2}>ผู้ให้บริการ</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {userType === 1 && (
                            <>
                                <Form.Item>
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="ชื่อผู้ใช้"
                                        onChange={(e) => {
                                            setSigninUserUse({ ...signinuseruse, User: e.target.value });
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="รหัสผ่าน"
                                        onChange={(e) => {
                                            setSigninUserUse({ ...signinuseruse, Pass: e.target.value })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="ตรวจสอบรหัสผ่าน"
                                        onChange={(e) => {
                                            setCheckpass(e.target.value);
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        icon={<UserAddOutlined />}
                                        onClick={handleSignoutuse}
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: '100%' }}
                                    >
                                        สมัครสมาชิก
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                        {userType === 2 && (
                            <>
                                <Form.Item>
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="ชื่อผู้ใช้"
                                        onChange={(e) => {
                                            setSigninUserJob({ ...signinuserjob, User: e.target.value });
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="รหัสผ่าน"
                                        onChange={(e) => {
                                            setSigninUserJob({ ...signinuserjob, Pass: e.target.value })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="ตรวจสอบรหัสผ่าน"
                                        onChange={(e) => {
                                            setCheckpass(e.target.value);
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <Input
                                            prefix={<EditOutlined />}
                                            placeholder="ชื่อจริง"
                                            onChange={(e) => {
                                                setSigninUserJob({ ...signinuserjob, Firstname: e.target.value })
                                            }}
                                        />
                                        <Input
                                            placeholder="นามสกุล"
                                            onChange={(e) => {
                                                setSigninUserJob({ ...signinuserjob, Lastname: e.target.value })
                                            }}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<PhoneOutlined />}
                                        placeholder="เบอร์โทรศัพท์"
                                        type='number'
                                        onChange={(e) => {
                                            setSigninUserJob({ ...signinuserjob, Phone: e.target.value })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<GoogleOutlined />}
                                        placeholder="อีเมล"
                                        onChange={(e) => {
                                            setSigninUserJob({ ...signinuserjob, Email: e.target.value })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        icon={<UserAddOutlined />}
                                        onClick={handleSignoutjob}
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: '100%' }}
                                    >
                                        สมัครสมาชิก
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Col>
            </Modal>
        </Header>
    );
};

export default Navbar;
import React, { useState } from 'react';
import { MenuItem, SigninInterface } from '../models/Signin';
import { Link, useLocation } from 'react-router-dom';
import { CreateUserSignin, GetSignin } from '../services/HttpServices';
import { UserSigninInterface } from '../models/UserSignin';
import {
    Button, Col, Form, Input, Menu, Modal,
    notification, Typography, Layout
} from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    LockOutlined,
    LoginOutlined,
    UserAddOutlined,
    InfoCircleOutlined,
    ToolOutlined
} from '@ant-design/icons';

const Navbar: React.FC = () => {
    const { Header } = Layout;
    const { Title } = Typography;
    const location = useLocation();
    const [signinopen, setSigninopen] = useState(false);
    const [signupopen, setSignupopen] = useState(false);
    const [checkpass, setCheckpass] = useState<string | undefined>('');
    const [signin, setSignin] = useState<Partial<SigninInterface>>({});
    const [signinuser, setSigninUser] = useState<Partial<UserSigninInterface>>({});
    const [apisignin, signinHolder] = notification.useNotification();

    const openNotification = (type: 'success' | 'error', message: string, description: string) => {
        apisignin.open({
            type,
            message,
            description,
            duration: 5,
        });
    };

    const handleSignin = async () => {
        if ((signin.User === '' || !signin.User) && (signin.Pass === '' || !signin.Pass)) {
            openNotification('error', 'ผิดพลาด', 'โปรดใส่ชื่อผู้ใช้ และ รหัสผ่าน');
            return;
        } else if (signin.User === '' || !signin.User) {
            openNotification('error', 'ผิดพลาด', 'โปรดใส่ชื่อผู้ใช้');
            return;
        } else if (signin.Pass === '' || !signin.Pass) {
            openNotification('error', 'ผิดพลาด', 'โปรดใส่รหัสผ่าน');
            return;
        } else {
            let res = await GetSignin(signin);
            if (res) {
                openNotification('success', 'สำเร็จ', 'เข้าสู่ระบบสำเร็จ');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                openNotification('error', 'ผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านผิด หรือ บัญชีอาจถูกลบ');
            }
        }
    };

    const handleSignout = async () => {
        if (signinuser.Pass !== checkpass) {
            openNotification('error', 'ผิดพลาด', 'รหัสผ่านไม่ตรงกัน');
            return;
        } else {
            let data = {
                User: signinuser.User,
                Pass: signinuser.Pass,
            };
            let res = await CreateUserSignin(data);
            if (res) {
                openNotification('success', 'สำเร็จ', 'สมัครสมาชิกสำเร็จแล้ว เข้าสู่ระบบเลย!');
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
                    {signinHolder}
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>ลงชื่อเข้าใช้</Title>
                    </div>
                    <Form
                        initialValues={{ remember: true }}
                        style={{ maxWidth: '300px', margin: 'auto' }}
                    >
                        <Form.Item name="user" id="user">
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="ชื่อผู้ใช้"
                                onChange={(e) => {
                                    setSignin({ ...signin, User: e.target.value });
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="pass" id="pass">
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
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
                    {signinHolder}
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>สมัครสมาชิก</Title>
                    </div>
                    <Form
                        initialValues={{ remember: true }}
                        style={{ maxWidth: '300px', margin: 'auto' }}
                    >
                        <Form.Item name="usersignup" id="usersignup">
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="ชื่อผู้ใช้"
                                onChange={(e) => {
                                    setSigninUser({ ...signinuser, User: e.target.value });
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="passsignup" id="passsignup">
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="รหัสผ่าน"
                                onChange={(e) => {
                                    setSigninUser({ ...signinuser, Pass: e.target.value })
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="passcheck" id="passcheck">
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
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
                                onClick={handleSignout}
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}
                            >
                                สมัครสมาชิก
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Modal>
        </Header>
    );
};

export default Navbar;
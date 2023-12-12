import React, { useState } from 'react';
import { Button, Col, Form, Input, Menu, Modal, notification, Typography, Layout } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { MenuItem, SigninInterface } from '../models/Signin';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { Header } = Layout;
    const { Title } = Typography;
    const location = useLocation();
    const [signinopen, setSigninopen] = useState(false);
    const [signin, setSignin] = useState<Partial<SigninInterface>>({});
    const [apisignin, signinHolder] = notification.useNotification();

    const openNotification = (type: 'success' | 'error', message: string, description: string) => {
        apisignin.open({
            message,
            description,
            duration: 3,
            type,
        });
    };

    const handleSignin = () => {
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
            const apiUrl = "http://127.0.0.1:8080/signin";
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signin),
            };
            fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data.id);
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                        localStorage.setItem("role", res.data.role);
                        localStorage.setItem("name", res.data.name);
                        localStorage.setItem("per", res.data.per);
                        window.location.reload();
                    } else {
                        openNotification('error', 'ผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านผิด');
                    }
                })
                .catch((error) => {
                    openNotification('error', 'ผิดพลาด', 'เกิดข้อผิดพลาดระหว่างการลงชื่อเข้าใช้ กรุณาลองใหม่อีกครั้งในภายหลัง');
                });
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof signin;
        const { value } = event.target;
        setSignin({ ...signin, [id]: value });
    };

    const setUsername = (user: string) => {
        setSignin({ ...signin, User: user });
    };

    const setPassword = (pass: string) => {
        setSignin({ ...signin, Pass: pass });
    };

    const menuItemsSignin: MenuItem[] = [
        { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
        { key: '2', icon: <AppstoreOutlined />, label: 'ข้อมูลสัตว์เลี้ยง', link: '/petinfo' },
    ];

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" selectedKeys={[location.pathname]} mode="horizontal">
                <div style={{ flex: 1 }}>
                    {menuItemsSignin.map((menuItem) => (
                        <Menu.Item key={menuItem.link}>
                            <Link to={menuItem.link}>{menuItem.label}</Link>
                        </Menu.Item>
                    ))}
                </div>
                <div>
                    <Menu.Item key='3' onClick={() => setSigninopen(true)}>
                        เข้าสู่ระบบ
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Link to="/signup">สมัครสมาชิก</Link>
                    </Menu.Item>
                </div>
            </Menu>

            <Modal
                centered
                open={signinopen}
                onCancel={() => setSigninopen(false)}
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
                                value={signin.User}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setUsername(e.target.value);
                                }}
                            />
                        </Form.Item>

                        <Form.Item name="pass" id="pass">
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="รหัสผ่าน"
                                value={signin.Pass}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setPassword(e.target.value);
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
                </Col>
            </Modal>
        </Header>
    );
};

export default Navbar;
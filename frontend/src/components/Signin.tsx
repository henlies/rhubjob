import React, { useState } from 'react';
import { Form, Input, Button, Layout, Row, Col, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { SigninInterface } from '../models/Signin';



const Signin: React.FC = () => {

    const { Content } = Layout;
    const { Title } = Typography;

    const [signin, setSignin] = useState<Partial<SigninInterface>>({});
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: 'success' | 'error', message: string, description?: string) => {
        api.open({
            message,
            description,
            duration: 3,
            type,
        });
    };

    const handleSignin = () => {
        if ((signin.User === '' || !signin.User) && (signin.Pass === '' || !signin.Pass)) {
            openNotification('error', 'Error', 'Please enter both Username and Password');
            return;
        } else if (signin.User === '' || !signin.User) {
            openNotification('error', 'Error', 'Please enter Username');
            return;
        } else if (signin.Pass === '' || !signin.Pass) {
            openNotification('error', 'Error', 'Please enter Password');
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
                        openNotification('error', 'Error', 'Invalid Username or Password.');
                    }
                })
                .catch((error) => {
                    console.error("Error during sign-in:", error);
                    openNotification('error', 'Error', 'An error occurred during sign-in. Please try again later.');
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

    return (
        <>
            {contextHolder}
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ padding: '50px' }}>
                    <Row justify="center">
                        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
                            <div style={{ textAlign: 'center' }}>
                                <Title level={2}>Sign In</Title>
                            </div>
                            <Form
                                initialValues={{ remember: true }}
                                style={{ maxWidth: '300px', margin: 'auto' }}>
                                <Form.Item
                                    name="user"
                                    id='user'
                                    rules={[{ required: true, message: 'Please input your Username!' }]}>
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Username"
                                        value={signin.User}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setUsername(e.target.value);
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="pass"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
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
                                        onClick={handleSignin} type="primary"
                                        htmlType="submit" style={{ width: '100%' }}>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default Signin;
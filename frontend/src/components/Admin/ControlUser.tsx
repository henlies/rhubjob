import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, notification, Space, Table, Typography } from 'antd';
import { UserInterface } from '../../models/User';
import { DeleteUser, GetUserList } from '../../services/HttpServices';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const ControlUser: React.FC = () => {
  const [user, setUser] = useState<UserInterface[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [api, contextHolder] = notification.useNotification();
  const filteredUser = user.filter((userData) =>
    userData.Status !== 0 &&
    (
      userData.Nickname.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  const { Content } = Layout;
  const { Title } = Typography;

  const getuserlist = async () => {
    let res = await GetUserList();
    if (res) {
      setUser(res);
    }
  };

  const checkDelete = async (id: number) => {
    const key = `open${Date.now()}`;
    const close = () => {
      console.log('Notification closed');
    };
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Close
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            api.destroy(key);
            DeleteUser(id);
            window.location.reload();
          }}
        >
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: `ลบข้อมูล`,
      description:
        `คุณต้องการจะลบข้อมูลใช่หรือไม่ ?`,
      btn,
      key,
      onClose: close,
    });
  };

  const columns: ColumnsType<UserInterface> = [
    {
      title: "ชื่อ นามสกุล",
      dataIndex: "User",
      render: (text, record) =>
        `${record.Prefix.Name}${record.Firstname} ${record.Lastname}`,
      width: '22.5%',
      align: "center",
    },
    {
      title: 'ชื่อเล่น',
      dataIndex: 'Nickname',
      width: '5%',
      align: "center",
    },
    {
      title: 'เพศ',
      dataIndex: ['Gender', 'Name'],
      width: '10%',
      align: "center",

    },
    {
      title: 'โทรศัพท์',
      dataIndex: 'Phone',
      width: '10%',
      align: "center",
    },
    {
      title: 'อีเมล',
      dataIndex: 'Email',
      width: '22.5%',
      align: "center",
    },
    {
      title: 'วันเกิด',
      dataIndex: 'Birth',
      width: '10%',
      align: "center",
      render: (date: Date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'กรุ๊ปเลือด',
      dataIndex: ['Blood', 'Name'],
      width: '5%',
      align: "center",
    },
    {
      title: 'ชื่อสัคว์เลี้ยง',
      dataIndex: ['Pet', 'Name'],
      width: '10%',
      align: "center",
    },
    {
      title: 'ลบข้อมูล',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <span className="icon-table">
          <DeleteOutlined
            style={{
              fontSize: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#1890ff',
            }}
            onClick={() => checkDelete(record.ID)}
          />
        </span>
      ),
    },
  ];
  
  useEffect(() => {
    getuserlist();
  }, []);

  return (
    <>
      {contextHolder}
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 12, background: '#fff', minHeight: 360, textAlign: 'center' }}>
            <Title level={3}>ตารางรายชื่อผู้ใช้งานระบบ</Title>
            <Input
              prefix={<SearchOutlined />}
              placeholder="ใส่ชื่อเล่นเพื่อค้นหา"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <Table columns={columns} dataSource={filteredUser} />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default ControlUser;
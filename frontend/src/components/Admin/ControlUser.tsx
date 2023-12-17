import React, { useEffect, useState } from 'react';
import { Input, Layout, Popconfirm, Table, Typography, message } from 'antd';
import { UserInterface } from '../../models/User';
import { DeleteUser, GetUserList } from '../../services/HttpServices';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const ControlUser: React.FC = () => {
  let admin = localStorage.getItem("name")
  const { Content } = Layout;
  const { Title } = Typography;
  const [user, setUser] = useState<UserInterface[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [confirmation, setConfirmation] = useState('');
  const [api, Holder] = message.useMessage();
  const filteredUser = user.filter((userData) =>
    userData.Status !== 0 &&
    (
      userData.Firstname.toLowerCase().includes(searchText.toLowerCase()) ||
      userData.Lastname.toLowerCase().includes(searchText.toLowerCase()) ||
      userData.Nickname.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const openAlert = (type: 'success' | 'error', content: string) => {
    api.open({
      type,
      content,
      duration: 5,
    });
  };

  const getuserlist = async () => {
    let res = await GetUserList();
    if (res) {
      setUser(res);
    }
  };

  const handleDelete = async (id?: number) => {
    if (confirmation === admin) {
      await DeleteUser(id);
      getuserlist();
    } else {
      openAlert('error', 'ชื่อไม่ตรง ไม่สามารถลบได้');
    }
  };

  const columns: ColumnsType<UserInterface> = [
    {
      title: "ชื่อ นามสกุล",
      dataIndex: "User",
      render: (text, record) =>
        `${record.Prefix?.Name}${record.Firstname} ${record.Lastname}`,
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
        <>
          {Holder}
          <Popconfirm
            title={
              <>
                <Input
                  placeholder="พิมพ์ ชื่อจริง เพื่อยืนยัน"
                  onChange={(e) => setConfirmation(e.target.value)}
                />
              </>
            }
            onConfirm={() => handleDelete(record.ID)}
            cancelText="ไม่"
            okText="ใช่"
            icon={null}
          >
            <DeleteOutlined
              style={{
                fontSize: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ff4d4f',
                display: 'flex',
              }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getuserlist();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 12, background: '#fff', minHeight: 360, textAlign: 'center' }}>
          <Title level={3}>ตารางรายชื่อผู้ใช้งานระบบ</Title>
          <Input
            prefix={<SearchOutlined />}
            placeholder="ใส่ชื่อจริง ชื่อเล่นหรือนามสกุล เพื่อค้นหา"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Table columns={columns} dataSource={filteredUser} />
        </div>
      </Content>
    </Layout>
  );
};

export default ControlUser;
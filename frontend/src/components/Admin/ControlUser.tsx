import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Popconfirm, Popover, Table, Tabs, Typography, message } from 'antd';
import { UserInterface } from '../../models/User';
import { ActiveServiceProvider, ActiveServiceUser, ApproveUser, DeleteServiceProvider, DeleteServiceUser, GetUserListActive, GetUserListNonActive } from '../../services/HttpServices';
import { ColumnsType } from 'antd/es/table';
import { CheckOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import TabPane from 'antd/es/tabs/TabPane';

const ControlUser: React.FC = () => {
  let admin = localStorage.getItem("name")
  const { Content } = Layout;
  const { Title } = Typography;
  const [useractive, setUserActive] = useState<UserInterface[]>([]);
  const [usernonactive, setUserNonactive] = useState<UserInterface[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [confirmation, setConfirmation] = useState('');
  const [api, Holder] = message.useMessage();
  const [visible, setVisible] = useState(false);

  const handleButtonClick = () => {
    setVisible(!visible);
  };

  const content = (
    <>
      <div style={{ color: 'red' }}>ยกเลิกการใช้งาน</div>
      <div style={{ color: 'yellow' }}>ผู้ใช้บริการ ยังไม่ยืนยัน</div>
      <div style={{ color: 'blue' }}>ผู้ใช้บริการ ยืนยันเเล้ว</div>
      <div style={{ color: 'green' }}>ผู้ให้บริการ ยืนยันเเล้ว</div>
      <div style={{ color: 'orange' }}>ผู้ให้บริการ ยังไม่ยืนยัน</div>
    </>
  );

  const openAlert = (type: 'success' | 'error', content: string) => {
    api.open({
      type,
      content,
      duration: 5,
    });
  };

  const getuserlistactive = async () => {
    let res = await GetUserListActive();
    if (res) {
      setUserActive(res);
    }
  };

  const getuserlistnonactive = async () => {
    let res = await GetUserListNonActive();
    if (res) {
      setUserNonactive(res);
    }
  };

  const handleDelete = async (rolename?: string, email?: string) => {
    if (confirmation === admin) {
      if (rolename === 'ผู้ให้บริการ') {
        await DeleteServiceProvider(email);
        getuserlistactive();
        getuserlistnonactive();
      } else {
        await DeleteServiceUser(email);
        getuserlistactive();
        getuserlistnonactive();
      }
    } else {
      openAlert('error', 'ชื่อไม่ตรง ไม่สามารถลบได้');
    }
  };

  const handleApprove = async (id?: number) => {
    if (confirmation === admin) {
      await ApproveUser(id);
      getuserlistactive();
      getuserlistnonactive();
    } else {
      openAlert('error', 'ชื่อไม่ตรง ไม่สามารถยืนยันได้');
    }
  };

  const handalActive = async (rolename?: string, email?: string) => {
    if (confirmation === admin) {
      if (rolename === 'ผู้ให้บริการ') {
        await ActiveServiceProvider(email);
        getuserlistactive();
        getuserlistnonactive();
      } else {
        await ActiveServiceUser(email);
        getuserlistactive();
        getuserlistnonactive();
      }
    } else {
      openAlert('error', 'ชื่อไม่ตรง ไม่สามารถยืนยันได้');
    }
  };

  const columnsactive: ColumnsType<UserInterface> = [
    {
      title: 'อนุมัติ',
      width: '5%',
      align: 'center',
      render: (text, record) => {
        if (record.Status === 1) {
          return null;
        }

        return (
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
              onConfirm={() => handleApprove(record.ID)}
              cancelText="ไม่"
              okText="ใช่"
              icon={null}
            >
              <CheckOutlined
                style={{
                  fontSize: '20px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'green',
                  display: 'flex',
                }}
              />
            </Popconfirm>
          </>
        );
      },
    },
    {
      title: "บทบาทหน้าที่",
      dataIndex: ['Role', 'Name'],
      width: '15%',
      align: "center",
      render: (text: string, record: UserInterface) => {
        let color = 'black';

        if (record.Role?.Name === 'ผู้ให้บริการ' || record.Role?.Name === 'ผู้ใช้บริการ') {
          if (record.Active === 1) {
            if (record.Status === 0) {
              color = record.Role?.Name === 'ผู้ให้บริการ' ? 'orange' : 'yellow';
            } else if (record.Status === 1) {
              color = record.Role?.Name === 'ผู้ให้บริการ' ? 'green' : 'blue';
            }
          } else if (record.Active === 0) {
            color = 'red';
          }
        } return (
          <span style={{ color }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "ชื่อ นามสกุล",
      dataIndex: "User",
      render: (text, record) =>
        `${record.Prefix?.Name}${record.Firstname} ${record.Lastname}`,
      width: '15%',
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
      width: '10%',
      align: "center",
    },
    {
      title: 'วันเกิด',
      dataIndex: 'Birth',
      width: '10%',
      align: 'center',
      render: (date: Date) => date && moment(date).toISOString() !== "0001-01-01T00:00:00.000Z" ?
        moment(date).format('DD/MM/YYYY') : null,
    },
    {
      title: 'กรุ๊ปเลือด',
      dataIndex: ['Blood', 'Name'],
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
            onConfirm={() => handleDelete(record.Role?.Name, record.Email)}
            cancelText="ไม่"
            okText="ใช่"
            icon={null}
          >
            <DeleteOutlined
              style={{
                fontSize: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'red',
                display: 'flex',
              }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  const columnsnonactive: ColumnsType<UserInterface> = [
    {
      title: "บทบาทหน้าที่",
      dataIndex: ['Role', 'Name'],
      width: '15%',
      align: "center",
      render: (text: string, record: UserInterface) => {
        let color = 'black';

        if (record.Role?.Name === 'ผู้ให้บริการ' || record.Role?.Name === 'ผู้ใช้บริการ') {
          if (record.Active === 1) {
            if (record.Status === 0) {
              color = record.Role?.Name === 'ผู้ให้บริการ' ? 'orange' : 'yellow';
            } else if (record.Status === 1) {
              color = record.Role?.Name === 'ผู้ให้บริการ' ? 'green' : 'blue';
            }
          } else if (record.Active === 0) {
            color = 'red';
          }
        } return (
          <span style={{ color }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "ชื่อ นามสกุล",
      dataIndex: "User",
      render: (text, record) =>
        `${record.Prefix?.Name}${record.Firstname} ${record.Lastname}`,
      width: '15%',
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
      width: '15%',
      align: "center",
    },
    {
      title: 'วันเกิด',
      dataIndex: 'Birth',
      width: '10%',
      align: 'center',
      render: (date: Date) => date && moment(date).toISOString() !== "0001-01-01T00:00:00.000Z" ?
        moment(date).format('DD/MM/YYYY') : null,
    },
    {
      title: 'กรุ๊ปเลือด',
      dataIndex: ['Blood', 'Name'],
      width: '10%',
      align: "center",
    },
    {
      title: 'กู้ข้อมูล',
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
            onConfirm={() => handalActive(record.Role?.Name, record.Email)}
            cancelText="ไม่"
            okText="ใช่"
            icon={null}
          >
            <CheckOutlined
              style={{
                fontSize: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'green',
                display: 'flex',
              }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getuserlistactive();
    getuserlistnonactive();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 12, background: '#fff', minHeight: 360, textAlign: 'center' }}>
          <Title level={3}>ตารางรายชื่อผู้ใช้งานระบบ</Title>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '39px' }}>
            <Popover content={content} trigger="click" visible={visible} onVisibleChange={setVisible}>
              <Button shape="round" style={{ marginBottom: "13px" }} onClick={handleButtonClick}>
                ข้อมูล
              </Button>
            </Popover>
          </div>
          <Input
            prefix={<SearchOutlined />}
            placeholder="ใส่ชื่อจริง ชื่อเล่นหรือนามสกุล เพื่อค้นหา"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Tabs defaultActiveKey="1">
            <TabPane tab="ดำเนินการใช้งาน" key="1">
              <Table columns={columnsactive} dataSource={useractive} />
            </TabPane>
            <TabPane tab="ยกเลิกการใช้งาน" key="2">
              <Table columns={columnsnonactive} dataSource={usernonactive} />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default ControlUser;
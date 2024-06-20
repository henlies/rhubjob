import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, Modal, message } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProps, MenuItem } from '../models/Signin';
import {
  CheckCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { DeleteServiceProvider, DeleteServiceUser, GetServiceProviderByUID, GetServiceUserByUID } from '../services/HttpServices';
import { UserInterface } from '../models/User';

const Sidebar: React.FC<SidebarProps> = ({ role, per }) => {
  const location = useLocation();
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [api, Holder] = message.useMessage();
  const [pic, setPic] = useState<string>("");

  const uid = localStorage.getItem("id")

  const [user, setUser] = useState<UserInterface | null>(null);
    
  const getuser = async () => {
    let res = null;

    if (role === "ผู้ใช้บริการ") {
      res = await GetServiceUserByUID(uid);
    } else {
      res = await GetServiceProviderByUID(uid);
    }

    if (res) {
      setUser(res);
    }
  };

  const openAlert = (type: 'success' | 'error', content: string) => {
    api.open({
      type,
      content,
      duration: 5,
    });
  };

  const menuItemsUser: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
    { key: '2', icon: <CreditCardOutlined />, label: 'การรับเลี้ยง', link: '/post' },
    { key: '3', icon: <CheckCircleOutlined />, label: 'ติดตามสถานะ', link: '/track-status' },
    { key: '4', icon: <HistoryOutlined />, label: 'ประวัติการการรับบริการ', link: '/history-post' },
  ];

  const menuItemsAdmin: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
    // { key: '2', icon: <CreditCardOutlined />, label: 'ควบคุมโพสรับเลี้ยง', link: '/control-post' },
    // { key: '3', icon: <CommentOutlined />, label: 'ควบคุมความคิดเห็น', link: '/control-comment' },
    { key: '4', icon: <UserOutlined />, label: 'ควบคุมผู้ใช้งานระบบ', link: '/control-user' },
  ];

  const deleteuser = async () => {
    let username = "";

    if (user) {
      username = user.User || "";
      console.log(username);
    }

    Modal.confirm({
      title: 'ยินยันการลบบัญชี',
      content: 'คุณต้องการลบบัญชีใช่หรอไม่ ?',
      onOk: async () => {
        let res = null;

        if (role === "ผู้ใช้บริการ") {
          res = await DeleteServiceUser(username);
        } else {
          res = await DeleteServiceProvider(username);
        }
        if (res) {
          openAlert('success', 'ลบบัญชีสำเร็จ!');
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/';
          }, 1000);
        }
      },
    });
  }

  const SignOut = () => {
    openAlert('success', 'ออกจากระบบเสร็จสิ้น!');
    setTimeout(() => {
      localStorage.clear();
      window.location.href = '/';
    }, 1000);
  };
  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.link}>{item.label}</Link>
      </Menu.Item>
    ));
  };

  const avatarMenu = (
    <Menu>
      {(role === 'ผู้ใช้บริการ' || role === 'ผู้ให้บริการ') &&
        <Link to={`/profile`}>
          <Menu.Item icon={<UserOutlined />}>
            จัดการโปรไฟล์
          </Menu.Item>
        </Link>
      }
      {Holder}
      {(role === 'ผู้ใช้บริการ' || role === 'ผู้ให้บริการ') &&
        <Menu.Item key="delete" onClick={deleteuser} icon={<DeleteOutlined />}>
          ลบบัญชีผู้ใช้
        </Menu.Item>
      }
      <Menu.Item key="logout" onClick={SignOut} icon={<LogoutOutlined />}>
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getuser();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setPic(localStorage.getItem("pic") || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} style={{ zIndex: '1' }}>
      <div>
        <div style={{ position: 'fixed', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Dropdown overlay={avatarMenu}>
              <Avatar
                size={60}
                src={pic}
                style={{ cursor: 'pointer', marginTop: '10px', marginRight: '10px' }}
              />
            </Dropdown>
          </div>
        </div>
        <Menu theme="dark" selectedKeys={[location.pathname]} defaultSelectedKeys={['1']} mode="inline">
          {role === 'ผู้ดูแลระบบ' && per === 'ดูแลระบบ' && renderMenuItems(menuItemsAdmin)}
          {role === 'ผู้ดูแลระบบ' && (
            <>
              {per === 'คัดกรองข้อความ' && renderMenuItems([menuItemsAdmin[0], menuItemsAdmin[2]])}
              {per === 'จัดการข้อมูลผู้ใช้ระบบ' && renderMenuItems([menuItemsAdmin[0], menuItemsAdmin[3]])}
            </>
          )}
          {role === 'ผู้ใช้บริการ' && renderMenuItems([menuItemsUser[0], menuItemsUser[1], menuItemsUser[2], menuItemsUser[3]])}
          {role === 'ผู้ให้บริการ' && renderMenuItems([menuItemsUser[0], menuItemsUser[1]])}
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;
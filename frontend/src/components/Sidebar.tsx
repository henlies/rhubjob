import React, { useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, message } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProps, MenuItem } from '../models/Signin';
import personImage from './User/etc/person.jpg';
import {
  CheckCircleOutlined,
  CommentOutlined,
  CreditCardOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

const Sidebar: React.FC<SidebarProps> = ({ role, per }) => {
  const { Sider } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [api, Holder] = message.useMessage();

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
    { key: '4', icon: <CheckCircleOutlined />, label: 'แจ้งสถานะ', link: '/post-status' },
  ];

  const menuItemsAdmin: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
    { key: '2', icon: <CreditCardOutlined />, label: 'ควบคุมโพสรับเลี้ยง', link: '/control-post' },
    { key: '3', icon: <CommentOutlined />, label: 'ควบคุมความคิดเห็น', link: '/control-comment' },
    { key: '4', icon: <UserOutlined />, label: 'ควบคุมผู้ใช้งานระบบ', link: '/control-user' },
  ];

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
      <Menu.Item >
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item >
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} //style={{ position: 'fixed'}}
    >
      <div style={{ position: 'fixed', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown overlay={avatarMenu}>
            <Avatar
              size={60}
              src={personImage}
              style={{ cursor: 'pointer', marginTop: '20px', marginRight: '20px' }}
            />
          </Dropdown>
        </div>
      </div>
      <div />
      <Menu theme="dark" selectedKeys={[location.pathname]} defaultSelectedKeys={['1']} mode="inline">
        {role === 'ผู้ดูแลระบบ' && per === 'ดูแลระบบ' && renderMenuItems(menuItemsAdmin)}
        {role === 'ผู้ดูแลระบบ' && (
          <>
            {per === 'คัดกรองข้อความ' && renderMenuItems([menuItemsAdmin[0], menuItemsAdmin[2]])}
            {per === 'จัดการข้อมูลผู้ใช้ระบบ' && renderMenuItems([menuItemsAdmin[0], menuItemsAdmin[3]])}
          </>
        )}
        {role === 'ผู้ใช้บริการ' && renderMenuItems([menuItemsUser[0], menuItemsUser[1], menuItemsUser[2]])}
        {role === 'ผู้ให้บริการ' && renderMenuItems([menuItemsUser[0], menuItemsUser[1], menuItemsUser[3]])}
        {Holder}
        <Menu.Item key="logout" onClick={SignOut} icon={<LogoutOutlined />}>
          ออกจากระบบ
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
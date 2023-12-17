import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProps, MenuItem } from '../models/Signin';
import {
  CheckCircleOutlined,
  CommentOutlined,
  CreditCardOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

const Sidebar: React.FC<SidebarProps> = ({ isAdmin, per }) => {
  const { Sider } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const numberOfMenuItems = isAdmin
    ? per === 'ดูแลระบบ' ? 15
      : per === 'จัดการข้อมูลผู้ใช้ระบบ' ? 17
        : per === 'คัดกรองข้อความ' ? 17
          : 0
    : 16;

  const menuItemsUser: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
    { key: '2', icon: <CreditCardOutlined />, label: 'การรับเลี้ยง', link: '/post' },
    { key: '2', icon: <CheckCircleOutlined />, label: 'สถานะการรับเลี้ยง', link: '/post-status' },
  ];

  const menuItemsAdmin: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'หน้าหลัก', link: '/' },
    { key: '2', icon: <CreditCardOutlined />, label: 'ควบคุมโพสรับเลี้ยง', link: '/control-post' },
    { key: '3', icon: <CommentOutlined />, label: 'ควบคุมความคิดเห็น', link: '/control-comment' },
    { key: '4', icon: <UserOutlined />, label: 'ควบคุมผู้ใช้งานระบบ', link: '/control-user' },
  ];

  const SignOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.link}>{item.label}</Link>
      </Menu.Item>
    ));
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[location.pathname]} defaultSelectedKeys={['1']} mode="inline">
          {isAdmin && per === 'ดูแลระบบ' && renderMenuItems(menuItemsAdmin)}
          {isAdmin && per === 'คัดกรองข้อความ' && (
            <>
              {renderMenuItems([menuItemsAdmin[0], menuItemsAdmin[2]])}
            </>
          )}
          {isAdmin && per === 'จัดการข้อมูลผู้ใช้ระบบ' && (
            <>
              {renderMenuItems([menuItemsAdmin[0], menuItemsAdmin[3]])}
            </>
          )}
          {!isAdmin && renderMenuItems(menuItemsUser)}

          {Array.from({ length: numberOfMenuItems }, (_, index) => (
            <Menu.Item key={`menu-item-${index}`}>
            </Menu.Item>
          ))}

          <Menu.Item key="logout" onClick={SignOut} icon={<LogoutOutlined />}>
            ออกจากระบบ
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout >
  );
};

export default Sidebar;
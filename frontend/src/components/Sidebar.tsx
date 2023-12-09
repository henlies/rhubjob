import React from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SidebarProps, MenuItem } from '../models/Signin';

const Sidebar: React.FC<SidebarProps> = ({ isAdmin, per }) => {
  const { Sider } = Layout;

  const menuItemsUser: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'Dashboard', link: '/' },
    { key: '2', icon: <DesktopOutlined />, label: 'Home', link: '/home' },
  ];

  const menuItemsAdmin: MenuItem[] = [
    { key: '1', icon: <HomeOutlined />, label: 'Dashboard', link: '/' },
    { key: '2', icon: <DesktopOutlined />, label: 'Control Post', link: '/control-post' },
    { key: '3', icon: <DesktopOutlined />, label: 'Control Comment', link: '/control-comment' },
    { key: '4', icon: <DesktopOutlined />, label: 'Control User', link: '/control-user' },
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
      <Sider collapsible>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
          <Menu.Item key="100" onClick={SignOut} icon={<LogoutOutlined />}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
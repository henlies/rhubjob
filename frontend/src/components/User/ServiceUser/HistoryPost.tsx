import React, { useEffect, useState, } from 'react';
import { Avatar, Button, Col, Layout, Modal, Typography, Image } from 'antd';
import { GetHistoryByPid, GetPostByUid, GetServiceUserByUID } from '../../../services/HttpServices';
import { UserInterface } from '../../../models/User';
import { PostSInterface } from '../../../models/Post';
import Table, { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import './HistoryPost.css';
import { HistoryOutlined } from '@ant-design/icons';
import { NotifyInterface } from '../../../models/Notify';

const HistoryPost: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const uid = localStorage.getItem("id")
  const [user, setUser] = useState<Partial<UserInterface>>({});
  const [post, setPost] = useState<PostSInterface[]>([]);
  const [history, setHistory] = useState<NotifyInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblehistory, setIsModalVisibleHistory] = useState(false);

  const getserviceuserbyuid = async () => {
    let res = await GetServiceUserByUID(uid);
    if (res) {
      setUser(res);
    }
  }

  const getpostbyuid = async () => {
    let res = await GetPostByUid(uid);
    if (res) {
      setPost(res);
    }
  }

  const toggleModal = async (id?: number) => {
    setIsModalVisible(false);
    setIsModalVisibleHistory(true);

    let res = await GetHistoryByPid(id);
    if (res) {
      setHistory(res);
    }
  }

  const handleCancelHistory = () => {
    setIsModalVisibleHistory(false);
  };

  const backtoprovider = () => {
    setIsModalVisibleHistory(false);
    setIsModalVisible(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columnpost: ColumnsType<PostSInterface> = [
    {
      dataIndex: 'Picture',
      width: '5%',
      align: "center",
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Avatar
          src={record.ServiceProvider?.Pic}
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'ชื่อผู้รับเลี้ยง',
      dataIndex: 'Health',
      render: (text, record) =>
        `${record.ServiceProvider?.Prefix?.Name}${record.ServiceProvider?.Firstname} ${record.ServiceProvider?.Lastname}`,
      width: '10%',
      align: "center",
    },
    {
      title: 'วันเริ่มงาน',
      dataIndex: 'Start',
      width: '10%',
      align: "center",
      render: (date: Date) => date && moment(date).toISOString() !== "0001-01-01T00:00:00.000Z" ?
        moment(date).format('DD/MM/YYYY') : null,
    },
    {
      title: 'วันสิ้นสุดงาน',
      dataIndex: 'End',
      width: '10%',
      align: "center",
      render: (date: Date) => date && moment(date).toISOString() !== "0001-01-01T00:00:00.000Z" ?
        moment(date).format('DD/MM/YYYY') : null,
    },
    {
      title: 'ราคา',
      dataIndex: 'Price',
      width: '10%',
      align: "center",
    },
    {
      title: 'คะแนน',
      dataIndex: 'Rate',
      width: '10%',
      align: "center",
    },
    {
      title: 'ตรวจสอบประวัติ',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => toggleModal(record.ID)}
        >
          <HistoryOutlined
            style={{
              fontSize: '20px',
              color: 'orange',
            }}
          />
        </Button>
      ),
    },
  ];

  const columnhistory: ColumnsType<NotifyInterface> = [
    {
      title: 'วัน/เวลาที่แจ้ง',
      dataIndex: 'Date',
      width: '10%',
      align: "center",
      render: (date: Date) => date && moment(date).toISOString() !== "0001-01-01T00:00:00.000Z" ?
        moment(date).format('DD/MM/YYYY HH:mm:ss') : null,
    },
    {
      title: 'สุขภา่พ',
      dataIndex: 'Health',
      width: '10%',
      align: "center",
    },
    {
      title: 'ความสะอาด',
      dataIndex: 'Clean',
      width: '10%',
      align: "center",
    },
    {
      title: 'ข้อความอื่นๆ',
      dataIndex: 'Text',
      width: '10%',
      align: "center",
    },
  ];

  useEffect(() => {
    getserviceuserbyuid();
    getpostbyuid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <Col >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ประวัติความคืบหน้า</Title>
              </div>
            </Col>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Avatar size={300} src={user.Pet?.Pic} style={{ cursor: 'pointer', height: 450, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '0' }} onClick={showModal} />
        </div>

        <Modal
          title={'เลือกงานที่ต้องการดูประวัติ'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={1500}
        >
          <Table columns={columnpost} dataSource={post} />
          <Button style={{ marginTop: 16 }} onClick={handleCancel}>ปิด</Button>,
        </Modal>

        <Modal
          title={'ประวัติความคืบหน้า'}
          visible={isModalVisiblehistory}
          onCancel={handleCancelHistory}
          footer={null}
          width={1500}
        >
          <Table columns={columnhistory} dataSource={history} />
          <Button style={{ marginTop: 16 }} onClick={backtoprovider}>ย้อนกลับ</Button>
        </Modal>
      </Content>
    </Layout>
  );
};

export default HistoryPost;
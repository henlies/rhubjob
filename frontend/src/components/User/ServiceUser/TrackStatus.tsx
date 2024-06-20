import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Input, Layout, Modal, Rate, Row, Table, Tooltip, Typography, message } from 'antd';
import { GetNotifyNow, GetPostinCase, RateAfterJobDone } from '../../../services/HttpServices';
import { NotifyInterface } from '../../../models/Notify';
import { PostSInterface } from '../../../models/Post';
import { CommentOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';

const TrackStatus: React.FC = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const id = localStorage.getItem("id")
  const numId: number | undefined = id !== null ? parseInt(id, 10) : undefined;

  const [posts, setPosts] = useState<PostSInterface[]>([]);
  const [notify, setNotify] = useState<NotifyInterface[]>([]);
  const [pid, setPid] = useState<number | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [api, Holder] = message.useMessage();

  const openAlert = (type: 'success' | 'error', content: string) => {
    api.open({
      type,
      content,
      duration: 5,
    });
  };

  const getpost = async () => {
    let res = await GetPostinCase(numId);
    if (res) {
      setPosts(res);
    }
  };

  const getnotify = async () => {
    let res = await GetNotifyNow(numId);
    if (res) {
      setNotify(res);
    }
  };

  const showModal = (id?: number) => {
    setIsModalVisible(true);
    if (id !== undefined) {
      setPid(id);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const rateforpost = async () => {
    let data = {
      ID: pid,
      Rate: rating,
    };
    let res = await RateAfterJobDone(data);
    if (res) {
      getpost();
      getnotify();
      openAlert('success', 'การให้คะแนนเสร็จสิ้น');
      setIsModalVisible(false);
    } else {
      openAlert('error', 'การให้คะแนนไม่สำเร็จ');
    }
  }

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

  console.log(pid);

  useEffect(() => {
    getnotify();
    getpost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <div style={{ background: '#fff', textAlign: 'center', borderRadius: 8, }}>
          <div style={{ display: 'flex', marginBottom: '64px', marginTop: '64px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}>
            <Col >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ติดตามสถานะสัตว์เลี้ยง</Title>
              </div>
            </Col>
          </div>
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              {posts.map((post) => {
                const startDate = new Date(post.Start);
                const start = startDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                const endDate = new Date(post.End);
                const end = endDate.toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                let isDisabledCancle = true;

                if (post.Status?.Name === 'งานสิ้นสุด' || post.Status?.Name === 'ยกเลิกงาน') {
                  isDisabledCancle = false;
                }

                return (
                  <Card
                    style={{ marginTop: '8px', borderRadius: '8px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    bordered={false}
                    actions={[
                      <Tooltip title="ให้คะแนน" placement="bottom">
                        <CommentOutlined style={{ color: isDisabledCancle ? 'grey' : 'green' }}
                          onClick={() => !isDisabledCancle && showModal(post.ID)}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Avatar size={75} src={post.ServiceProvider?.Pic} style={{ margin: '12px' }} />
                      <Input readOnly addonBefore="ชื่อผู้รับเลี้ยง" value={`${post.ServiceProvider?.Firstname} ${post.ServiceProvider?.Lastname}`} style={{ flex: 1 }} />
                    </div>
                    <Col span={24}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Input value="รายละเอียดผู้รับเลี้ยง" readOnly style={{ background: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center' }} />
                        <Input readOnly addonBefore="คำแนะนำ" value={`${post.Descript}`} />
                        <Input readOnly addonBefore="ตั้งแต่วันที่" value={`${start} ถึงวันที่ ${end}`} />
                        <Input readOnly addonBefore="ราคา" value={`${post.Price} บาท/วัน`} />
                        <Input readOnly addonBefore="รับเลี้ยง" value={post.Type?.Name} />
                      </div>
                    </Col>
                  </Card>
                );
              })}
            </div>
          </Col>
          <Col span={16}>
            {notify.length > 0 && (
              < div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <Card style={{ marginTop: '8px', borderRadius: '8px', width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} bordered={false}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Table columns={columnhistory} dataSource={notify} />
                  </div>
                </Card>
              </div>
            )}
          </Col>
        </Row>
        {posts.length === 0 && (
          <div style={{ display: 'flex', marginTop: '64px', alignItems: 'center', justifyContent: 'center' }}>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <Title level={4}>งานนี้ยังไม่มีการแจ้งความคืบหน้า</Title>
              </div>
            </Col>
          </div>
        )}

        <Modal
          title={'ให้คะแนนการรับเลี้ยง'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>
              ปิด
            </Button>,
            <Button type="primary" onClick={rateforpost}>
              ให้คะแนน
            </Button>,
          ]}
          width={300}
        >
          {Holder}
          <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 32 }}>
            <Rate onChange={(value) => setRating(value)} value={rating} />
            <p>คะแนนที่เลือก: {rating}</p>
          </div>
        </Modal>
      </Content>
    </Layout >
  );
};

export default TrackStatus;